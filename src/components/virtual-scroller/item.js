import { useSize } from "ahooks";
import styles from './item.module.css';
import { useEffect, useRef } from "react";

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
        if (size && size.height) {
            console.log('!!!!', idx, size);
            onSizeChange(idx, size);
        }
    }, [size]);

    return (
        <div ref={ref} className={styles.item} style={{transform: `translateY(${position}px)`,}}>
            {children}
        </div>
    );
  }
  
  export default Item;
  