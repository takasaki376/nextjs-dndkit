import { AnimateLayoutChanges, defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { Container, ContainerProps } from "./Container";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

export function DroppableContainer({
    children,
    disabled,
    id,
    items,
    ...props
  }: ContainerProps & {
    disabled?: boolean;
    scrollable?: boolean;    
    id: string;
    items: string[];
  }) {
    const {
      // active,
      // attributes,
      isDragging,
      // listeners,
      // over,
      setNodeRef,
      transition,
      transform,
    } = useSortable({
      id,
      data: {
        type: 'container',
        children: items,
      },
      animateLayoutChanges,
    });
    // const isOverContainer = over
    //   ? (id === over.id && active?.data.current?.type !== 'container') ||
    //     items.includes(over.id)
    //   : false;
  
    return (
      <Container
        ref={disabled ? undefined : setNodeRef}
        style={{
          transition,
          transform: CSS.Translate.toString(transform),
          opacity: isDragging ? 0.5 : undefined,
        }}
        // hover={isOverContainer}
        {...props}
      >
        {children}
      </Container>
    );
  }