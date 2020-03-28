import React, { HTMLProps } from 'react';

import './round-container.scss';

export function RoundContainer(props: HTMLProps<HTMLElement>): JSX.Element {
  return (
    <div className="round-container">
      { props.children }
    </div>
  );
}
