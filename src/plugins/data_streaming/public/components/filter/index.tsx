import React, { useContext, useEffect, useState } from 'react';
import '../../index.scss';
import { Link } from 'react-router-dom';
import { CoreStart } from '../../../../../core/public';
import { StreamingContext } from '../../context/streaming/context';
import { InputEl, Wrapper, BtnDataStreaming, BtnOutline, BtnEmpty } from './styles';
import { useWindowDimensions } from '../list/useWindowSize';

interface FilterAppDeps {
  notifications: CoreStart['notifications'];
  application: CoreStart['application'];
}

export const Filter = ({ notifications, application }: FilterAppDeps) => {
  const { setFilter, filter, handleSearchCard, total, handleSearchClean, policies } = useContext(
    StreamingContext
  );

  const search = async (event: any) => {
    event?.preventDefault();
    handleSearchCard();
  };

  const { width } = useWindowDimensions();

  const [widthSidebar, setWidthSidebar] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setWidthSidebar(true);
    } else {
      setWidthSidebar(false);
    }
  }, [width]);

  return (
    <>
      <Wrapper style={{ width: widthSidebar ? '95%' : '100%', margin: 'auto' }}>
        <form onSubmit={search}>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <InputEl
              placeholder="Search for a data stream"
              width="30%"
              aria-label=""
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            />
            <BtnOutline type='submit'>SEARCH</BtnOutline>
            <BtnEmpty onClick={handleSearchClean}>CLEAR</BtnEmpty>
          </div>
        </form>
        <>
          <BtnDataStreaming
            disabled={
              !policies.includes('analytics.data-streaming.create')
                ? true
                : total < 2
                ? false
                : true
            }
          >
            <Link to={{ ...location, pathname: `/create-a-delivery-stream` }}>
              {' '}
              {'NEW DELIVERY STREAM'}{' '}
            </Link>
          </BtnDataStreaming>
        </>
      </Wrapper>
    </>
  );
};
