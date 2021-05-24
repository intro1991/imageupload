import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from 'src/redux/slices/authJwt';

export default function useAuth() {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector((state) => state.authJwt);

  return {
    user: user,
    isLoading: isLoading,
    isAuthenticated: isAuthenticated,

    login: ({ employeeId, password }) =>
      dispatch(
        login({
          employeeId: employeeId,
          password: password
        })
      ),
    logout: () => dispatch(logout()),

    resetPassword: () => {},

    updateProfile: () => {}
  };
}
