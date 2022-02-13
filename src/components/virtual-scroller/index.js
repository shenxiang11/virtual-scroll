import styles from './index.module.css';
import React, { useEffect, useMemo, useRef, useState } from "react";
import Item from './item';

function VirtualScroller(props) {
    const {
        debuggerMode = false,
        dataSource = [],
        itemRender = () => {},
        minItemSize = 300,
        buffer = minItemSize * 3,
    } = props;

    const [totalSize, setTotalSize] = useState(0);
    const [sizeData, setSizeData] = useState({});
    const [pool, setPool] = useState([]);
    const [scrollEvent, setScrollEvent] = useState(null);

    const itemsWithSize = useMemo(() => {
        const result = [];
        const items = dataSource;
        const sizes = sizeData;

        for (let i=0, len=items.length; i<len; i++) {
            const item = items[i];
            const id = i;
            let size = sizes[id] || 0;

            result.push({
                item,
                id,
                size,
            });
        }

        return result;
    }, [dataSource, sizeData]);

    const sizes = useMemo(() => {
        const sizes = {
            '-1': {
                accumulator: 0,
            },
        };
        const items = itemsWithSize;
        let computedMinSize = 100000;
        let accumulator = 0;
        let current;
        for (let i=0, len=items.length; i<len; i++) {
            current = items[i]['size'] || minItemSize;
            if (current < computedMinSize) {
                computedMinSize = current;
            }
            accumulator += current;
            sizes[i] = { accumulator, size: current }
        }

        return sizes;
    }, [itemsWithSize, minItemSize]);

    const handleSizeChange = (idx, size) => {
        if (size && size.height) {
            const newData = {...sizeData, [idx]: size.height};
            setSizeData(newData);
        }       
    };

    const el = useRef(null);

    const getScroll = (event) => {
        let scrollTop = event ? event.y : 0;
        return {
            start: scrollTop,
            end: scrollTop + el.current.clientHeight,
        };
    }

    const updateVisibleItems = (event) => {
        const items = itemsWithSize;
        if (!items || !items.length) {
            setPool([]);
            return;
        }

        const count = items.length;
        const pool = [];
        const scroll = getScroll(event ? event : scrollEvent);
        scroll.start -= buffer;
        scroll.end += buffer;

        let startIndex;
        let endIndex;
        // 二分法：根据对应元素的位置查找当前需要展示的开始、结束index
        let h;
        let a = 0;
        let b = count - 1;
        let i = ~~(count / 2);
        let oldI;

        do {
            oldI = i;
            h = sizes[i].accumulator;
            if (h < scroll.start) {
                a = i;
            } else if (i < count - 1 && sizes[i+1].accumulator > scroll.start) {
                b = i;
            }
            i = ~~((a + b) / 2);
        } while (i !== oldI);
        i < 0 && (i = 0);
        startIndex = i;
        setTotalSize(sizes[count-1].accumulator);

        for (endIndex = i; endIndex < count && sizes[endIndex].accumulator < scroll.end; endIndex++) {
            if (endIndex === -1) {
                endIndex = items.length - 1;
            } else {
                endIndex++;
                endIndex > count && (endIndex = count);
            }
        }

        if (endIndex > count) {
            endIndex = count;
        }

        for (let index = startIndex; index < endIndex; index++) {
            let item = items[index];
            let view = {
                ...item,
                index,
                position: sizes[index-1].accumulator,
            }
            pool.push(view);
        }
        setPool(pool);
    }

    const onScroll = (event) => {
        setScrollEvent({
            y: event.target.scrollTop,
        })
        updateVisibleItems({
            y:  event.target.scrollTop,
        });
    }

    useEffect(() => {
        updateVisibleItems();
    }, [sizes]);
    
    return (
        <>
            {
                debuggerMode ? (
                    <div className={styles.debugger}>
                        {JSON.stringify(sizeData, 2)}
                    </div>
                ) : null
            }
            <div className={styles.scroller} ref={el} onScroll={onScroll}>
                <div className={styles.list} style={{height: totalSize}}>
                    {
                        pool.map((item, idx) => (
                            <Item position={item.position} key={item.id} idx={item.index} onSizeChange={handleSizeChange}>
                                {
                                    itemRender(item.item, idx)
                                }
                            </Item>
                        ))
                    }
                </div>
                
            </div>
        </>
    );
  }
  
  export default VirtualScroller;
  