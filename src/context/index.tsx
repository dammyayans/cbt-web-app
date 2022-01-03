/* eslint-disable no-param-reassign */
import React from 'react';
import {Cookies, useCookies} from 'react-cookie';
import toast from 'react-hot-toast';
import {Provider, CachePolicies} from 'use-http';

import {AuthProvider} from './auth-context';
import {UserProvider} from './user-context';

import isJwtExpired from 'constants/isJwtExpired';
import {LecturerProvider} from './lecturer-context';
import {AdminProvider} from './admin-context';

const AppProviders: React.FC = ({children}) => {
  const [, , removeCookies] = useCookies(['token']);
  const fetchOptions = {
    cachePolicy: CachePolicies.NO_CACHE,
    interceptors: {
      request: async ({options}) => {
        const cookies = new Cookies();
        const token = cookies.get('token');

        // if (isExpired(token)) {
        //   token = await getNewToken()
        //   setToken(token)
        // }
        if (token && isJwtExpired(token)) {
          //
          removeCookies('token');
          // window.location.pathname = '/login';
        } else if (token) {
          options.headers.Authorization = `Bearer ${token}`;
        }
        return options; // returning the `options` is important
      },
      response: async ({response}) => {
        const cookies = new Cookies();
        const type = cookies.get('type');
        if (response.data.status === 'fail') {
          toast.dismiss();
          toast.error(
            typeof response?.data.message === 'string'
              ? response.data.message
              : 'An error occurred!',
          );
          return {data: null};
        }
        if (
          response.data.status === 'success' ||
          response.data.status === 'Success'
        ) {
          response.data.message ? toast.success(response.data.message) : null;
        }
        if (response.status === 401) {
          window.location.pathname =
            type === 'lecturer'
              ? 'lecturer/login'
              : type === 'admin'
              ? 'admin/login'
              : '/login';
        }
        return response; // returning the `response` is important
      },
    },
    // runs when an error happens.
    onError: ({error}) => {
      if (error.message === 'Failed to fetch') {
        toast.error('Network error');
      }
      // console.log({error});
    },
    // this will tell useFetch not to run the request if the list doesn't haveMore. (pagination)
    // i.e. if the last page fetched was < 15, don't run the request again
    perPage: 15,
    // enables experimental React Suspense mode
    // suspense: true, // defaults to `false`
  };

  return (
    <Provider options={fetchOptions}>
      <AuthProvider>
        <AdminProvider>
          <LecturerProvider>
            <UserProvider>{children}</UserProvider>
          </LecturerProvider>
        </AdminProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProviders;
