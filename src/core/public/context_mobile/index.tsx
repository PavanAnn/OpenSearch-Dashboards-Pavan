/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */

import React, { useEffect, useState, createContext, useCallback } from 'react';

type ContextProps = {
  height: number;
  width: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSideChanges: () => void;
};

type ChildrenProps = {
  children: React.ReactNode;
};

// @ts-expect-error
export const MobileContext = createContext<ContextProps>({
  height: 0,
  width: 0,
  open: false,
});

export const MobileContextProvider = ({ children }: ChildrenProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleSideChanges = () => {
    setOpen(!open);
  };

  const getHeight = useCallback(() => {
    return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  }, []);

  const getWidth = useCallback(() => {
    return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  }, []);

  const [height, setHeight] = useState<number>(getHeight());
  const [width, setWidth] = useState<number>(getWidth());

  useEffect(() => {
    const handleResize = () => {
      setHeight(getHeight());
      setWidth(getWidth());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getHeight, getWidth]);

  return (
    <MobileContext.Provider value={{ height, width, open, setOpen, handleSideChanges }}>
      {children}
    </MobileContext.Provider>
  );
};
