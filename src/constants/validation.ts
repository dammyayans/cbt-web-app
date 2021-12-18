import {yupResolver} from '@hookform/resolvers/yup';
import {isValidPhoneNumber} from 'libphonenumber-js';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  matricNo: yup.string().required('Please Enter your email'),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

const resetPassword = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
const changePassword = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  newPassword: yup
    .string()
    .min(8)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmNewPassword: yup
    .string()
    .required('Please Confirm Password')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});
const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required('Please Enter your Email'),
});

// sign up screen 1
const signupWithEmailFirstname = yup.object().shape({
  email: yup.string().email().required('Please enter your email'),
  firstName: yup
    .string()
    .required('Please enter your first name')
    .matches(/^[a-zA-Z]+$/, 'Enter only your name'),
  // .test('is-jimmy', '${path} is not Jimmy', value => value === 'jimmy'),
});

const authSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .typeError('Please Enter your Number')
    .matches(
      /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
      'Enter a valid phone number',
    )
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be at most 15 characters'),
  countryCode: yup.string().required(''),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  password: yup
    .string()
    .min(8)
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  // confirmPassword: yup
  //   .string()
  //   .test("passwords-match", "Passwords must match", function (value) {
  //     return this.parent.password === value;
  //   }),
});

const signupSchema = yup.object().shape({
  email: yup.string().email().required('Please Enter your Email'),
  username: yup.string().required('Please Enter your username'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .typeError('Please Enter your Number')
    .matches(
      /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
      'Enter a valid phone number',
    )
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be at most 15 characters'),
  firstName: yup.string().required().typeError('Please Enter your First Name'),
  lastName: yup.string().required().typeError('Please Enter your Last Name'),
  countryCode: yup.string().required(''),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
});

const registerUserDetails = yup.object().shape({
  // phoneNumber: yup
  //   .string()
  //   .required('Phone number is required')
  //   .typeError('Please Enter your Number')
  //   .matches(
  //     /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
  //     'Enter a valid phone number',
  //   )
  //   .min(10, 'Phone number must be at least 10 characters'),
  // .max(15, 'Phone number must be at most 15 characters'),
  firstName: yup
    .string()
    .required('Please Enter your First Name')
    .typeError('Please Enter your First Name'),
  lastName: yup
    .string()
    .required('Please Enter your Last Name')
    .typeError('Please Enter your Last Name'),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  phoneNumber: yup
    .string()
    .required('Required')
    .test('phone-input', 'Invalid phone number', (value, testContext) => {
      // console.log(testContext);
      return isValidPhoneNumber(value || '', testContext.parent.abbr);
    }),
  // .isValidPhoneNumber('Invalid phone number')
});

const uploadDocSchema = yup.object().shape({
  homeNo: yup
    .string()
    .required('Home Number is required')
    .typeError('Please Enter your Home Number'),
  streetName: yup
    .string()
    .required('Street Number is required')
    .typeError('Please Enter your Street Number'),
  // state: yup
  //   .string()
  //   .required('State is required')
  //   .typeError('Please Enter your State'),
});

const changeProfileSchema = yupResolver(
  yup.object().shape({
    email: yup.string().email().required('Please Enter your Email'),
    username: yup.string().required('Please Enter your username'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .typeError('Please Enter your Number')
      .matches(
        /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
        'Enter a valid phone number',
      )
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number must be at most 15 characters'),
    firstName: yup
      .string()
      .required()
      .typeError('Please Enter your First Name'),
    lastName: yup.string().required().typeError('Please Enter your Last Name'),
    countryCode: yup.string().required(''),
  }),
);

const profilePersonalInfo = yupResolver(
  yup.object().shape({
    email: yup.string().email().required('Please Enter their Email'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .typeError('Please Enter a Number')
      .matches(
        /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
        'Enter a valid phone number',
      )
      .min(10, 'Phone number must be at least 10 characters')
      .max(15, 'Phone number must be at most 15 characters'),
    firstName: yup
      .string()
      .required('Please Enter their First Name')
      .min(3, 'First name must be at least 3 characters'),
    lastName: yup
      .string()
      .required('Please Enter their Last Name')
      .typeError('Please Enter their Last Name')
      .min(3, 'Last name must be at least 3 characters'),
    address: yup
      .string()
      .required('Please Enter your Address')
      .typeError('Please Enter your Address'),
    profilePic: yup
      .string()
      .required('Please Select a Profile Photo')
      .typeError('Please Select a Profile Phot'),
    nokAddress: yup.string().required('Please Enter their Address'),
  }),
);

const validation = {
  loginSchema: yupResolver(loginSchema),
  forgotPasswordSchema: yupResolver(forgotPasswordSchema),
  resetPassword: yupResolver(resetPassword),
  changePassword: yupResolver(changePassword),
  authSchema: yupResolver(authSchema),
  changePasswordSchema: yupResolver(changePasswordSchema),
  signupSchema: yupResolver(signupSchema),
  signupWithEmailFirstname: yupResolver(signupWithEmailFirstname),
  uploadDocSchema: yupResolver(uploadDocSchema),
  registerUserDetails: yupResolver(registerUserDetails),
  changeProfileSchema,
  profilePersonalInfo,
};

export default validation;
