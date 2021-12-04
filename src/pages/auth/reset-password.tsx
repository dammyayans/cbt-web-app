/* eslint-disable no-underscore-dangle */
import {useState} from 'react';
import {useLocation, Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import useFetch from 'use-http';
import toast from 'react-hot-toast';

import screens from 'constants/screens';
import Button from 'components/Button';
import API from 'constants/api';
import validation from 'constants/validation';
import AnimatedContainer from 'components/AnimatedContainer';
import {FormInput} from 'components/Forms';
import {ReactComponent as EyeIcon} from 'assets/eye-show.svg';

interface IFormValue {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: {errors},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useForm<IFormValue>({resolver: validation.resetPassword});

  const {post: postLogin, loading} = useFetch(API.resetPassword);

  const onSubmit = async (data: IFormValue) => {
    const _token = new URLSearchParams(location.search).get('token');
    // console.log(_token);
    // return;
    const res = await postLogin({...data, reset_token: _token});
    if (res?.code === 200) {
      toast.success(res.message || 'Updated successfully! Please Login');
      setTimeout(() => history.push(screens.login), 1000);
    }
  };

  const toggleShowPassword = () => setShowPassword(p => !p);
  const toggleShowConPassword = () => setShowConPassword(p => !p);

  return (
    <AnimatedContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{maxWidth: 520, margin: '0 auto'}}
        className="mx-auto px-4 py-16 w-full min-h-screen flex flex-col justify-center">
        <div>
          <h1 className="font-bold text-primary text-4xl">Reset Password</h1>
          <p className="text-dark-gray mt-2 mb-5">Enter your new password</p>
        </div>
        <div className="relative">
          <FormInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            register={register}
            placeholder="Password"
            errors={errors}
          />
          <EyeIcon
            className="absolute right-6 top-5 cursor-pointer"
            onClick={toggleShowPassword}
          />
        </div>
        <div className="relative">
          <FormInput
            type={showConPassword ? 'text' : 'password'}
            name="confirmPassword"
            register={register}
            placeholder="Confirm Password"
            errors={errors}
          />
          <EyeIcon
            className="absolute right-6 top-5 cursor-pointer"
            onClick={toggleShowConPassword}
          />
        </div>

        <Button loading={loading} type="submit">
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
    </AnimatedContainer>
  );
};

export default ResetPassword;
