import { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Route, HashRouter, Routes, Navigate, Link } from 'react-router-dom';

import 'language/i18n';
import routes, { ROUTE_URLS } from 'constants/routes';

import Header from 'components/AppHeader';
import ProtectedRoute from 'components/ProtedtedRoute';

import { useLanguage } from 'hooks/layoutHook/useLanguage';
import { Grid, Image, Layout, Menu } from 'antd';
const { useBreakpoint } = Grid;
const { Sider } = Layout;
import Logo from 'resources/images/logo.png';

const App = () => {
  const screens = useBreakpoint();
  console.log({ screens });
  useLanguage();

  const renderRoute = (route: any) => {
    const Component = route?.component || Fragment;
    const Layout = route?.layout || Fragment;

    return (
      <Route
        path={route.path}
        key={route.path}
        index={!!route?.index}
        element={
          <Layout>
            {route?.isPrivate ? (
              <ProtectedRoute key={route.path}>
                <Component />
              </ProtectedRoute>
            ) : (
              <Component />
            )}
          </Layout>
        }
      />
    );
  };

  return (
    <HashRouter>
      <Layout>
        <Header />

        <Routes>
          {routes.map((route) => renderRoute(route))}
          <Route path="*" element={<Navigate to={ROUTE_URLS.HOME} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default withTranslation()(App);
