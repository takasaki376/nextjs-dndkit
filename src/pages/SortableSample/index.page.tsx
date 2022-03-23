
import { NextPage } from "next";
import { SortableList } from "./SortableList";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  PointerSensor,
  closestCorners,  DragOverEvent, DragStartEvent,  Over, DragEndEvent
} from '@dnd-kit/core';
import { arrayMove ,sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {  useEffect } from "react";
import { selectTodos, useStore } from "src/lib/store";
import {  TodosState } from "src/types";

const getStringFromDate = (date: Date) => {
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = 1 + date.getMonth().toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

const SortableSample:NextPage = (() => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const findTarget = useStore((state) => {
    return state.findTarget;
  });
  const activeTarget = useStore((state) => {
    return state.activeTarget;
  });
  const orveTarget = useStore((state) => {
    return state.orveTarget;
  });
  const setSourceContainer = useStore((state) => {
    return state.setSourceContainer;
  });
  const sourceContainer = useStore((state) => {
    return state.sourceContainer;
  });
  const taskDropOver = useStore((state) => {
    return state.taskDropOver;
  });
  const taskDropEnd= useStore((state) => {
    return state.taskDropEnd;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const [sourceContainer, setSourceContainer] = useState<Target | null>(null);
  // const [targetIndex, setTargetIndex] = useState<number>(-1);

  // つかんだとき;
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    // つかんだタスクがあるコンテナを保存しておく
    setSourceContainer(id);
  };

  //動かして他の要素の上に移動した時
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    // Find the containers
    findTarget(id, true);
    findTarget(overId, false);
    
    if (
      !activeTarget ||
      !orveTarget ||
      activeTarget === orveTarget
    ) {
      return;
    }
    taskDropOver(id, overId, strDate);
  };

  //要素を離したとき
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    findTarget(id, true);
    findTarget(overId, false);

    if (
      !activeTarget ||
      !orveTarget ||
      activeTarget !== orveTarget
    ) {
      return;
    }

    taskDropEnd(id, overId, strDate);
    
  };
  
  useEffect(() => {
    getTodos();
  }, []);

 return (
  <DndContext
    sensors={sensors}
    collisionDetection={closestCorners}
    onDragStart={handleDragStart}
    onDragOver={handleDragOver}
    onDragEnd={handleDragEnd}
    >
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-row auto-rows-min gap-2 lg:gap-4 lg:mt-6">
      <SortableList title="今日する" target="today" />
      <SortableList title="明日する" target="nextday" />
      <SortableList title="今度する" target="other" />
    </div>
  </DndContext>
 )})

 export default SortableSample