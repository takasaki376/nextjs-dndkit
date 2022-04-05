import { CollisionDetection, DropAnimation, KeyboardCoordinateGetter, MeasuringConfiguration, Modifiers, PointerActivationConstraint, UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, arrayMove, NewIndexGetter, SortingStrategy } from "@dnd-kit/sortable";

export interface Props {
    activationConstraint?: PointerActivationConstraint;
    animateLayoutChanges?: AnimateLayoutChanges;
    adjustScale?: boolean;
    collisionDetection?: CollisionDetection;
    coordinateGetter?: KeyboardCoordinateGetter;
  //   Container?: any; // To-do: Fix me
    dropAnimation?: DropAnimation | null;
    getNewIndex?: NewIndexGetter;
    handle?: boolean;
    itemCount?: number;
    items?: string[];
    measuring?: MeasuringConfiguration;
    modifiers?: Modifiers;
    renderItem?: any;
    removable?: boolean;
    reorderItems?: typeof arrayMove;
    strategy?: SortingStrategy;
    style?: React.CSSProperties;
    useDragOverlay?: boolean;
    getItemStyles?(args: {
      id: UniqueIdentifier;
      index: number;
      isSorting: boolean;
      isDragOverlay: boolean;
      overIndex: number;
      isDragging: boolean;
    }): React.CSSProperties;
    wrapperStyle?(args: {
      index: number;
      isDragging: boolean;
      id: string;
    }): React.CSSProperties;
    isDisabled?(id: UniqueIdentifier): boolean;
  }