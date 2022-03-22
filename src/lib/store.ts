
import type { ListTodo, PostTodo, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { getToday } from "./dateFunc";
import { EXAMPLE_MY_TODO_LIST } from "./initData";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

export const initEditTodo: PostTodo = {
  task: "",
  sortKey: 0,
  dueDate: "",
  completeDate: "",
  isDone: false,
};

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
      editTodo: initEditTodo,
      isFooterShow: false,
      getTodos: async () => {
        
        set({ todos: EXAMPLE_MY_TODO_LIST });
      },
      addTodo: async (postTodo) => {
        
        const {
     
          task,
          
          sortKey,
          dueDate,
          completeDate,
          isDone,
          
        } = postTodo;
        return set((state) => {
          const listTodo: ListTodo = {
            id :"",
            task,
            userId :"",
            sortKey,
            dueDate,
            completeDate,
            isDone,
            createAt :"",
            updateAt :"",
          };
          return {
            todos: [...state.todos, listTodo],
          };
        });
      },
      removeTodo: async (id: string) => {
  
        return set((state) => {
          return {
            todos: state.todos.filter((todo) => {
              return todo.id !== id;
            }),
          };
        });
      },
      toggleDone: async (editTodo: ListTodo) => {
        editTodo.isDone = !editTodo.isDone;
        if (editTodo.isDone) {
          editTodo.completeDate = getToday().toString();
        } else {
          editTodo.completeDate = "";
        }

        const putTodo: PostTodo = {
          task: editTodo.task,
          sortKey: editTodo.sortKey,
          dueDate: editTodo.dueDate,
          completeDate: editTodo.completeDate,
          isDone: editTodo.isDone,
        };
        
        set((state) => {
          return {
            todos: state.todos.map((todo) => {
              if (editTodo.id !== todo.id) {
                return todo;
              }
              return editTodo;
            }),
          };
        });
      },
      toggleIsFooterShow: () => {
        return set((state) => {
          return { isFooterShow: !state.isFooterShow };
        });
      },
      toggleFooterFocus: () => {
        return set((state) => {
          return { isFooterShow: !state.isFooterShow };
        });
      },
      setEditTodo: (postTodo: PostTodo) => {
        return set(() => {
          return {
            editTodo: {
              task: postTodo.task,
              sortKey: postTodo.sortKey,
              dueDate: postTodo.dueDate,
              completeDate: postTodo.completeDate,
              isDone: postTodo.isDone,
            },
          };
        });
      },
    };
  })
);

export { useStore };
