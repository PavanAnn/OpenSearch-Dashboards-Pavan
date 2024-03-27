import React from 'react';
import { ButtonLink, CardContent, CardHeader, CardNotification, Title } from './styles';
import { CloseIcon } from '../assets/CloseIcon';
import { AttentionInfo } from '../assets/AttentionInfo';

interface CloseProps {
  closeKibanaComponent: boolean;
  setCloseComponente: (closeKibanaComponent: boolean) => void;
}

export const NotificationKibana = ({ closeKibanaComponent, setCloseComponente }: CloseProps) => {
  const toggleClose = () => setCloseComponente(!closeKibanaComponent);

  const openInNewTab = (url: string) => {
    window.open(window.location.origin + url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CardNotification>
      <CardHeader>
        <div className="left-content">
          <AttentionInfo />
          <Title>Historical data</Title>
        </div>
        <div className="right-content" onKeyDown={() => {}} onClick={toggleClose}>
          <CloseIcon />
        </div>
      </CardHeader>
      <CardContent>
        <p>
          Access the data generated prior to migration for up to 90 days from the data generation
          date via the previous interface. <br /> Click <b>see data</b> to access.
        </p>
        <ButtonLink onClick={() => openInNewTab('/kibana/app/kibana')}>SEE DATA</ButtonLink>
      </CardContent>
    </CardNotification>
  );
};
