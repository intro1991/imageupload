import React from 'react';
// material
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';
// routes
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
// hooks
import useAuth from 'src/hooks/useAuth';
// contexts
import { SettingsProvider } from './contexts/SettingsContext';
// theme
import ThemeConfig from './theme';
// components
import LoadingScreen from 'src/components/LoadingScreen';
import ThemePrimaryColor from 'src/components/ThemePrimaryColor';
import RtlLayout from 'src/components/RtlLayout';
import Settings from 'src/components/settings';
import ScrollToTop from 'src/components/ScrollToTop';
import NotistackProvider from 'src/components/NotistackProvider';
import AuthProvider from 'src/guards/AuthProvider';

import Login from 'src/views/Login';

export default function App() {
  //const { isInitialized } = useAuth();
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterDateFns}></LocalizationProvider>
        <SettingsProvider>
          <BrowserRouter>
            <ThemeConfig>
              <ThemePrimaryColor>
                <RtlLayout>
                  <NotistackProvider>
                    <AuthProvider>
                      <Settings />
                      <ScrollToTop />
                      <Login />
                      <Router />
                    </AuthProvider>
                  </NotistackProvider>
                </RtlLayout>
              </ThemePrimaryColor>
            </ThemeConfig>
          </BrowserRouter>
        </SettingsProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
