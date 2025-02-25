/* eslint-disable react-refresh/only-export-components */
import AuthLayout from '@/components/layout/AuthLayout';
import MainLayout from '@/components/layout/MainLayout';
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import RouteAuthorization from './../components/layout/RouteAuthorization';
import permissions from './../configuration/permissions';
import settingsRoutes from './settingsRoutes';
const Login = lazy(() => import('@/pages/login/Login'));
const Error = lazy(() => import('@/pages/error/Error'));
const Home = lazy(() => import('@/pages/home/Home'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Navigate to='/admin/dashboard' replace />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: (
          <RouteAuthorization
            element={Dashboard}
            permission={permissions.VIEW_DASHBOARD}
          />
        ),
      },
      ...settingsRoutes,
    ],
  },
  {
    path: '',
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
  {
    path: '*',
    element: <Error />,
  },
]);

export default router;
