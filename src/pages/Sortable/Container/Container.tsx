import { CSSProperties, forwardRef, ReactNode } from "react";
import styles from './Container.module.css';

export type Props = {
    children: ReactNode;
    label?: string;
    style?: CSSProperties;    
    horizontal?: boolean;
    shadow?: boolean;
    hover?: boolean;
  }
  
  export const Container = forwardRef<HTMLDivElement, Props>(
    (
      {
        children,     
        horizontal,
        hover,
        label,        
        style,
        shadow,
        ...props
      }: Props,
      ref
    ) => {
      
  
      return (
        <div
          {...props}
          ref={ref}
          style={
            {
              ...style,
              '--columns': 1,
            } as React.CSSProperties
          }
        className={styles.Container}
        >
          <div className={styles.Header}>
            {label}            
          </div>          
          <ul>{children}</ul>
        </div>
      );
    }
  );
  