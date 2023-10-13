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
// import API from 'constants/api';
// import screens from 'constants/screens';

export const AdminContext = createContext<
  ContextValueType & {
    admin: any;
    setAdmin: React.Dispatch<React.SetStateAction<null>>;
  }
>({ setAdmin: () => null, admin: {} });
// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => useContext(AdminContext);

export const ProtectARoute = ({ children }: PropsType) => {
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (!loading && !admin) {
      //
      if (location.pathname !== "/admin/login") {
        navigate("/admin/login");
      }
      // const {token} = cookies;

      // if (token) toast.error('Expire session!');
    }
  }, [cookies, loading, admin, location.pathname]);

  if (loading || (!admin && location.pathname !== "/admin/login")) {
    return (
      <div className="flex flex-col h-screen justify-center items-center text-primary">
        <div
          className="w-5 mb-5 h-5 border-2 rotate border-primary border-solid rounded-full animate-spin border-t-transparent"
          style={{ borderTopColor: "transparent" }}
        />
        <div>Loading.....</div>
      </div>
    );
  }
  return children;
};

export const AdminProvider: React.FC<PropsType> = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);

  const [cookies, , removeCookies] = useCookies(["token", "adminDetails"]);
  // const {get: getAdminProfile} = useFetch(API.adminProfile);

  const loadAdminFromCookies = useCallback(async () => {
    const { token, adminDetails } = cookies;
    // console.log({token, adminDetails, cookies});
    if (!isJwtExpired(token) && adminDetails) {
      try {
        setLoading(true);
        // const res = await getAdminProfile();
        // if (res?.data)
        setAdmin(adminDetails);
      } catch (error) {
        removeCookies("token");
        removeCookies("adminDetails");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setAdmin(null);
    }
    // setIsLoading(false);
  }, [cookies, removeCookies]);

  useEffect(() => {
    loadAdminFromCookies();
    //   const token = Cookies.get("token");
    // if (!token) return;
    // authenticate(token);
  }, [loadAdminFromCookies]);
  return (
    <AdminContext.Provider
      value={{
        loading,
        setLoading,
        admin,
        setAdmin,
        // loadAdminFromCookies,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
