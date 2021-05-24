import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInitialize } from 'src/redux/slices/authJwt';

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthProvider;
