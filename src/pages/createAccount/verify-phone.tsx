import {useRef, useState} from 'react';
import ReactPinField from 'react-pin-field';
import cn from 'classnames';
import {Link, useHistory} from 'react-router-dom';
import useFetch from 'use-http';
import {useCookies} from 'react-cookie';
import toast from 'react-hot-toast';

import Title from 'components/Title';
import Button from 'components/Button';
import Header from 'components/Header';
import screens from 'constants/screens';
import API from 'constants/api';
import useCountDownTimer from 'hooks/useCountDownTimer';
import {useUser} from 'context/user-context';
import {useAuth} from 'context/auth-context';
import '../profile/style.css';

const VerifyPhone = () => {
  const [demoCompleted, setDemoCompleted] = useState(false);
  const {authenticate} = useAuth();
  const [code, setCode] = useState('');
  const history = useHistory();
  const {userRegistration} = useUser();
  const pinFieldRef = useRef(null);
  const [cookies] = useCookies(['regToken']);
  const fetchOptions = {
    interceptors: {
      request: async ({options}) => {
        const newOptions = options;

        const headers = {
          ...options.headers,
          Authorization: `Bearer ${cookies.regToken || userRegistration.token}`,
        };
        newOptions.headers = headers;
        return newOptions;
      },
    },
  };
  const {get, loading} = useFetch(API.verifyOtp, fetchOptions);
  const {get: resendOTP} = useFetch(API.resendOtpPassword, fetchOptions);
  const [timer, resetTimer] = useCountDownTimer({timestamp: 120});
  // console.log(code);
  const handleSubmit = async () => {
    try {
      if (code.length === 6) {
        const res = await get(`/${code}`);
        if (res?.code === 200) {
          toast.success(res.message);
          authenticate(userRegistration.token);
          history.push('/profile');
        }
      }
    } catch (error) {
      //
    }
  };
  const onResendOTP = async () => {
    const toastId = toast.loading('Resending Otp...');
    try {
      pinFieldRef?.current.inputs.forEach(input => {
        // eslint-disable-next-line no-param-reassign
        input.value = '';
      });
      const res = await resendOTP();
      if (res?.code === 200) {
        toast.success(res.message, {
          id: toastId,
        });
        resetTimer();
      } else toast.dismiss(toastId);
    } catch (error) {
      //
    }
  };
  return (
    <div className="h-screen">
      <Header content="5/5" />
      <div className="max-w-sm mx-auto mt-20">
        <Title subtitle="Enter the OTP sent to your Phone">
          Verify your Phone
        </Title>
        <div className="mb-9">
          <ReactPinField
            ref={pinFieldRef}
            className={cn('pin-field', {complete: demoCompleted})}
            onComplete={() => {
              setDemoCompleted(true);
              // handleSubmit();
            }}
            autoFocus
            validate="0123456789"
            inputMode="numeric"
            onChange={setCode}
            // type="password"
            length={6}
          />
        </div>
        <div className="ml-4 mb-16 text-sm">
          <p className="text-dark-gray  mb-10">
            Didn’t receive any mail?{' '}
            <Link
              className="text-primary"
              to={screens.createAccount + screens.personalInfo}>
              Edit phone
            </Link>
          </p>
          <p className="text-fade-ash">
            <button onClick={onResendOTP} type="button">
              Resend OTP
            </button>{' '}
            <span className="text-black">{timer}</span>
          </p>
        </div>
        <Button loading={loading} onClick={handleSubmit}>
          Create my Account
        </Button>
      </div>
    </div>
  );
};

export default VerifyPhone;
