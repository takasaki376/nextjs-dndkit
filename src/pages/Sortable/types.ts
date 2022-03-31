
export type Items = Record<string, string[]>;

export type SortableItemProps = {
    containerId: string;
    id: string;
    index: number;
    disabled?: boolean;
}

export type Props = {
    items?: Items;
}