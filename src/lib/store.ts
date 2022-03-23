
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
      sourceContainer : null,
      activeTarget : null, 
      orveTarget : null, 
      getTodos: async () => {        
        set({ todos: EXAMPLE_MY_TODO_LIST });
      },
      setSourceContainer : (id :string) => {
        return set((state) => { 
          const todo = state.todos.find((todo) => {
            todo.id === id
          })
          let target:Target | null = state.sourceContainer
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
          return { sourceContainer :target }
        })
      },
      findTarget: (id :string ,isActive :boolean) => {
        return set((state) => {
          const todo = state.todos.find((todo) => {
            todo.id === id
          })
          let activeTarget:Target | null = state.activeTarget
          let orveTarget:Target | null = state.orveTarget
          if (!isActive && id === "") {
            orveTarget = null
          } else {
            const dueDate = todo?.dueDate
            const today = String(getToday().toString)
            const nextday = String(getTommorow().toString)
            
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
          const activeTarget:Target = state.activeTarget || "today"
          const orveTarget:Target = state.orveTarget || "today"

          // 移動元コンテナ
          const activeItems = selectTodos(state.todos ,strDate, activeTarget) 
          // 移動先コンテナ
          const overItems = selectTodos(state.todos ,strDate, orveTarget) 
    
          // 移動先コンテナの位置
          const overIndex = overItems.findIndex((item) => item.id === overId);
          const newIndex = overIndex + 1;

          // 移動対象のタスク
          const newItem = activeItems.find((item) => item.id === id);
          // 移動元コンテナから、移動対象を除く
          const activeContainer = activeItems.filter((item) => item.id !== id)
          
          const overContainer = {
            ...overItems.slice(0, newIndex),
            newItem,
            ...overItems.slice(newIndex, overItems.length),
          }
  
          return {todos :updateTodos}
        })
      },
      taskDropEnd: (id :string ,overId :string, strDate :string) => {
        return set((state) => {
          
          const activeTarget:Target = state.activeTarget || "today"
          let updateTodos :ListTodo[] = state.todos
          
          const items = selectTodos(state.todos ,strDate, activeTarget) 
    
          const activeIndex = items.findIndex((item) => item.id === id);
          const overIndex = items.findIndex((item) => item.id === overId);
          
          let activeContainer :ListTodo[]
          if (activeIndex !== overIndex) {
            activeContainer = arrayMove(items, activeIndex, overIndex);
          }


          return {todos :updateTodos}
        })
      }
    };
    
  })
);

export { useStore };
