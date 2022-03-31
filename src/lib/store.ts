
import type { ListTodo, PostTodo, Target, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { arrayMove  } from "@dnd-kit/sortable";
import { getToday,getTommorow } from "./dateFunc";
import { EXAMPLE_MY_TODO_LIST } from "./initData";


export const initEditTodo: PostTodo = {
  task: "",
  sortKey: 0,
  dueDate: "",
  completeDate: "",
  isDone: false,
};

export const selectTodos = (allTodos :ListTodo[],strDate :string,target :Target) => {
  const todos = allTodos.filter((todo) => {
    switch (target) {
      case "other": // 「今度やる」のデータ抽出
        return todo.dueDate == "";
      case "nextday": // 「明日やる」のデータ抽出
        return todo.dueDate > strDate && todo.completeDate == "";
      case "today": // 「今日やる」のデータ抽出
        return (
          (todo.dueDate <= strDate && todo.dueDate != "") ||
          todo.completeDate != ""
        );
    }
  }).sort(function (a: ListTodo, b: ListTodo) {
    if (a.sortKey < b.sortKey) return -1;
    if (a.sortKey > b.sortKey) return 1;
    return 0;
  });
  ;
  return todos
}

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [], 
      activeId : null,
      activeTarget : null, 
      orveTarget : null, 
      getTodos: async () => {        
        set({ todos: EXAMPLE_MY_TODO_LIST });
      },
      setActiveId : (id :string) => {
        return set((state) => { 
          const todo = state.todos.find((todo) => {
            todo.id === id
          })
          let target:Target | null = state.activeId
          const dueDate = todo?.dueDate
          const today = String(getToday().toString)
          const nextday = String(getTommorow().toString)

          switch (dueDate) {
            case today:
              target = "today"
              break;
            case nextday:
              target = "nextday"
              break;
            default:
              target = "other"
              break;
          }
          return { activeId :target }
        })
      },
      findTarget: (id :string ,isActive :boolean) => {
        return set((state) => {
          const todo = state.todos.find((todo) => {
            return todo.id === id
          })          
          if (!todo) {
            if (isActive) {
              return {activeTarget :null ,orveTarget :state.orveTarget}
            } else {
              return {activeTarget :state.activeTarget ,orveTarget :null}
            }
          }

          let activeTarget:Target | null = state.activeTarget
          let orveTarget:Target | null = state.orveTarget
          if (!isActive && id === "") {
            orveTarget = null
          } else {
            const dueDate = todo?.dueDate
            const today = getToday()
            const nextday = getTommorow()

            switch (dueDate) {
              case today:
                if (isActive) {
                  activeTarget = "today"
                } else {
                  orveTarget = "today"
                }
                break;
              case nextday:
                if (isActive) {
                  activeTarget = "nextday"
                } else {
                  orveTarget = "nextday"
                }
                break;
              default:
                if (isActive) {
                  activeTarget = "other"
                } else {
                  orveTarget = "other"
                }              
                break;
            }
          }
          return {activeTarget :activeTarget ,orveTarget :orveTarget}
        })
      },
      taskDropOver: (id :string ,overId :string, strDate :string) => {
        return set((state) => {
          let updateTodos :ListTodo[] = state.todos
          // 移動先が無い場合は、何もせずに終了する
          if (!overId || overId === 'void' ) {
            return  {todos :updateTodos  ,activeId :null}
          }
          // 移動元、移動先のコンテナが変わっていない場合は、何もせずに終了する
          if (
            !state.activeTarget ||
            !state.orveTarget ||
            state.activeTarget === state.orveTarget
          ) {
            return {todos :updateTodos ,activeId :null}
          }

          const activeTarget:Target = state.activeTarget 
          const orveTarget:Target = state.orveTarget

          // 移動元コンテナ
          const activeItems = selectTodos(state.todos ,strDate, activeTarget) 
          // 移動先コンテナ
          const overItems = selectTodos(state.todos ,strDate, orveTarget) 
          
          // 移動先コンテナの位置
          let activeIndex = activeItems.findIndex((item) => item.id === id);

          // 移動先コンテナの位置
          let overIndex = overItems.findIndex((item) => item.id === overId);
          const newIndex = overIndex + 1;

          // 移動対象のタスク
          let newItem = activeItems.find((item) => item.id === id);
          if (!newItem) { 
            return {todos :updateTodos ,activeId :null}
          }
          switch (orveTarget) {
            case "today":
              newItem.dueDate = getToday();
              break;
            case "today":
              newItem.dueDate = getTommorow()
              break;
            case "today":
              newItem.dueDate = ""
              break;
            default:
              break;
          }

          // 移動元コンテナから、移動対象を除く
          let activeContainer = activeItems.filter((item) => item.id !== id)
          for (let index = activeIndex; index < activeContainer.length; index += 1) {
            activeContainer[index].sortKey = activeIndex + 1
            activeIndex += 1
          }
          // let overContainer = {
          //   ...overItems.slice(0, newIndex),
          //   newItem,
          //   ...overItems.slice(newIndex, overItems.length),
          // }
          let overContainer = overItems.slice(0, newIndex)
          overContainer.push(newItem)

          let overContainerBk = overItems.slice(newIndex, overItems.length)
          for (let index = 0; index < overContainerBk.length; index += 1) {
            overContainerBk[index].sortKey = overIndex + 1
            overContainer.push(overContainerBk[index])
            overIndex += 1
          }
          activeContainer.map((todo) => {updateTodos.find((upTodo) => upTodo.id === todo.id) ? todo : updateTodos})
          overContainer.map((todo) => {updateTodos.find((upTodo) => upTodo.id === todo.id) ? todo : updateTodos})

          return {todos :updateTodos ,activeId :null}
        })
      },
      taskDropEnd: (id :string ,overId :string, strDate :string) => {
        return set((state) => {
          let updateTodos :ListTodo[] = state.todos

          if (!state.activeTarget) {
            return {todos :updateTodos ,activeId :null}
          }

          const activeTarget:Target = state.activeTarget
          
          const items = selectTodos(state.todos ,strDate, activeTarget) 
    
          const activeIndex = items.findIndex((item) => item.id === id);
          const overIndex = items.findIndex((item) => item.id === overId);
          
          console.log(`activeTarget=${activeTarget}`)
          console.log(`activeIndex=${id}`)
          console.log(`overIndex=${overId}`)


          let activeContainer :ListTodo[] = []
          if (activeIndex !== overIndex) {
            activeContainer = arrayMove(items, activeIndex, overIndex);
            let sortIndex = 0
            if (activeIndex < overIndex) {
              sortIndex = activeIndex 
            } else {
              sortIndex = overIndex
            }
            for (let index = sortIndex; index < activeContainer.length; index += 1) {
              activeContainer[index].sortKey = sortIndex + 1
              sortIndex += 1
            }
          } else {
            activeContainer = items
          }
          
          activeContainer.map((todo) => {updateTodos.find((upTodo) => upTodo.id === todo.id) ? todo : updateTodos})

          return {todos :updateTodos ,activeId :null}
        })
      }
    };
    
  })
);

export { useStore };
