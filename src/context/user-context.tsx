import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {useCookies} from 'react-cookie';
import useFetch from 'use-http';
import {useHistory} from 'react-router';
import toast from 'react-hot-toast';

import {ContextValueType, PropsType} from '../types';

import isJwtExpired from 'constants/isJwtExpired';
import API from 'constants/api';
import screens from 'constants/screens';

export const UserContext = createContext<ContextValueType>({});
export const useUser = () => useContext(UserContext);

export const ProtectRoute = ({children}) => {
  const {user, loading} = useUser();
  const history = useHistory();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (!loading && !user) {
      //
      if (history?.location.pathname !== '/login') {
        history.replace(
          history?.location.pathname === '/' ? '/welcome' : '/login',
        );
      }
      const {token} = cookies;

      if (token) toast.error('Expire session!');
    }
  }, [cookies, history, loading, user]);

  // if (loading || (!user && window.location.pathname !== '/login')) {
  if (loading || (!user && history?.location.pathname !== '/login')) {
    return (
      <div className="flex flex-col h-screen justify-center items-center text-primary">
        <div
          className="w-5 mb-5 h-5 border-2 rotate border-primary border-solid rounded-full animate-spin border-t-transparent"
          style={{borderTopColor: 'transparent'}}
        />
        <div>Loading.....</div>
      </div>
    );
  }
  // if (!user && !loading && history?.location.pathname !== '/login') {
  //   return (
  //     <Redirect
  //       to={history?.location.pathname === '/' ? '/welcome' : '/login'}
  //     />
  //   );
  // }
  return children;
};

export const UserProvider: React.FC = ({children}: PropsType) => {
  const [user, setUser] = useState(null);
  const [userRegistration, setUserRegistration] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [loading, setLoading] = useState(true);
  // payment statesa
  const [payment, setPayment] = useState({});

  const [cookies, , removeCookies] = useCookies(['token', 'refreshToken']);
  const {get: getUserProfile} = useFetch(API.userProfile);
  const history = useHistory();

  const updateUser = useCallback(
    newData => setUser({...user, ...newData}),
    [user],
  );

  const loadUserFromCookies = useCallback(async () => {
    const {token} = cookies;
    if (!isJwtExpired(token)) {
      try {
        setLoading(true);
        const res = await getUserProfile();
        if (res?.data) setUser(res.data.user);
        if (res?.data && res?.data?.user?.isVerified.kycStatus === 'None') {
          history.push(screens.profileHome);
        }
      } catch (error) {
        removeCookies('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setUser(null);
    }
    // setIsLoading(false);
  }, [cookies, getUserProfile, history, removeCookies]);

  useEffect(() => {
    loadUserFromCookies();
    //   const token = Cookies.get("token");
    // if (!token) return;
    // authenticate(token);
  }, [loadUserFromCookies]);
  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        selectedCountry,
        setSelectedCountry,
        userRegistration,
        setUserRegistration,
        payment,
        setPayment,
        loadUserFromCookies,
        updateUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};
