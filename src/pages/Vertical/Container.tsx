import  {forwardRef} from 'react';
import clsx from 'clsx';

import styles from './Container.module.css';

export interface ContainerProps {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}

export const Container = forwardRef<HTMLUListElement, ContainerProps>(
  ({children, columns = 1, horizontal, style}: ContainerProps, ref) => {
    return (
      <ul
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        className={clsx(styles.List, horizontal && styles.horizontal)}
      >
        {children}
      </ul>
    );
  }
);
