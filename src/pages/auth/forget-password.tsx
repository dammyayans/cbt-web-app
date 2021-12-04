/* eslint-disable no-underscore-dangle */
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import useFetch from 'use-http';
import toast from 'react-hot-toast';

import screens from 'constants/screens';
import Button from 'components/Button';
import API from 'constants/api';
import validation from 'constants/validation';
import AnimatedContainer from 'components/AnimatedContainer';

interface IFormValue {
  email: string;
  password: string;
}

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  } = useForm<IFormValue>({resolver: validation.forgotPasswordSchema});

  const {post: postLogin, loading} = useFetch(API.forgotPassword);

  const onSubmit = async (data: IFormValue) => {
    const res = await postLogin(data);
    if (res?.code === 200) {
      toast.success(res.message || 'A reset link as been sent to your mail');
    }
  };

  return (
    <AnimatedContainer>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto px-4 py-16 w-full h-full flex flex-col justify-center">
        <div>
          <h1 className="font-bold text-primary text-4xl">Forgot Password?</h1>
          <p className="text-dark-gray mt-2 mb-5">Enter your email address </p>
        </div>
        <div>
          <input
            {...register('email')}
            className="py-4 px-6 border bg-gray border-whisper rounded-xl outline-none w-full"
            placeholder="Email"
          />
        </div>
        <span className="text-red-600 text-xs mb-8 pl-2 block">
          {errors.email && errors.email.message}
        </span>

        <Button loading={loading} onClick={() => null} type="submit">
          Submit
        </Button>
        <Link to={screens.login}>
          <div className="flex mt-6 text-center items-center justify-center">
            <p className="text-primary mr-4">Login</p>
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

export default ForgotPassword;
