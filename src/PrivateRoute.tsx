/* eslint-disable react/jsx-props-no-spreading */
import {Route,Navigate } from 'react-router-dom';

import {useAuth} from 'context/auth-context';
import {ProtectRoute} from 'context/user-context';

const PrivateRoute = ({children, ...rest}) => {
  const {isAuth} = useAuth();
  // ProtectRoute();

  return (
    <>
       {  isAuth ? (
          // children
          <ProtectRoute> {children}</ProtectRoute>
        ) : (
          <Navigate
            to='/login'
          />
        )
      }
    </>
  );
};

export default PrivateRoute;
