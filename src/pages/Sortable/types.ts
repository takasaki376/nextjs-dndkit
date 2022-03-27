import { CancelDrop,  Modifiers, UniqueIdentifier } from "@dnd-kit/core";
import { SortingStrategy } from "@dnd-kit/sortable";

export type Items = Record<string, string[]>;

export type SortableItemProps = {
    containerId: string;
    id: string;
    index: number;
    disabled?: boolean;
    wrapperStyle({index}: {index: number}): React.CSSProperties;
}

export type Props = {
    cancelDrop?: CancelDrop;
    wrapperStyle?(args: {index: number}): React.CSSProperties;
    items?: Items;
    strategy?: SortingStrategy;
    scrollable?: boolean;
    vertical?: boolean;
}