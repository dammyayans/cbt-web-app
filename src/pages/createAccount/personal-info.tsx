/* eslint-disable jsx-a11y/label-has-associated-control */
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useMemo, useState} from 'react';
import useFetch from 'use-http';
import {useCookies} from 'react-cookie';
import {useForm, Controller} from 'react-hook-form';
import toast from 'react-hot-toast';
// import cn from 'classnames';
import parsePhoneNumber, {AsYouType, CountryCode} from 'libphonenumber-js';

import {FormInput} from 'components/Forms';
import Title from 'components/Title';
import Header from 'components/Header';
import allCountries from 'constants/countries';
import {ReactComponent as EyeIcon} from 'assets/eye-show.svg';
import Button from 'components/Button';
import screens from 'constants/screens';
import API from 'constants/api';
import {useUser} from 'context/user-context';
import validation from 'constants/validation';

const Span = styled.span`
  left: 1px;
  top: 1px;
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  padding-right: 16px;
  padding-left: 6px;
`;

// const Input = styled.input`
//   &:checked {
//     right: 0;
//     border-color: #0e56c0;
//   }
// `;

interface IFormData {
  [x: string]: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// interface X {
//   [x: string]: IFormData;
// }

function PersonalInfo() {
  const {selectedCountry, userRegistration, setUserRegistration} = useUser();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [cookies] = useCookies(['regToken']);
  // const [checked, setChecked] = useState(false);
  const {post, loading} = useFetch(API.registerUserDetails, {
    interceptors: {
      request: async ({options}) => {
        const newOptions = options;
        const headers = {
          ...options.headers,
          Authorization: `Bearer ${cookies.regToken || userRegistration.token}`,
        };
        // eslint-disable-next-line no-param-reassign
        newOptions.headers = headers;
        return newOptions;
      },
    },
  });

  const userCountry = useMemo(
    () => allCountries.find(c => c.name === selectedCountry),
    [selectedCountry],
  );

  const {
    handleSubmit,
    register,
    formState: {errors},
    control,
    setValue: setFormValue,
  } = useForm<IFormData>({
    defaultValues: {
      confirmPassword: userRegistration.confirmPassword,
      country: userRegistration.country || '',
      firstName: userRegistration.firstName || '',
      lastName: userRegistration.lastName || '',
      password: userRegistration.password || '',
      phoneNumber: userRegistration.phoneNumber || '',
      abbr: userCountry.abbr,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: validation.registerUserDetails,
  });

  // useEffect(() => {
  //   (Object.values(errors) as {message: string}[]).forEach(error => {
  //     toast.error(error?.message);
  //   });
  // }, [errors]);

  const onSubmit = async (data: IFormData) => {
    try {
      setUserRegistration({
        ...userRegistration,
        ...data,
        country: selectedCountry,
      });
      // console.log(data);
      const phoneNumber = parsePhoneNumber(
        data.phoneNumber,
        userCountry.abbr as CountryCode,
      );
      // console.log(phoneNumber);
      // console.log(phoneNumber.formatNational());
      // console.log(phoneNumber.nationalNumber);
      // console.log(phoneNumber.formatInternational());
      // console.log(phoneNumber.number);
      // return;
      const res = await post({
        ...data,
        phoneNumber: phoneNumber.number,
        country: phoneNumber.country,
        abbr: undefined,
        // phoneNumber: `+${userCountry.code}${data.phoneNumber.replace(
        //   /(^0+)/,
        //   '',
        // )}`,
        // country: selectedCountry ? userCountry.abbr : 'NG',
      });
      if (res?.code === 200) {
        if (res.message) toast.success(res.message);
        history.push(screens.createAccount + screens.verifyPhone);
      }
    } catch (error) {
      //
    }
  };

  // const [value, setValue] = useState('');
  const asYouType = new AsYouType({
    defaultCountry: userCountry.abbr as CountryCode,
    defaultCallingCode: `+${userCountry.code}`,
  });

  return (
    <div>
      <Header content="4/5" />
      <form
        className="max-w-sm mx-auto mt-20"
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Title subtitle="Please fill this field correctly">
            Personal Info
          </Title>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2">
          {/* <p className="">Next of Kin Details</p> */}
        </div>
        <FormInput
          name="firstName"
          register={register}
          value={userRegistration.firstName || ''}
          placeholder="First Name"
          readOnly
          errors={errors}
        />
        <FormInput
          type="text"
          name="lastName"
          register={register}
          placeholder="Last Name"
          errors={errors}
          // {...register('last_name')}
        />
        <p className="py-4 px-6 text-dark-gray mb-2">{selectedCountry}</p>
        {/* <div className="relative">
          <input
            name="phoneNumber"
            {...register('phoneNumber')}
            placeholder="8023456789"
            type="number"
            className="py-4 pr-6 pl-24 bg-gray border border-whisper focus:border-primary rounded-xl outline-none mb-2 w-full"
          />
          <Span className="text-primary text-base absolute bg-white py-4">
            {userCountry.icon} +{userCountry.code}
          </Span>
        </div>
        <div className="relative">
          <input
            name="phoneNumber"
            value={value}
            onChange={e => {
              const x = e.target.value;
              setValue(asYouType.input(x));
            }}
            placeholder="8023456789"
            type="text"
            className="py-4 pr-6 pl-24 bg-gray border border-whisper focus:border-primary rounded-xl outline-none mb-2 w-full"
          />
          <Span className="text-primary text-base absolute bg-white py-4">
            {userCountry.icon} +{userCountry.code}
          </Span>
        </div> */}
        <div>
          <Controller
            name="phoneNumber"
            control={control}
            // rules={{
            //   validate: val => isValidPhoneNumber(val),
            // }}
            render={({field: {value: val}}) => (
              <div className="relative">
                <input
                  name="phoneNumber"
                  value={val}
                  // onChange={onChange}
                  onChange={e => {
                    setFormValue(
                      'phoneNumber',
                      asYouType.input(e.target.value),
                      {
                        shouldValidate: true,
                      },
                    );
                  }}
                  placeholder="8023456789"
                  type="tel"
                  className="py-4 pr-6 pl-24 bg-gray border border-whisper focus:border-primary rounded-xl outline-none mb-2 w-full"
                />
                <Span className="text-primary text-base absolute bg-white py-4">
                  {userCountry.icon} +{userCountry.code}
                </Span>
              </div>
            )}
          />
          <span className="text-red-600 text-xs mb-2 pl-2 block">
            {errors && errors.phoneNumber && errors.phoneNumber.message}
          </span>
        </div>
        <input hidden {...register('abbr')} />
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
            onClick={() => setShowPassword(p => !p)}
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
            onClick={() => setShowConPassword(p => !p)}
          />
        </div>
        {/* <div className="flex items-center justify-between">
          <p className="text-primary font-semibold">
            Remember me on next login
          </p>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <Input
              type="checkbox"
              name="toggle"
              id="toggle"
              onChange={e => setChecked(e.target.checked)}
              className="toggle-checkbox absolute block w-5 h-5 top-1 rounded-full bg-white  appearance-none cursor-pointer"
            />
            <label
              htmlFor="toggle"
              className={cn(
                'toggle-label block overflow-hidden h-7 rounded-full bg-gray-300 cursor-pointer',
                {'bg-primary': checked},
                {'bg-fade-ash': !checked},
              )}
            />
          </div>
        </div> */}
        <div className="flex mt-9">
          <input
            id="newsletter"
            type="checkbox"
            className="form-checkbox border cursor-pointer border-primary mr-3 h-5 w-5 text-blue-600"
            // checked={false}
          />
          <label htmlFor="newsletter" className="text-fade-ash text-sm">
            Subscribe to Cryptolife&apos;s newsletter to get the latest news and
            updates delivered to your mail.
          </label>
        </div>
        <Button loading={loading} type="submit" className="mt-9">
          Looks good!
        </Button>
      </form>
    </div>
  );
}

export default PersonalInfo;
