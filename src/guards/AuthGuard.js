import React from 'react';
import PropTypes from 'prop-types';
import useAuth from 'src/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';

function AuthProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();

  console.log(isAuthenticated);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

AuthProtect.propTypes = {
  children: PropTypes.node
};

export default AuthProtect;
