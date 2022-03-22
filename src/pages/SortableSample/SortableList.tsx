import { VFC } from "react";
import { closestCorners, DndContext, DragOverEvent, DragStartEvent, KeyboardSensor, Over, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {  useState } from "react";
import { Target } from "src/types";

type Props = {
    title:string;
    target: Target;
  };
//   export type TaskType = "today" | "tomorrow" | "other";


export const SortableList:VFC<Props> = (props) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

      const [sourceContainer, setSourceContainer] = useState<Target | null>(null);
     // つかんだとき;
     const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { id } = active;

        const activeContainer = props.target;
        setSourceContainer(activeContainer);
    };
//動かして他の要素の上に移動した時
const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    // Find the containers
    const activeContainer = props.target;
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    const activeItems =
      activeContainer === "today"
        ? todoToday
        : activeContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;
    const overItems =
      overContainer === "today"
        ? todoToday
        : overContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;

    const activeIndex = activeItems.findIndex((item) => item.id === Number(id));
    const overIndex = overItems.findIndex((item) => item.id === Number(overId));

    const newIndex = overIndex + 1;
    let newItem: TodoType;

    if (activeContainer === "today") {
      newItem = todoToday[activeIndex];
      setTodoToday([...todoToday.filter((item) => item.id !== Number(id))]);
    } else if (activeContainer === "tomorrow") {
      newItem = todoTomorrow[activeIndex];
      setTodoTomorrow([
        ...todoTomorrow.filter((item) => item.id !== Number(id)),
      ]);
    } else {
      newItem = todoOther[activeIndex];
      setTodoOther([...todoOther.filter((item) => item.id !== Number(id))]);
    }

    if (overContainer === "today") {
      setTodoToday([
        ...todoToday.slice(0, newIndex),
        newItem,
        ...todoToday.slice(newIndex, todoToday.length),
      ]);
    } else if (overContainer === "tomorrow") {
      setTodoTomorrow([
        ...todoTomorrow.slice(0, newIndex),
        newItem,
        ...todoTomorrow.slice(newIndex, todoTomorrow.length),
      ]);
    } else {
      setTodoOther([
        ...todoOther.slice(0, newIndex),
        newItem,
        ...todoOther.slice(newIndex, todoOther.length),
      ]);
    }
  };

  //要素を離したとき
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over as Over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    setActiveId(Number(id));
    setTargetContainer(activeContainer);

    const items =
      activeContainer === "today"
        ? todoToday
        : activeContainer === "tomorrow"
        ? todoTomorrow
        : todoOther;

    const activeIndex = items.findIndex((item) => item.id === Number(id));
    const overIndex = items.findIndex((item) => item.id === Number(overId));

    if (activeContainer === sourceContainer) {
      setTargetIndex(activeIndex < overIndex ? overIndex + 1 : overIndex);
    } else {
      setTargetIndex(overIndex);
    }

    if (activeIndex !== overIndex) {
      if (activeContainer === "today") {
        setTodoToday(arrayMove(todoToday, activeIndex, overIndex));
      } else if (activeContainer === "tomorrow") {
        setTodoTomorrow(arrayMove(todoTomorrow, activeIndex, overIndex));
      } else {
        setTodoOther(arrayMove(todoOther, activeIndex, overIndex));
      }
    }
  };
    

    return (
        <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
    
          </DndContext>
    )
}