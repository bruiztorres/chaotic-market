import React, { HTMLProps } from 'react';

import './nav-bar.scss';

export function NavBar(props: HTMLProps<HTMLElement>): JSX.Element {
  return (<nav {...props} />);
}
