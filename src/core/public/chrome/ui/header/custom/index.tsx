/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useEffect, useRef, useState } from 'react';
import {
  ContainerSidebar,
  DropdownContainer,
  DropdownLinkStyle,
  Indicator,
  SideBorder,
  Text,
} from './styles';

interface DropdownProps {
  isActive?: (args: any[]) => boolean;
  text: string;
  children?: React.ReactChild | React.ReactChild[];
  isOpen: boolean;
}

export const DropdownLink = ({ text, children, isOpen }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const refChild = useRef<HTMLUListElement>(document.createElement('ul'));

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isOpen ? setOpen(true) : setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownLinkStyle open={open}>
      <a
        onClick={() => !!children && setOpen(!open)}
        className={isOpen ? 'dropdown active' : 'dropdown'}
      >
        <Indicator />
        <Text>{text}</Text>
      </a>

      <DropdownContainer open={!!children && open} ref={refChild}>
        {children}
      </DropdownContainer>
    </DropdownLinkStyle>
  );
};

interface SidebarProps {
  open: boolean;
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({ open, children }) => {
  return (
    <>
      <ContainerSidebar open={open}>{children}</ContainerSidebar>
      <SideBorder />
    </>
  );
};
