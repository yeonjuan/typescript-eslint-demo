import React, {FC, useCallback, useRef, useState} from 'react';
import "./SplitPanel.css";

const BASE_STYLE: React.CSSProperties = {
  flex: '1',
  display: 'flex',
};

interface Props {
  vertical?: boolean;
  onResize?: () => void;
}

export const SplitPanel: FC<Props> = (props) => {
  const childrenComponents = React.Children.toArray(props.children);
  const container = useRef<HTMLDivElement>(null);
  const {
    vertical,
    onResize
  } = props;

  const [position, setPosition] = useState(50);

  const resize = useCallback((event) => {
      if (!container.current) {
        return;
      }
      event.preventDefault();

      const offset = vertical ? container.current.offsetTop : container.current.offsetLeft;
      const size = vertical ? container.current.offsetHeight : container.current.offsetWidth;
      global.document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
      const moveHandler = (event: MouseEvent) => {
        event.preventDefault();
        const newPosition = ((vertical ? event.pageY : event.pageX) - offset) / size * 100;
        setPosition(Math.min(Math.max(0, newPosition), 99));
      };
      const upHandler = () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
        global.document.body.style.cursor = '';
  
        if (onResize) {
          onResize();
        }
      };
  
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);
  }, [vertical, position, container]);

  const styleA = {...BASE_STYLE};
  const styleB = {...BASE_STYLE, minWidth: 0, minHeight: 0};


  if (vertical) {
    styleA.minHeight = `${position}%`;
    styleA.maxHeight = `${position}%`;
  } else {
    styleA.minWidth = `${position}%`;
    styleA.maxWidth = `${position}%`;
  }

  return (
    <div
      ref={container}
      style={{display: 'flex', flexDirection: props.vertical ? 'column' : 'row', width: props.vertical ? '100%' : undefined, height: props.vertical ? undefined: '100%'}}
    >
      <div style={styleA}>
        {childrenComponents[0]}
      </div>
      <div className={`divider ${vertical ? 'vertical' : 'horizontal'}`} onMouseDown={resize}></div>
      <div style={styleB}>
        {childrenComponents[1]}
      </div>
    </div>
  );
}
