import { useSortable } from "@dnd-kit/sortable";
import { getColor, useMountStatus } from "./functions";
import { Item } from "./Item/Item";
import { SortableItemProps } from "./types";

export function SortableItem({
    disabled,
    id,
    index,
    wrapperStyle,
  }: SortableItemProps) {
    const {
      setNodeRef,
      listeners,
      isDragging,
      isSorting,
      transform,
      transition,
    } = useSortable({
      id,
    });
    const mounted = useMountStatus();
    const mountedWhileDragging = isDragging && !mounted;
  
    return (
      <Item
        ref={disabled ? undefined : setNodeRef}
        value={id}
        dragging={isDragging}
        sorting={isSorting}
        index={index}
        wrapperStyle={wrapperStyle({index})}
        color={getColor(id)}
        transition={transition}
        transform={transform}
        fadeIn={mountedWhileDragging}
        listeners={listeners}
      />
    );
  }