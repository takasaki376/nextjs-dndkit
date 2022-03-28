import { useDroppable } from "@dnd-kit/core";
// import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
// import {CSS} from '@dnd-kit/utilities';
import { Container, ContainerProps } from "./Container";
import styles from './Container/Container.module.css';

// const animateLayoutChanges: AnimateLayoutChanges = (args) =>
//   args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

export function DroppableContainer({
    children,
    disabled,
    id,
    items,
    label,
    style,
    ...props
  }: ContainerProps & {
    disabled?: boolean;
    id: string;
    items: string[];
  }) {
    // const {
    //   // active,
    //   // attributes,
    //   isDragging,
    //   // listeners,
    //   // over,
    //   setNodeRef,
    //   transition,
    //   transform,
    // } = useSortable({
    //   id,
    //   data: {
    //     type: 'container',
    //     children: items,
    //   },
    //   animateLayoutChanges,
    // });
    const {
      setNodeRef,
    } = useDroppable({
      id,
      data: {
        type: 'container',
        children: items,
      },
    });

    // const isOverContainer = over
    //   ? (id === over.id && active?.data.current?.type !== 'container') ||
    //     items.includes(over.id)
    //   : false;
  
    return (
      <div
        ref={setNodeRef}
        style={
          {
            ...style,
            '--columns': 1,
          } as React.CSSProperties
        }
        className={styles.Container}
        {...props}
      >
        <div className={styles.Header}>
            {label}            
          </div>          
          <ul>{children}</ul>
      </div>
    );
  }