import { useSize } from "ahooks";
import styles from './item.module.css';
import { memo, useEffect, useRef } from "react";

function Item(props) {
    const {
        children,
        idx,
        onSizeChange = () => {},
        position,
    } = props;

    const ref = useRef();
    const size = useSize(ref);

    useEffect(() => {
        onSizeChange(idx, size);
    }, [size, idx]);

    return (
        <div ref={ref} className={styles.item} style={{transform: `translateY(${position}px)`,}}>
            {children}
        </div>
    );
  }
  
  export default memo(Item);
  