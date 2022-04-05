import  {CSSProperties, VFC} from 'react';
import clsx from 'clsx';

import styles from './Action.module.css';

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties['cursor'];
}

export const Action:VFC<ActionProps> = ({active, className, cursor, style, ...props}) => {
  return (
    <button
      {...props}
      className={clsx(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': active?.fill,
          '--background': active?.background,
        } as CSSProperties
      }
    />
  );
}
