import React from 'react';

import { StreamingContextProvider } from './streaming/context';

export const GlobalContext: React.FC = ({ children }: any) => {
  return (
    <>
      <StreamingContextProvider>{children}</StreamingContextProvider>
    </>
  );
};
