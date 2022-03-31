import {useSortable} from '@dnd-kit/sortable';
import { useRef, VFC } from 'react';
import {CSS} from '@dnd-kit/utilities';
import { ListTodo, Target } from 'src/types';
import clsx from "clsx";
import { useStore } from 'src/lib/store';
// import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";

type Props = {
  todo: ListTodo;
  target: Target;
};


const SortableItem:VFC<Props> = (props) => {
  const activeId = useStore((state) => {
    return state.activeId;
  });

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.todo.id });
  const isSortingContainer = activeId ? true : false;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const focusRef = useRef(null);

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="group flex justify-between items-center mr-5 mb-4">
        <div className="flex items-center ">
          <input
            className={clsx(
              "mr-4 w-6 h-6 rounded-full ring-0 focus:ring-gray-400",
              {
                "text-primary": props.target == "today",
                "text-secondary": props.target == "nextday",
                "text-tertiary": props.target == "other",
              }
            )}
            type="checkbox"
            checked={props.todo.isDone}
            
          />
          <div
            ref={focusRef}
            tabIndex={-1}
            className={clsx(
              "px-6 m-0 my-auto w-full dark:bg-gray-700 dark:focus:bg-transparent rounded-full border-none focus:ring-blue-300 cursor-text",
              {
                "line-through": props.todo.isDone,
              }
            )}
          >
            {props.todo.task}
          </div>
        </div>
        {/* <div className="flex w-1/6 opacity-10 group-hover:opacity-100">
          <button className="p-1 ml-5" >
            <DocumentDuplicateIcon className="w-5 h-5 text-gray-500 dark:text-white" />
          </button>
          <button className="p-1 sm:mx-3" >
            <TrashIcon className="w-5 h-5 text-gray-500 dark:text-white" />
          </button>
        </div> */}
      </div>
    </li>
  )
}

export default SortableItem