import React, {createContext, useContext, useState} from 'react';
import {Cookies, useCookies} from 'react-cookie';

import {ContextValueType, PropsType} from '../types';

import isJwtExpired from 'constants/isJwtExpired';

export const AuthContext = createContext<ContextValueType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({children}: PropsType) => {
  const [, setCookies, removeCookies] = useCookies(['token', 'refreshToken']);
  const [isAuth, setIsAuth] = useState(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    return !isJwtExpired(token);
  });

  const login = () => {
    setIsAuth(true);
    // setTimeout(cb, 100); // fake async
  };
  const signOut = () => {
    removeCookies('token');
    setIsAuth(false);
    // setTimeout(cb, 100); // fake async
  };

  const authenticate = async (token: string) => {
    try {
      console.log('authenticating', token);
      setCookies('token', token);
      // setCookies('refreshToken', refreshToken);
      // setUser(userData);
      setIsAuth(true);
      //  const {data: userData} = await api.get(API.profile);
      //  console.log(userData);
      //  return userData.data;
      return Promise.resolve('');
    } catch (error) {
      console.log({error});
      removeCookies('token');
      // removeCookies('refreshToken');
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{isAuth, setIsAuth, login, signOut, authenticate}}>
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
