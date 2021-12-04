/* eslint-disable no-underscore-dangle */
import {useEffect, useState} from 'react';
import { useLocation, Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import useFetch from 'use-http';
import cn from 'classnames';

import {useAuth} from 'context/auth-context';
import screens from 'constants/screens';
import Button from 'components/Button';
// import API from 'constants/api';
import validation from 'constants/validation';
import {useUser} from 'context/user-context';
import AnimatedContainer from 'components/AnimatedContainer';

interface IFormValue {
  email: string;
  password: string;
}

interface From {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

const Modal = ({isVisible, onClose}: ModalProps) => (
  <div
    className={cn(
      'fixed top-0 left-0 w-full h-full bg-dark-gray bg-opacity-70 z-10 flex flex-col items-center justify-end transition-all duration-500 md:justify-center',
      {'transform translate-y-full': !isVisible},
    )}>
    <div
      className="bg-transparent flex-1 w-full md:absolute md:w-full md:h-full md:top-0 md:left-0 md:z-10"
      onClick={onClose}
    />
    <div className=" bg-white w-[300px] rounded-t-2xl p-8 overflow-y-auto  md:rounded-2xl md:relative md:z-20">
      <p className="text-[16px]">
        <span className="text-red-500">
          Your email or password is not correct.
        </span>
        <br />
        Don&apos;t Fret!
        <br />
        It could just be us 🙈. Kindly message our Tech support to assist you.
      </p>
      <br />
      <br />
      <a
        href="https://api.whatsapp.com/send?phone=2348132010601&text=Hello%20Michael"
        target="_blank"
        rel="noreferrer">
        <Button type="button" variant="contained">
          Message Tech Support
        </Button>
      </a>
    </div>
  </div>
);

const Login = () => {
  const {authenticate} = useAuth();
  const {user} = useUser();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useForm<IFormValue>({resolver: validation.loginSchema});

  // const {post: postLogin, loading} = useFetch(API.login);

  useEffect(() => {
    if (user) {
      setRedirectToReferrer(true);
    }
  }, [user]);

  // const onSubmit = async (data: IFormValue) => {
  //   const res = await postLogin(data);
  //   if (res?.code === 200) {
  //     authenticate(res.data._token);
  //     setRedirectToReferrer(true);
  //   } else {
  //     setShowModal(true);
  //   }
  // };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  if (redirectToReferrer === true) {
    // return (
      // <Redirect
      //   to={
      //     state?.from?.pathname === screens.planSuccess
      //       ? screens.home
      //       : state?.from || screens.home
      //   }
      // />
      // <Redirect
      //   to={
      //     state.from === screens.planSuccess
      //       ? screens.home
      //       : state?.from || screens.home
      //   }
      // />
    // );
  }

  return (
    <AnimatedContainer>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
      <div className="min-h-screen">
        <form
          // onSubmit={handleSubmit(onSubmit)}
          style={{maxWidth: 520, margin: '0 auto'}}
          className="mx-auto px-4 w-full py-16 flex flex-col justify-center">
          <div>
            <h1 className="font-bold text-primary text-4xl">Login</h1>
            <p className="text-dark-gray mt-2 mb-5">
              Enter your email address{' '}
            </p>
          </div>
          <div>
            <input
              {...register('email')}
              className="py-4 px-6 border bg-gray border-whisper rounded-xl outline-none w-full"
              placeholder="Email"
            />
          </div>
          <span className="text-red-600 text-xs mb-2 pl-2 block">
            {errors.email && errors.email.message}
          </span>
          <div className="relative">
            <input
              {...register('password')}
              className="py-4 px-6 bg-gray border border-whisper rounded-xl outline-none mb-2 w-full"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-4 top-0 bottom-2 my-auto">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.29 11.098a.833.833 0 01-1.58-.528c-.017.05 0-.002 0-.002.03-.091.064-.181.103-.27.067-.158.165-.376.3-.635A9.193 9.193 0 013.446 7.77C4.725 6.378 6.813 5 10 5c3.188 0 5.276 1.378 6.551 2.77.681.747 1.233 1.6 1.634 2.528.033.079.058.142.075.189.006.013.023.1.04.183.015.077.028.15.033.163 0 0 .14.555-.57.79a.833.833 0 01-1.053-.523v-.005l-.012-.027a6.103 6.103 0 00-.287-.626 7.46 7.46 0 00-1.088-1.545c-1.017-1.109-2.678-2.23-5.323-2.23-2.645 0-4.307 1.121-5.324 2.23a7.461 7.461 0 00-1.325 2.041 3.684 3.684 0 00-.05.13l-.011.03z"
                  fill="#5C5C5C"
                />
                <path
                  d="M6.666 11.667a3.333 3.333 0 116.667 0 3.333 3.333 0 01-6.667 0z"
                  fill="#5C5C5C"
                />
              </svg>
            </button>
          </div>
          <span className="text-red-600 text-xs mb-2 pl-2 block">
            {errors.password && errors.password.message}
          </span>
          <div className="mt-7 mb-4">
            <Link to={screens.forgotPassword}>
              <p className="text-primary">Forgot my login details</p>
            </Link>
          </div>

          <Button  onClick={() => null} type="submit">
            Submit
          </Button>
          <Link to={screens.welcome}>
            <div className="flex mt-9 text-center items-center justify-center">
              <p className="text-primary mr-4">Create an account</p>
              <svg
                width={21}
                height={20}
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16.333 10H4.666M10.5 4.167L4.667 10l5.833 5.833"
                  stroke="#0E56C0"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </form>
        <div className="w-100 mt-4 text-right pr-10 cursor-pointer">
          <a
            href="https://api.whatsapp.com/send?phone=2348094703225&text=Hello%20Ruth"
            target="blank"
            className="text-sm">
            <span className="mr-1">Need Help?</span>
            <span className="text-primary font-bold">Contact Support</span>
          </a>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Login;
