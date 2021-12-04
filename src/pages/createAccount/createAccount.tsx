/* eslint-disable no-underscore-dangle */
import {Link, useHistory} from 'react-router-dom';
import useFetch from 'use-http';
import {Cookies} from 'react-cookie';
import addHours from 'date-fns/addHours';
import toast from 'react-hot-toast';

import Title from 'components/Title';
// import {ReactComponent as Apple} from 'assets/apple.svg';
// import {ReactComponent as Google} from 'assets/google.svg';
import {ReactComponent as ArrowIcon} from 'assets/arrow-right-r.svg';
import {Form, FormInput} from 'components/Forms';
import Button from 'components/Button';
import Header from 'components/Header';
import screens from 'constants/screens';
import API from 'constants/api';
import {useUser} from 'context/user-context';
import validation from 'constants/validation';

type IHeader = {[key: string]: string};

const CreateAccount = () => {
  const history = useHistory();
  const {userRegistration, setUserRegistration} = useUser();
  const {post, loading} = useFetch(API.registerWithEmail, {
    interceptors: {
      request: async ({options}) => {
        const newOptions = options;
        newOptions.headers = {
          ...options.headers,
          Authorization: undefined,
        };
        delete (newOptions.headers as IHeader).Authorization;
        return newOptions;
      },
    },
  });

  const handleSubmit = async data => {
    try {
      const res = await post(data);
      if (res) {
        toast.success('Otp has been sent to your email!');
        setUserRegistration({
          ...userRegistration,
          token: res.data._token,
          ...data,
        });
        const cookie = new Cookies();
        cookie.set('regToken', res.data._token, {
          expires: addHours(new Date(), 24),
        });
        history.push(screens.createAccount + screens.verifyEmail);
      }
    } catch (error) {
      //
    }
  };
  return (
    <div className="h-screen">
      <Header content="2/5" />
      <div className="max-w-sm mx-auto mt-20">
        <Title subtitle="Enter a valid email address">Create an account</Title>
        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            firstName: userRegistration.email,
            email: userRegistration.email,
          }}
          resolver={validation.signupWithEmailFirstname}>
          <FormInput
            name="firstName"
            register={() => null}
            placeholder="First Name"
          />
          <FormInput
            name="email"
            register={() => null}
            placeholder="Email Address"
          />
          <Button loading={loading} type="submit">
            Create my Account
          </Button>
        </Form>
        {/* <div className="mt-7 flex justify-center items-center">
          <p className="text-dark-gray text-sm mr-4">or sign up with:</p>
          <Google className="mr-4 cursor-pointer" />
          <Apple className="cursor-pointer" />
        </div> */}
        <Link to="/login">
          <button
            type="button"
            className="flex text-center w-full py-5 mt-2 font-bold text-sm justify-center text-primary">
            I have an account
            <ArrowIcon className="ml-4" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
