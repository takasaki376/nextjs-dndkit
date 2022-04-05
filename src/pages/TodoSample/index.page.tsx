
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
  closestCorners,  DragOverEvent, DragStartEvent,  Over, DragEndEvent, MeasuringStrategy
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {  useEffect } from "react";
import {  useStore } from "src/lib/store";

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
  const findTarget = useStore((state) => {
    return state.findTarget;
  });
  const activeTarget = useStore((state) => {
    return state.activeTarget;
  });
  const orveTarget = useStore((state) => {
    return state.orveTarget;
  });
  const setActiveId = useStore((state) => {
    return state.setActiveId;
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
  // const handleRemove =  (id: string) => {
  //   setItems((items) => items.filter((item) => item !== id))
  // }

  // つかんだとき;
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    // つかんだタスクがあるコンテナを保存しておく
    setActiveId(id);
  };

  //動かして他の要素の上に移動した時
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    // Find the containers
    findTarget(id, true);
    findTarget(overId, false);
    
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
    measuring={{droppable: {strategy: MeasuringStrategy.Always}}}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-row auto-rows-min gap-2 lg:gap-4 lg:mt-6 m-8">
        <SortableList title="A" target="today" />
        <SortableList title="B" target="nextday" />
        <SortableList title="C" target="other" />
      </div>
  </DndContext>
 )})

 export default SortableSample