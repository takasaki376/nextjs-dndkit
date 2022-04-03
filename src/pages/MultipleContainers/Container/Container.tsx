import { CSSProperties, forwardRef, ReactNode } from "react";
import styles from './Container.module.css';

export type Props = {
    children: ReactNode;
    label?: string;
    style?: CSSProperties;    
    hover?: boolean;
  }
  
  export const Container = forwardRef<HTMLDivElement, Props>(
    (
      {
        children,     
        label,        
        style,
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
  