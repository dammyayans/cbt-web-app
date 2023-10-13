/* eslint-disable react/jsx-props-no-spreading */
import {Navigate} from 'react-router-dom';

import {useAuth} from 'context/auth-context';
import {ProtectRoute} from 'context/user-context';
import {ProtectLRoute} from 'context/lecturer-context';
import {ProtectARoute} from 'context/admin-context';

const PrivateRoute = ({children, type}) => {
  const {isAuth} = useAuth();
  // ProtectRoute();
  if (type === 'student') {
    return (
      <>
        {isAuth === 'student' ? (
          // children
          <ProtectRoute>{children}</ProtectRoute>
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  }
  if (type === 'lecturer') {
    return (
      <>
        {isAuth === 'lecturer' ? (
          // children
          <ProtectLRoute>{children}</ProtectLRoute>
        ) : (
          <Navigate to="/lecturer/login" />
        )}
      </>
    );
  }
  if (type === 'admin') {
    return (
      <>
        {isAuth === 'admin' ? (
          // children
          <ProtectARoute>{children}</ProtectARoute>
        ) : (
          <Navigate to="/admin/login" />
        )}
      </>
    );
  }
  return null;
};

export default PrivateRoute;
