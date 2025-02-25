import RouteAuthorization from '@/components/layout/RouteAuthorization';
import { lazy } from 'react';
import permissions from './../configuration/permissions';

const country = lazy(() => import('@/pages/country/Country'));
const state = lazy(() => import('@/pages/state/State'));
const area = lazy(() => import('@/pages/area/Area'));
const zone = lazy(() => import('@/pages/zone/Zone'));
const language = lazy(() => import('@/pages/language/Language'));
const currency = lazy(() => import('@/pages/currency/Currency'));

// * These routes should be under main layout
const settingsRoutes = [
  {
    path: 'country',
    element: (
      <RouteAuthorization
        element={country}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },
  {
    path: 'state',
    element: (
      <RouteAuthorization
        element={state}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },
  {
    path: 'area',
    element: (
      <RouteAuthorization
        element={area}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },
  {
    path: 'zone',
    element: (
      <RouteAuthorization
        element={zone}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },

  {
    path: 'language',
    element: (
      <RouteAuthorization
        element={language}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },

  {
    path: 'currency',
    element: (
      <RouteAuthorization
        element={currency}
        permission={permissions.VIEW_SETTINGS}
      />
    ),
  },
];

export default settingsRoutes;
