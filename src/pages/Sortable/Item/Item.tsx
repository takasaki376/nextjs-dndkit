import type {DraggableSyntheticListeners} from '@dnd-kit/core';
import type {Transform} from '@dnd-kit/utilities';
import { CSSProperties, forwardRef, memo } from 'react';
import styles from './Item.module.css';

export interface Props {
  color?: string;
  disabled?: boolean;
  height?: number;
  index?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  value: React.ReactNode;
  onRemove?(): void;
}

export const Item = memo(
  forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        disabled,
        height,
        index,
        listeners,
        onRemove,
        sorting,
        style,
        transition,
        transform,
        value,
        ...props
      },
      ref
    ) => {
      return  (
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
              '--color': color,
            } as CSSProperties
          }
          ref={ref}
        >
          <div            
            className={styles.Item}
            style={style}
            data-cypress="draggable-item"
            {...listeners}
            {...props}
          >
            {value}            
          </div>
        </li>)
    }
  )
);
