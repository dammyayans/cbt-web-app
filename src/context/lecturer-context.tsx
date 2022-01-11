import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {useCookies} from 'react-cookie';
import {useNavigate, useLocation} from 'react-router';
import toast from 'react-hot-toast';

import {ContextValueType, PropsType} from '../types';
import isJwtExpired from 'constants/isJwtExpired';

// import isJwtExpired from 'constants/isJwtExpired';
// import API from 'constants/api';
// import screens from 'constants/screens';

export const LecturerContext = createContext<ContextValueType>({});
export const useLecturer = () => useContext(LecturerContext);

export const ProtectLRoute = ({children}) => {
  const {lecturer, loading} = useLecturer();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    if (!loading && !lecturer) {
      //
      if (location.pathname !== '/lecturer/login') {
        navigate('/lecturer/login');
      }
      const {token} = cookies;

      if (token) toast.error('Expire session!');
    }
  }, [cookies, history, loading, lecturer]);

  // if (loading || (!lecturer && window.location.pathname !== '/login')) {
  // if (loading || (!lecturer && location.pathname !== '/lecturer/login')) {
  //   return (
  //     <div className="flex flex-col h-screen justify-center items-center text-primary">
  //       <div
  //         className="w-5 mb-5 h-5 border-2 rotate border-primary border-solid rounded-full animate-spin border-t-transparent"
  //         style={{borderTopColor: 'transparent'}}
  //       />
  //       <div>Loading.....</div>
  //     </div>
  //   );
  // }
  return children;
};

export const LecturerProvider: React.FC = ({children}: PropsType) => {
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cookies, , removeCookies] = useCookies(['token', 'lecturerDetails']);
  // const {get: getAdminProfile} = useFetch(API.adminProfile);

  const loadAdminFromCookies = useCallback(async () => {
    const {token, lecturerDetails} = cookies;
    if (!isJwtExpired(token) && lecturerDetails) {
      try {
        setLoading(true);

        setLecturer(lecturerDetails);
      } catch (error) {
        removeCookies('token');
        removeCookies('lecturerDetails');
        setLecturer(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setLecturer(null);
    }
  }, [cookies, removeCookies]);

  useEffect(() => {
    loadAdminFromCookies();
  }, [loadAdminFromCookies]);
  return (
    <LecturerContext.Provider
      value={{
        loading,
        setLoading,
        lecturer,
        setLecturer,
        // loadLecturerFromCookies,
      }}>
      {children}
    </LecturerContext.Provider>
  );
};
