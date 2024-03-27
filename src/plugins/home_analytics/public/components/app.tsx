/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { I18nProvider } from '@osd/i18n/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { i18n } from '@osd/i18n';
import { useWindowDimensions } from './hooks/useWindowSize';
import { CoreStart } from '../../../../core/public';
import { NavigationPublicPluginStart } from '../../../navigation/public';
import { CardsContainer, Card, CardContent, CardHeader, CardDescription } from './styles';
import { LogSearchIcon } from './assets/LogSearchIcon';
import { GeneralTraceIcon } from './assets/GeneralTraceIcon';
import { VisualizeIcon } from './assets/VisualizeIcon';
import { DataStreamingIcon } from './assets/DataStreamingLogo';
import { BlogIcon } from './assets/BlogIcon';
import { HelpIcon } from './assets/HelpIcon';
import { ChromeStart } from '../../../../core/public';
import { NotificationKibana } from './NotificationKibana';

interface HomeAnalyticsAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart['chrome'];
}

interface CardProps {
  title: string;
  message: string;
  link: any;
  icon: any;
  blank?: boolean;
}

function setBreadcrumbs(chrome: ChromeStart) {
  chrome.setBreadcrumbs([
    {
      text: i18n.translate('devTools.k7BreadcrumbsDevToolsLabel', {
        defaultMessage: 'Home',
      }),
      href: '/app/home',
      // href:'#/'
    },
  ]);
}

export const HomeAnalyticsApp = ({
  basename,
  notifications,
  http,
  application,
  chrome,
}: HomeAnalyticsAppDeps) => {
  setBreadcrumbs(chrome);

  const MapCards: CardProps[] = [
    {
      title: 'General Trace',
      message: 'Track, filter and inspect all logs from your APIs',
      link: 'discover',
      icon: <GeneralTraceIcon />,
    },
    {
      title: 'Dashboards',
      message: 'Customize your Dashboards according to your needs',
      link: 'dashboards',
      icon: <LogSearchIcon />,
    },
    {
      title: 'Visualize',
      message: 'Create the visualization type that best represents your data',
      link: 'visualize',
      icon: <VisualizeIcon />,
    },
    {
      title: 'Data Streaming',
      message: 'Stream your data to third-party destinations',
      link: 'data-streaming',
      icon: <DataStreamingIcon />,
    },
    {
      title: 'Sensedia Blog',
      message: 'More content about everything API-related',
      link: 'https://br.sensedia.com/blog',
      icon: <BlogIcon />,
      blank: true,
    },
    {
      title: 'Online Help',
      message: 'User guides and tutorials about every Sensedia product',
      link: 'https://docs.sensedia.com/en/analytics-guide/Latest/index.html',
      icon: <HelpIcon />,
      blank: true,
    },
  ];

  const [policies, setPolicies] = React.useState([
    'home',
    'management',
    'visualize',
    'dashboards',
    'management/opensearch-dashboards/objects',
  ]);
  const [closeKibanaNotify, setCloseKibanaNotify] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  const isUserApim = localStorage.getItem('ls.Sensedia-Auth');

  React.useEffect(() => {
    setPolicies([
      'home',
      'management',
      'visualize',
      'dashboards',
      'traces',
      'logSearching',
      'discover',
      'data-streaming',
      'management/opensearch-dashboards/objects',
    ]);
  }, []);

  const [widthSidebar, setWidthSidebar] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setWidthSidebar(true);
    } else {
      setWidthSidebar(false);
    }
  }, [width]);

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          {isUserApim && !closeKibanaNotify ? (
            <NotificationKibana
              closeKibanaComponent={closeKibanaNotify}
              setCloseComponente={setCloseKibanaNotify}
            />
          ) : null}
          <CardsContainer>
            {MapCards.map((card, index) =>
              policies.includes(card.link) ||
              card.title.includes('Help') ||
              card.title.includes('Blog') ? (
                <Card
                  style={{
                    maxWidth: widthSidebar ? '45%' : '30%',
                  }}
                  key={index}
                  onClick={() =>
                    card.blank
                      ? window.open(card.link, '_blank')
                      : application.navigateToApp(card.link)
                  }
                >
                  <CardContent>
                    <CardHeader onClick={() => console.log(width)}>
                      {card.icon}
                      &nbsp;&nbsp;
                      {card.title}
                    </CardHeader>
                    <CardDescription>{card.message}</CardDescription>
                  </CardContent>
                </Card>
              ) : (
                ''
              )
            )}
          </CardsContainer>
        </>
      </I18nProvider>
    </Router>
  );
};
