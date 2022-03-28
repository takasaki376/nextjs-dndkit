import { CancelDrop,  Modifiers, UniqueIdentifier } from "@dnd-kit/core";
import { SortingStrategy } from "@dnd-kit/sortable";

export type Items = Record<string, string[]>;

export type SortableItemProps = {
    containerId: string;
    id: string;
    index: number;
    disabled?: boolean;
}

export type Props = {
    cancelDrop?: CancelDrop;
    items?: Items;
    strategy?: SortingStrategy;
    scrollable?: boolean;
    vertical?: boolean;
}