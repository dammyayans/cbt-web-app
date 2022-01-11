import {yupResolver} from '@hookform/resolvers/yup';
import {isValidPhoneNumber} from 'libphonenumber-js';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  matricNo: yup.string().required('Please Enter your matric No'),
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

const loginLSchema = yup.object().shape({
  email: yup.string().email().required('Please Enter your Email'),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      /(?=.{8,})/,
      'Must Contain 8 Characters',
    ),
});

const loginASchema = yup.object().shape({
  username: yup.string().required('Please Enter your username'),
  password: yup
    .string()
    .min(8)
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters and One Number',
    ),
});

// const resetPassword = yup.object().shape({
//   password: yup
//     .string()
//     .min(8)
//     .required('Password is required')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match'),
// });

// const forgotPasswordSchema = yup.object().shape({
//   email: yup.string().email().required('Please Enter your Email'),
// });

// // sign up screen 1
// const signupWithEmailFirstname = yup.object().shape({
//   email: yup.string().email().required('Please enter your email'),
//   firstName: yup
//     .string()
//     .required('Please enter your first name')
//     .matches(/^[a-zA-Z]+$/, 'Enter only your name'),
//   // .test('is-jimmy', '${path} is not Jimmy', value => value === 'jimmy'),
// });

// const authSchema = yup.object().shape({
//   phoneNumber: yup
//     .string()
//     .required('Phone number is required')
//     .typeError('Please Enter your Number')
//     .matches(
//       /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
//       'Enter a valid phone number',
//     )
//     .min(10, 'Phone number must be at least 10 characters')
//     .max(15, 'Phone number must be at most 15 characters'),
//   countryCode: yup.string().required(''),
//   password: yup
//     .string()
//     .min(8)
//     .required('Please Enter your password')
//     .matches(
//       // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
// });

// const changePasswordSchema = yup.object().shape({
//   oldPassword: yup
//     .string()
//     .required('Password is required')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
//   password: yup
//     .string()
//     .min(8)
//     .required('Password is required')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match'),
//   // confirmPassword: yup
//   //   .string()
//   //   .test("passwords-match", "Passwords must match", function (value) {
//   //     return this.parent.password === value;
//   //   }),
// });

// const signupSchema = yup.object().shape({
//   email: yup.string().email().required('Please Enter your Email'),
//   username: yup.string().required('Please Enter your username'),
//   phoneNumber: yup
//     .string()
//     .required('Phone number is required')
//     .typeError('Please Enter your Number')
//     .matches(
//       /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
//       'Enter a valid phone number',
//     )
//     .min(10, 'Phone number must be at least 10 characters')
//     .max(15, 'Phone number must be at most 15 characters'),
//   firstName: yup.string().required().typeError('Please Enter your First Name'),
//   lastName: yup.string().required().typeError('Please Enter your Last Name'),
//   countryCode: yup.string().required(''),
//   password: yup
//     .string()
//     .min(8)
//     .required('Please Enter your password')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
// });

// const registerUserDetails = yup.object().shape({
//   // phoneNumber: yup
//   //   .string()
//   //   .required('Phone number is required')
//   //   .typeError('Please Enter your Number')
//   //   .matches(
//   //     /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
//   //     'Enter a valid phone number',
//   //   )
//   //   .min(10, 'Phone number must be at least 10 characters'),
//   // .max(15, 'Phone number must be at most 15 characters'),
//   firstName: yup
//     .string()
//     .required('Please Enter your First Name')
//     .typeError('Please Enter your First Name'),
//   lastName: yup
//     .string()
//     .required('Please Enter your Last Name')
//     .typeError('Please Enter your Last Name'),
//   password: yup
//     .string()
//     .min(8)
//     .required('Please Enter your password')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.{8,})/,
//       'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
//     ),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Passwords must match'),
//   phoneNumber: yup
//     .string()
//     .required('Required')
//     .test('phone-input', 'Invalid phone number', (value, testContext) => {
//       // console.log(testContext);
//       return isValidPhoneNumber(value || '', testContext.parent.abbr);
//     }),
//   // .isValidPhoneNumber('Invalid phone number')
// });

// const uploadDocSchema = yup.object().shape({
//   homeNo: yup
//     .string()
//     .required('Home Number is required')
//     .typeError('Please Enter your Home Number'),
//   streetName: yup
//     .string()
//     .required('Street Number is required')
//     .typeError('Please Enter your Street Number'),
//   // state: yup
//   //   .string()
//   //   .required('State is required')
//   //   .typeError('Please Enter your State'),
// });

// const changeProfileSchema = yupResolver(
//   yup.object().shape({
//     email: yup.string().email().required('Please Enter your Email'),
//     username: yup.string().required('Please Enter your username'),
//     phoneNumber: yup
//       .string()
//       .required('Phone number is required')
//       .typeError('Please Enter your Number')
//       .matches(
//         /(^.{10,15}$)|(^[0]\d{10}$)|(^[+]?[234]\d{12}$)/,
//         'Enter a valid phone number',
//       )
//       .min(10, 'Phone number must be at least 10 characters')
//       .max(15, 'Phone number must be at most 15 characters'),
//     firstName: yup
//       .string()
//       .required()
//       .typeError('Please Enter your First Name'),
//     lastName: yup.string().required().typeError('Please Enter your Last Name'),
//     countryCode: yup.string().required(''),
//   }),
// );

const addLecturerSchema = yupResolver(
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
    faculty: yup
      .string()
      .required('Please Select a faculty')
      .typeError('Please Select a faculty'),
    department: yup
      .string()
      .required('Please Select a department')
      .typeError('Please Select a department'),
  }),
);
const addCourseSchema = yupResolver(
  yup.object().shape({
    courseCode: yup
      .string()
      .required('Please Enter a Course Code')
      .min(3, 'First name must be at least 3 characters'),
    courseTitle: yup
      .string()
      .required('Please Enter a Course Title')
      .typeError('Please Enter  Course Title')
      .min(3, 'Last name must be at least 3 characters'),
    unit: yup
      .string()
      .required('Please Enter the Course Unit')
      .typeError('Please Enter the Course Unit'),
    lecturerID: yup
      .string()
      .required('Please Select a Lecturer')
      .typeError('Please Select a Lecturer'),
  }),
);
const addStudentSchema = yupResolver(
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
    faculty: yup
      .string()
      .required('Please Select a faculty')
      .typeError('Please Select a faculty'),
    department: yup
      .string()
      .required('Please Select a department')
      .typeError('Please Select a department'),
    level: yup
      .string()
      .required('Please Select a level')
      .typeError('Please Select a level'),
    matric: yup
      .string()
      .required('Please Enter their Matric Number')
      .typeError('Please Enter their Matric Number')
      .min(3, 'Last name must be at least 3 characters'),
  }),
);

const changeLPassword = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8)
    .required('Old Password is required')
    .matches(/^(?=.{8,})/, 'Must Contain 8 Characters'),
  password: yup
    .string()
    .min(8)
    .required('Password is required')
    .matches(/^(?=.{8,})/, 'Must Contain 8 Characters'),
  confirmPassword: yup
    .string()
    .required('Please Confirm Password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const validation = {
  loginSchema: yupResolver(loginSchema),
  loginLSchema: yupResolver(loginLSchema),
  loginASchema: yupResolver(loginASchema),
  addLecturerSchema,
  addCourseSchema,
  addStudentSchema,
  changeLPassword: yupResolver(changeLPassword),

  // forgotPasswordSchema: yupResolver(forgotPasswordSchema),
  // resetPassword: yupResolver(resetPassword),
  // changePassword: yupResolver(changePassword),
  // authSchema: yupResolver(authSchema),
  // changePasswordSchema: yupResolver(changePasswordSchema),
  // signupSchema: yupResolver(signupSchema),
  // signupWithEmailFirstname: yupResolver(signupWithEmailFirstname),
  // uploadDocSchema: yupResolver(uploadDocSchema),
  // registerUserDetails: yupResolver(registerUserDetails),
  // changeProfileSchema,
};

export default validation;
