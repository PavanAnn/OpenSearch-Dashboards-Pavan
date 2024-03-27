/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CoreStart } from '../../../../../core/public';

import {
  EuiSelectMod,
  Wrapper,
  BtnOutline,
  BtnEmpty,
  ModalWrapper,
  InputWrapper,
  InputEl,
  SelectWrapper,
  PickerWrapper,
  Badge,
  BoxBadger,
  Btn,
  ErrorMessage,
} from './styles';

import { FilterIcon } from '../assets/filterIcon';
import { CloseIcon } from '../assets/closeIcon';
import { Modal } from '../modals/modal.active';
import { Level, Product } from '../../consts/form';

import Datepicker from './datepicker';
import {
  setFilter,
  clearFilter,
  handleAdd,
  handleRemove,
  getLogs,
  setSearchClicked,
  setInitializedFromURL,
  setPagination,
} from '../store/states';
import { RootState } from '../store/store';

interface FilterAppDeps {
  notifications: CoreStart['notifications'];
  application: CoreStart['application'];
}

export const Filter = ({ notifications, application }: FilterAppDeps) => {
  const dispatch = useDispatch();
  const { formFilter, pagination } = useSelector((state: RootState) => state.logReducer);
  const location = useLocation();

  const [active, setActive] = useState(false);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchDisabled, setSearchDisabled] = useState(true);

  const severityNumberURL = formFilter.severity_number as string;

  const getLevelFromNumber = () => {
    if (parseInt(severityNumberURL, 10) >= 1 && parseInt(severityNumberURL, 10) <= 4)
      return 'trace';
    if (parseInt(severityNumberURL, 10) >= 5 && parseInt(severityNumberURL, 10) <= 8)
      return 'debug';
    if (parseInt(severityNumberURL, 10) >= 9 && parseInt(severityNumberURL, 10) <= 12)
      return 'info';
    if (parseInt(severityNumberURL, 10) >= 13 && parseInt(severityNumberURL, 10) <= 16)
      return 'warn';
    if (parseInt(severityNumberURL, 10) >= 17 && parseInt(severityNumberURL, 10) <= 20)
      return 'error';
    if (parseInt(severityNumberURL, 10) >= 21 && parseInt(severityNumberURL, 10) <= 24)
      return 'fatal';

    return 'UNKNOWN';
  };

  React.useEffect(() => {
    setSearchDisabled(!formFilter.product_name);
  }, [formFilter.product_name]);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const values: Record<string, string> = {};

    const allowedValues: Record<string, Set<string>> = {
      product_name: new Set([
        'api-governance',
        'api-gateway',
        'developer-portal',
        'events-hub',
        'flexible-actions',
        'integrations',
        'open-finance',
        'open-insurance',
        'service-mesh',
      ]),
      severity_text: new Set(['debug', 'error', 'fatal', 'info', 'trace', 'warn']),
    };
    for (const [key, value] of searchParams.entries()) {
      if (key === 'product_name' || key === 'severity_text') {
        const allowedSet = allowedValues[key];

        if (allowedSet && allowedSet.has(value)) {
          values[key] = value;
          dispatch(setFilter({ name: key, value }));
        }
      } else {
        values[key] = value;
        dispatch(setFilter({ name: key, value }));
      }
    }

    // Defina a flag initializedFromURL como verdadeira se houver parâmetros na URL
    if (Object.keys(values).length > 0) {
      dispatch(setInitializedFromURL(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();

    dispatch(setFilter({ formFilter }));

    if (!searchDisabled) {
      const updatedPagination = { ...pagination, page: 1 };
      dispatch(getLogs({ formFilter, pagination: updatedPagination }));
      dispatch(setPagination(updatedPagination));
      dispatch(setSearchClicked(true));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    const inputValue = e.target.value;

    const sanitizedValue = inputValue.replace(/\s/g, '');
    setter(sanitizedValue);
  };

  const handleAddItem = () => {
    if (key.trim() !== '' && value.trim() !== '') {
      const hasDuplicate = formFilter.log_attributes?.some(
        (item: { key: string; value: string }) => item.key === key && item.value === value
      );
      const cannotBeEmpty = formFilter.log_attributes?.some(
        (item: { key: string; value: string }) => item.key.trim() === '' && item.value.trim() === ''
      );
      if (hasDuplicate) {
        setErrorMessage('Duplicated key/value');
        return;
      }
      if (formFilter.log_attributes?.length === 10) {
        setErrorMessage('Maximum of 10 key/value');
        return;
      }
      if (cannotBeEmpty) {
        setErrorMessage('Key/Value cannot be empty');
        return;
      }
      setErrorMessage('');
      dispatch(handleAdd({ key, value }));
      setKey('');
      setValue('');
    } else {
      setErrorMessage('Key/Value cannot be empty');
    }
  };
  React.useEffect(() => {
    if ((key && value).length === 0) setErrorMessage('');
  }, [key, value]);

  return (
    <>
      <Wrapper>
        <PickerWrapper>
          <div className="preset-time-title">Preset time</div>
          <Datepicker />
        </PickerWrapper>

        <InputWrapper>
          <label style={{ paddingLeft: '14px' }} htmlFor="body">
            Body
          </label>
          <InputEl
            placeholder="Body"
            width="30%"
            id="body"
            name="body"
            onChange={(e) => dispatch(setFilter({ name: e.target.name, value: e.target.value }))}
            value={formFilter.body}
          />
        </InputWrapper>

        <SelectWrapper>
          <label style={{ paddingLeft: '28px' }} htmlFor="severity_text">
            Level
          </label>
          <EuiSelectMod
            id="severity_text"
            options={Level}
            name="severity_text"
            value={
              formFilter.severity_text === undefined
                ? getLevelFromNumber()
                : formFilter.severity_text
            }
            onChange={(e) => {
              dispatch(setFilter({ name: e.target.name, value: e.target.value }));
            }}
          />
        </SelectWrapper>

        <SelectWrapper>
          <label style={{ paddingLeft: '28px' }} htmlFor="product_name">
            Product name
          </label>
          <EuiSelectMod
            id="product_name"
            options={Product}
            name="product_name"
            value={formFilter.product_name}
            onChange={(e) => {
              dispatch(setFilter({ name: e.target.name, value: e.target.value }));
            }}
            className="custom-eui-select"
          />
        </SelectWrapper>

        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <span
            onKeyDown={() => {}}
            onClick={() => {
              setActive(true);
            }}
          >
            <FilterIcon />
          </span>
          {searchDisabled ? (
            <Btn disabled>SEARCH</Btn>
          ) : (
            <BtnOutline onClick={handleSubmit}>SEARCH</BtnOutline>
          )}
        </div>
      </Wrapper>
      <Modal
        width={396}
        active={active}
        hideModal={() => setActive(false)}
        title="FILTERS"
        footer={
          <>
            <BtnEmpty
              onClick={() => {
                setActive(false);
                dispatch(clearFilter());
              }}
            >
              {'CANCEL'}
            </BtnEmpty>
            <BtnOutline
              onClick={() => {
                setActive(false);
              }}
            >
              {'APPLY'}
            </BtnOutline>
          </>
        }
      >
        <ModalWrapper>
          <InputWrapper>
            <label htmlFor="trace_id">Trace ID</label>
            <InputEl
              id="trace_id"
              placeholder="Trace ID"
              aria-label="trace id"
              name="trace_id"
              value={formFilter.trace_id}
              onChange={(e) => {
                dispatch(setFilter({ name: e.target.name, value: e.target.value }));
              }}
            />
          </InputWrapper>
        </ModalWrapper>

        <ModalWrapper>
          <InputWrapper>
            <label htmlFor="body">Body</label>
            <InputEl
              id="body"
              placeholder="Body"
              aria-label="body"
              name="body"
              value={formFilter.body}
              onChange={(e) => {
                dispatch(setFilter({ name: e.target.name, value: e.target.value }));
              }}
            />
          </InputWrapper>
        </ModalWrapper>

        <ModalWrapper>
          <InputWrapper>
            <label htmlFor="span_id">Span ID</label>
            <InputEl
              id="span_id"
              placeholder="Span ID"
              aria-label="span id"
              name="span_id"
              value={formFilter.span_id}
              onChange={(e) => {
                dispatch(setFilter({ name: e.target.name, value: e.target.value }));
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="service_name">Service name</label>
            <InputEl
              id="service_name"
              placeholder="Service name"
              aria-label="service name"
              name="service_name"
              value={formFilter.service_name}
              onChange={(e) => {
                dispatch(setFilter({ name: e.target.name, value: e.target.value }));
              }}
            />
          </InputWrapper>
        </ModalWrapper>

        <ModalWrapper>
          <InputWrapper>
            <label htmlFor="key">Key</label>
            <InputEl
              id="key"
              placeholder="Key"
              aria-label="Key"
              onChange={(e) => handleChange(e, setKey)}
              value={key}
            />
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="value">Value</label>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <InputEl
                id="value"
                placeholder="Value"
                aria-label="value"
                onChange={(e) => handleChange(e, setValue)}
                value={value}
              />
              <span
                onKeyDown={() => {}}
                style={{
                  marginTop: '5px',
                  fontSize: '31px',
                  color: '#837FF6',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={handleAddItem}
              >
                +
              </span>
            </div>
          </InputWrapper>
        </ModalWrapper>
        <ErrorMessage>
          {errorMessage && <p style={{ color: '#FF0000' }}>{errorMessage}</p>}
        </ErrorMessage>
        <BoxBadger>
          {(formFilter.log_attributes || formFilter.resource_attributes) &&
            [...(formFilter.log_attributes || []), ...(formFilter.resource_attributes || [])].map(
              (value: any, index: number) => {
                if (index < 10) {
                  return (
                    <div key={index}>
                      <Badge>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              maxWidth: '100px',
                            }}
                          >
                            {value.key}
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
                            {value.value}
                          </div>
                        </div>
                        <span
                          onKeyDown={() => {}}
                          style={{ marginLeft: '5px', marginTop: '3px', cursor: 'pointer' }}
                          onClick={() => {
                            dispatch(handleRemove(index));
                          }}
                        >
                          <CloseIcon />
                        </span>
                      </Badge>
                    </div>
                  );
                }
                return null;
              }
            )}
        </BoxBadger>
      </Modal>
    </>
  );
};
