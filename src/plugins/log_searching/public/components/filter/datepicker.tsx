import React, { useState, Fragment } from 'react';
import { EuiSuperDatePicker } from '@elastic/eui';
import dateMath from '@elastic/datemath';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/states';

export default () => {
  const [recentlyUsedRanges, setRecentlyUsedRanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState<string | undefined>('now-30m');
  const [end, setEnd] = useState<string | undefined>('now');
  const [isPaused, setIsPaused] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState();

  const dispatch = useDispatch();

  const onTimeChange = ({ start, end }) => {
    const recentlyUsedRange = recentlyUsedRanges.filter((recentlyUsedRange) => {
      const isDuplicate = recentlyUsedRange.start === start && recentlyUsedRange.end === end;
      return !isDuplicate;
    });
    recentlyUsedRange.unshift({ start, end });
    setStart(start);
    setEnd(end);
    setRecentlyUsedRanges(
      recentlyUsedRange.length > 10 ? recentlyUsedRange.slice(0, 9) : recentlyUsedRange
    );
    setIsLoading(true);
    startLoading();

    const startMoment = dateMath.parse(start);
    const endMoment = dateMath.parse(end, { roundUp: true });
    dispatch(setFilter({ name: 'start_timestamp', value: startMoment?.format() }));
    dispatch(setFilter({ name: 'end_timestamp', value: endMoment?.format() }));
  };

  const updateStateFromURLParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const startParam = searchParams.get('start_timestamp');
    const endParam = searchParams.get('end_timestamp');

    if (startParam && endParam) {
      const startMoment = dateMath.parse(startParam);
      const endMoment = dateMath.parse(endParam, { roundUp: true });
      setStart(startMoment?.format('YYYY-MM-DDTHH:mm:ssZ'));
      setEnd(endMoment?.format('YYYY-MM-DDTHH:mm:ssZ'));
    }
  };

  const onRefresh = ({ start, end, refreshInterval }) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    }).then(() => {
      console.log(start, end, refreshInterval);
    });
  };

  const startLoading = () => {
    setTimeout(stopLoading, 1000);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const onRefreshChange = ({ isPaused, refreshInterval }) => {
    setIsPaused(isPaused);
    setRefreshInterval(refreshInterval);
  };

  React.useEffect(() => {
    const startMoment = dateMath.parse(start);
    const endMoment = dateMath.parse(end, { roundUp: true });
    dispatch(setFilter({ name: 'start_timestamp', value: startMoment?.format() }));
    dispatch(setFilter({ name: 'end_timestamp', value: endMoment?.format() }));
    updateStateFromURLParams();
  }, []);

  return (
    <Fragment>
      <EuiSuperDatePicker
        isLoading={isLoading}
        start={start}
        end={end}
        onTimeChange={onTimeChange}
        onRefresh={onRefresh}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
        onRefreshChange={onRefreshChange}
        recentlyUsedRanges={recentlyUsedRanges}
        showUpdateButton={false}
        locale={'en-US'}
      />
    </Fragment>
  );
};
