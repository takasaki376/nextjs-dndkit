import { useSortable } from "@dnd-kit/sortable";
import { getColor } from "./functions";
import { SortableItemProps } from "./types";
import styles from './Item/Item.module.css';
import { CSSProperties } from "react";

export function SortableItem({
    disabled,
    id,
    index,
    ...props
  }: SortableItemProps) {
    const {
      setNodeRef,
      listeners,
      transform,
      transition,
    } = useSortable({id});
  
    return (
      // <Item
      //   ref={disabled ? undefined : setNodeRef}
      //   value={id}
      //   sorting={isSorting}
      //   index={index}
      //   color={getColor(id)}
      //   transition={transition}
      //   transform={transform}
      //   listeners={listeners}
      // />
      (
        <li
          className={styles.Wrapper}
          style={
            {
              transition: [transition]
                .filter(Boolean)
                .join(', '),
              '--translate-x': transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              '--translate-y': transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              '--scale-x': transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              '--scale-y': transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              '--index': index,
              '--color': getColor(id),
            } as CSSProperties
          }
          ref={disabled ? undefined : setNodeRef}
        >
          <div            
            className={styles.Item}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
          >
            {id}            
          </div>
        </li>)
    );
  }