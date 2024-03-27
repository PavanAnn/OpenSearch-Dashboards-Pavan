import React from 'react';
import { EuiButtonEmpty, EuiText } from '@elastic/eui';
import { useDispatch, useSelector } from 'react-redux';
import refreshIcon from '../../assets/refreshIcon.svg';
import { BlockLeftFilter, BlockRightFilter, ContainerFilterListing } from '../sectionTable.styles';
import { RootState } from '../../store/store';
import { CloseIcon } from '../../assets/closeIcon';
import { clearFilter, getLogs, handleRemove, resetPagination } from '../../store/states';
import { Badge } from '../../filter/styles';

export const FilterListing = () => {
  const dispatch = useDispatch();
  const { formFilter, pagination } = useSelector((state: RootState) => state.logReducer);

  const handleClearFilters = () => {
    dispatch(clearFilter());
  };

  const handleRefreshFilters = async () => {
    dispatch(getLogs({ formFilter, pagination: { ...pagination, page: 1 } }));
    dispatch(resetPagination());
  };

  return (
    <ContainerFilterListing>
      <BlockLeftFilter>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {formFilter.log_attributes || formFilter.resource_attributes ? (
            Array.isArray(formFilter.log_attributes) ||
            Array.isArray(formFilter.resource_attributes) ? (
              (formFilter.log_attributes && formFilter.log_attributes.length > 0) ||
              (formFilter.resource_attributes && formFilter.resource_attributes.length > 0) ? (
                [
                  ...(formFilter.log_attributes || []),
                  ...(formFilter.resource_attributes || []),
                ].map((attribute: any, index: number) => {
                  const { key, value } = attribute;
                  return (
                    <div key={index}>
                      <Badge>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100px',
                          }}
                        >
                          {key}
                        </div>
                        <span>&nbsp;/&nbsp;</span>
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '100px',
                          }}
                        >
                          {value}
                        </div>
                        <div
                          className="close-icon"
                          onClick={() => dispatch(handleRemove(index))}
                          onKeyDown={() => {}}
                        >
                          <CloseIcon />
                        </div>
                      </Badge>
                    </div>
                  );
                })
              ) : (
                <EuiText className="no-filters">No filters applied.</EuiText>
              )
            ) : (
              <EuiText className="no-filters">No filters applied.</EuiText>
            )
          ) : (
            <EuiText className="no-filters">No filters applied.</EuiText>
          )}
        </div>
      </BlockLeftFilter>
      <BlockRightFilter>
        {formFilter.log_attributes?.length || formFilter.resource_attributes?.length ? (
          <EuiButtonEmpty
            disabled={!formFilter.log_attributes?.length && !formFilter.resource_attributes?.length}
            className="button-clear"
            onClick={handleClearFilters}
          >
            CLEAR
          </EuiButtonEmpty>
        ) : null}
        <EuiButtonEmpty onClick={handleRefreshFilters}>
          <img src={refreshIcon} alt={'refresh icon'} style={{ marginTop: '5px' }} />
        </EuiButtonEmpty>
      </BlockRightFilter>
    </ContainerFilterListing>
  );
};
