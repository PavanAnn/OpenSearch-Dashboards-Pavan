import React from 'react';
import { SectionTable } from './sectionTable.styles';
import { MainTable } from './mainTable';
import { FilterListing } from './filterListing';
import { PaginationTable } from './pagination';

const LogSearchTable = () => {
  return (
    <SectionTable>
      <FilterListing />
      <MainTable />
      <PaginationTable />
    </SectionTable>
  );
};

export { LogSearchTable };
