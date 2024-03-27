/* eslint-disable @osd/eslint/require-license-header */
import { EuiHeaderBreadcrumbs } from '@elastic/eui';
import React from 'react';
import useObservable from 'react-use/lib/useObservable';
import { Observable } from 'rxjs';
import { ChromeBreadcrumb } from '../../../chrome_service';
import { Arrow } from '../assets/Arrow';
import { SpaceLeft, SpaceRight } from './styles';

interface BreadCrumbValues {
  breadcrumbs$: Observable<ChromeBreadcrumb[]>;
}

export const HeaderBreadcrumbs = ({ breadcrumbs$ }: BreadCrumbValues) => {
  const breadcrumbs = useObservable(breadcrumbs$, []);
  const url = location.pathname;
  const appTitle = url.split('/').pop() as string;
  const titleFormatter = appTitle.replaceAll('-', ' ');

  let crumbs = breadcrumbs;

  if (breadcrumbs.length === 0) {
    crumbs = [{ text: titleFormatter }];
    if (titleFormatter === 'home') {
      document.title = 'Welcome - Analytics';
    } else if (titleFormatter === 'discover') {
      document.title = 'General Trace - Analytics';
    } else if (titleFormatter === 'data-streaming' || titleFormatter === '') {
      document.title = 'Data Streaming - Analytics';
    } else {
      document.title =
        titleFormatter.charAt(0).toUpperCase() + titleFormatter.slice(1) + ' - Analytics';
    }
  }

  const homePage = window.location.pathname.includes('home');
  const createDelivery = window.location.pathname.includes('create-a-delivery-stream');
  const editDelivery = window.location.pathname.includes('edit-delivery-stream');
  const discover = window.location.pathname.includes('discover');

  crumbs = crumbs.map((breadcrumb) => ({
    ...breadcrumb,
  }));

  return (
    <>
      {homePage === true ? (
        <>
          <EuiHeaderBreadcrumbs
            className="normal-style-level"
            breadcrumbs={[{ text: 'Welcome' }]}
            max={50}
            data-test-subj="breadcrumbs"
          />
        </>
      ) : createDelivery === true ? (
        <>
          <EuiHeaderBreadcrumbs
            className="first-level-color"
            breadcrumbs={[{ text: 'Data Streaming' }]}
            max={50}
            data-test-subj="breadcrumbs"
          />
          <SpaceLeft />
          <Arrow />
          <SpaceRight />
          <EuiHeaderBreadcrumbs
            className="second-level-color"
            breadcrumbs={[{ text: 'Create a Delivery Stream' }]}
            max={50}
            data-test-subj="breadcrumbs"
          />
        </>
      ) : editDelivery === true ? (
        <>
          <EuiHeaderBreadcrumbs
            className="first-level-color"
            breadcrumbs={[{ text: 'Data Streaming' }]}
            max={50}
            data-test-subj="breadcrumbs"
          />
          <SpaceLeft />
          <Arrow />
          <SpaceRight />
          <EuiHeaderBreadcrumbs
            className="second-level-color"
            breadcrumbs={[{ text: 'Edit Delivery Stream' }]}
            max={50}
            data-test-subj="breadcrumbs"
          />
        </>
      ) : discover === true ? (
        <EuiHeaderBreadcrumbs
          className="normal-style-level"
          breadcrumbs={[{ text: 'General Trace' }]}
          max={50}
          data-test-subj="breadcrumbs"
        />
      ) : (
        <EuiHeaderBreadcrumbs
          className="normal-style-level"
          breadcrumbs={crumbs}
          max={50}
          data-test-subj="breadcrumbs"
        />
      )}
    </>
  );
};
