import React, { CSSProperties, useCallback, useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import useEvent from '../src';

const meta: Meta = {
  title: 'use event',
  argTypes: {
    type: {
      defaultValue: 'click',
      control: 'select',
      options: [
        'click',
        'copy',
        'cut',
        'focus',
        'input',
        'keypress',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'paste',
      ],
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const STYLE: CSSProperties = {
  background: '#eee',
  height: '100%',
  width: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  padding: '10px',
  display: 'flex',
};

const WRAPPER_STYLE: CSSProperties = {
  position: 'relative',
  width: '50%',
  height: '90%',
  marginRight: '20px',
};

const TEXT_AREA_STYLE: CSSProperties = {
  background: '#eee',
  border: '1px solid #aaa',
  width: 'calc(100% - 22px)',
  height: '90%',
  resize: 'none',
  padding: '10px',
};

const BUTTON_STYLE: CSSProperties = {
  background: '#e4e4e4',
  border: 'none',
  width: '100%',
  height: '10%',
};

const LOG_STYLE: CSSProperties = {
  overflow: 'hidden',
  height: '90%',
};

const Template: Story<{ type: keyof WindowEventMap }> = props => {
  const { type } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [eventLog, setEventLog] = useState<
    Array<{ log: string; timestamp: number }>
  >([]);

  const listener = useCallback(e => {
    const { type, target, timeStamp } = e as any;
    const time = new Date(timeStamp).toLocaleTimeString();
    setEventLog(org => [
      {
        log: `${type} event on ${target.nodeName} at ${time}`,
        timestamp: timeStamp,
      },
      ...org,
    ]);
  }, []);

  useEvent(type, listener, { element: ref.current });

  return (
    <div ref={ref} style={STYLE}>
      <div style={WRAPPER_STYLE}>
        <textarea style={TEXT_AREA_STYLE}></textarea>
        <button style={BUTTON_STYLE}>CLICK!</button>
      </div>
      <div style={LOG_STYLE}>
        <h3>EVENT LOG</h3>
        {eventLog.map(log => (
          <p key={log.timestamp}>{log.log}</p>
        ))}
      </div>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
