/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router";

import { ContextValueType, PropsType } from "../types";
import isJwtExpired from "constants/isJwtExpired";

// import isJwtExpired from 'constants/isJwtExpired';
// import API from 'constants/api';
// import screens from 'constants/screens';

export const UserContext = createContext<
  ContextValueType & { user: any; setUser: any }
>({
  user: {},
  setUser: () => null,
});
export const useUser = () => useContext(UserContext);

export const ProtectRoute = ({ children }: any) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!loading && !user) {
      //
      if (!location.pathname.includes("/login")) {
        navigate("/login");
      }
      // const { token } = cookies;
      // if (token) toast.error('Expire session!');
    }
  }, [cookies, history, loading, user, location.pathname]);

  // if (loading || (!user && window.location.pathname !== '/login')) {
  // if (loading || (!user && location.pathname !== '/login')) {
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

export const UserProvider: React.FC<PropsType> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cookies, , removeCookies] = useCookies(["token", "studentDetails"]);
  const loadAdminFromCookies = useCallback(async () => {
    const { token, studentDetails } = cookies;
    if (!isJwtExpired(token) && studentDetails) {
      try {
        setLoading(true);

        setUser(studentDetails);
      } catch (error) {
        removeCookies("token");
        removeCookies("studentDetails");
        setUser(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [cookies, removeCookies]);

  useEffect(() => {
    loadAdminFromCookies();
  }, [loadAdminFromCookies]);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        // loadUserFromCookies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
