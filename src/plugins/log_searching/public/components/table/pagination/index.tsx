import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiPagination } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getLogs, setPagination } from '../../store/states';

const PaginationTable = () => {
  const dispatch = useDispatch();
  const { pagination, totalLogs, formFilter } = useSelector((state: RootState) => state.logReducer);

  const pageCount = Math.ceil(totalLogs / pagination.size);
  const currentPage = pagination.page - 1;

  const onPageChange = async (page: number) => {
    const nextPage = page + 1;
    dispatch(setPagination({ ...pagination, page: nextPage }));
    await dispatch(getLogs({ formFilter, pagination: { ...pagination, page: nextPage } }));
  };

  if (pageCount < 1) return null;

  return (
    <EuiFlexGroup justifyContent="flexEnd">
      <EuiFlexItem grow={false}>
        <EuiPagination pageCount={pageCount} activePage={currentPage} onPageClick={onPageChange} />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export { PaginationTable };
