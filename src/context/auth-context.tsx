import React, {createContext, useContext, useState} from 'react';
import {Cookies, useCookies} from 'react-cookie';

import {ContextValueType, PropsType} from '../types';

import isJwtExpired from 'constants/isJwtExpired';

export const AuthContext = createContext<ContextValueType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({children}: PropsType) => {
  const [, setCookies, removeCookies] = useCookies([
    'token',
    'type',
    'adminDetails',
    'lecturerDetails',
    'studentDetails',
  ]);
  const [isAuth, setIsAuth] = useState(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const type = cookies.get('type');
    return !isJwtExpired(token) ? type : '';
  });

  const login = type => {
    setIsAuth(type);
    setCookies('type', type);
    // setTimeout(cb, 100); // fake async
  };

  const signOut = type => {
    try {
      removeCookies('token');
      removeCookies('type');
      type === 'admin' && removeCookies('adminDetails');
      type === 'lecturer' && removeCookies('lecturerDetails');
      type === 'student' && removeCookies('studentDetails');
      setIsAuth('');
      // setTimeout(cb, 100); // fake async
    } catch (e) {
      console.log({object: e});
    }
  };

  const studentSignOut = () => {
    try {
      removeCookies('studentDetails');
      removeCookies('type');
      removeCookies('token');
      setIsAuth('');
    } catch (e) {
      console.log({object: e});
    }
  };

  const authenticate = async (
    token: string,
    type: string,
    details?: Object,
  ) => {
    try {
      // console.log('authenticating', token);
      setCookies('token', token);
      setCookies('type', type);
      if (type === 'admin') setCookies('adminDetails', details);
      if (type === 'lecturer') setCookies('lecturerDetails', details);
      if (type === 'student') setCookies('studentDetails', details);
      setIsAuth(type);
      return Promise.resolve('');
    } catch (error) {
      // console.log({error});
      removeCookies('token');
      removeCookies('type');
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{isAuth, setIsAuth, login, signOut, studentSignOut, authenticate}}>
      {children}
    </AuthContext.Provider>
  );
};

// export const ProtectRoute = ({children}) => {
//   const {isAuthenticated, isLoading} = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated && !isLoading) {
//       router.replace(router.route, '/login', {shallow: true});
//       toast.error('Expire session!');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuthenticated, isLoading]);

//   if (
//     isLoading ||
//     (!isAuthenticated && window.location.pathname !== '/login')
//   ) {
//     return (
//       <div
//         style={{
//           height: '100vh',
//           display: 'flex',
//           width: '100vw',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         <Lottie style={{height: '15vh'}} animationData={loadingAnimationData} />
//       </div>
//     );
//   }
//   if (!isAuthenticated && !isLoading) {
//     return <LoginPage redirectTo={router.pathname} />;
//   }
//   return children;
// };
