import { CSSProperties, ReactNode } from "react";

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

export type ContainerProps = {
    children: ReactNode;
    label?: string;
    style?: CSSProperties;    
    hover?: boolean;
  }