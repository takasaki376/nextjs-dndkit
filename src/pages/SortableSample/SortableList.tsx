import { Fragment, VFC } from "react";
import clsx from "clsx";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Target,TodosState } from "src/types";
import { selectTodos, useStore } from "src/lib/store";
import { Popover, Transition } from "@headlessui/react";
import SortableItem from "./SortableItem";

type Props = {
    title:string;
    target: Target;
  };
//   export type TaskType = "today" | "tomorrow" | "other";
const getStringFromDate = (date: Date) => {
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = (date.getMonth() + 1).toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

export const SortableList:VFC<Props> = (props) => {
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  
  const todos = selectTodos(allTodos ,strDate, props.target) 
  const todoIds = todos.map((todoTask) => String(todoTask.id));

  const { setNodeRef } = useDroppable({
    id: props.target,
    data: {
      type: 'container',
      children: todos,
    },
  });
  return (
   
    <Popover className="lg:min-h-screen">
      {({ open }) => {
        return (
          <>
            <div
              className={clsx("mb-3 text-2xl font-semibold", {
                "text-primary": props.target == "today",
                "text-secondary": props.target == "nextday",
                "text-tertiary": props.target == "other",
              })}
            >
              {props.title}
            </div>
            <div className="flex flex-col">
              <Popover.Button>
                <div className="flex items-center">
                  <button className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full">
                    +
                  </button>
                  <div className="text-gray-300">タスクを追加する</div>
                </div>
              </Popover.Button>
              <div className="overflow-y-auto pt-3 w-full max-h-48 lg:max-h-full overflow-x-hidden">
                <ul>
               
                  <div ref={setNodeRef} 
                    style={
                    {
                      '--columns': 1,
                    } as React.CSSProperties
                  }>
                    <SortableContext
                      id={props.target}
                      items={todoIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {todos.map((todo) => {
                        return (
                          <SortableItem
                            todo={todo}
                            key={`todo-${todo.task}-${todo.id}`}
                            target={props.target}
                          />
                        );
                      })}
                    </SortableContext>
                  </div>
                </ul>
              </div>
            </div>
            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="lg:hidden fixed right-[50%] bottom-0 z-50 bg-white dark:bg-black translate-x-[50%]"
                >
                  <div className="relative">
                    <input
                      className="px-2 mb-3 w-80 h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
                      
                    />
                  </div>
                  <div className="flex items-center mb-3 text-white">
                    <button
                      className="px-4 mr-2 h-9 text-sm whitespace-nowrap bg-primary rounded-full"
                      
                    >
                      + 今日する
                    </button>
                    <button
                      className="px-4 mr-2 h-9 text-sm whitespace-nowrap bg-secondary rounded-full"
                      
                    >
                      + 明日する
                    </button>
                    <button
                      className="px-4 h-9 text-sm whitespace-nowrap bg-tertiary rounded-full"
                      
                    >
                      + 今度する
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
    
  )
}