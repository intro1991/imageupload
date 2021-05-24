import React from 'react';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';

function GuestProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
}

GuestProtect.propTypes = {
  children: PropTypes.node
};

export default GuestProtect;
