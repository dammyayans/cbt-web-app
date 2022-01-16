import {yupResolver} from '@hookform/resolvers/yup';
import {isValidPhoneNumber} from 'libphonenumber-js';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  matric: yup.string().required('Please enter your matric number'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(/(?=.{3,})/, 'Must contain 3 characters'),
});

const loginLSchema = yup.object().shape({
  email: yup.string().email().required('Please enter your Email'),
  password: yup.string().required('Please enter your password'),
  // .matches(
  //   // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   /(?=.{3,})/,
  //   'Must Contain 3 Characters',
  // ),
});

const loginASchema = yup.object().shape({
  username: yup.string().required('Please Enter your username'),
  password: yup
    .string()
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
    .min(8, 'Old Password must be at least 8 characters')
    .required('Old Password is required')
    .matches(/^(?=.{8,})/, 'Must contain 8 characters'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .typeError('Password is required')
    .matches(/^(?=.{8,})/, 'Must contain 8 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const addQuestionSchema = yupResolver(
  yup.object().shape({
    excelFile: yup.object(),
    // .shape({
    //   name: yup.string().required(),
    // })
    // .required('File required')
    // .typeError('Please Select a file'),
    duration: yup
      .string()
      .required('Please enter a duration')
      .typeError('Please enter a valid duration')
      .matches(/^[0-9]*$/, 'Must be a valid duration'),
    amount: yup
      .string()
      .required(
        'Please enter the amount of questions to be answered by students',
      )
      .typeError(
        'Please enter the amount of questions to be answered by students',
      )
      .matches(/^[0-9]*$/, 'Must be a number'),
    type: yup
      .string()
      .required('Please sselect question type')
      .typeError('Please select question type'),
  }),
);

const validation = {
  loginSchema: yupResolver(loginSchema),
  loginLSchema: yupResolver(loginLSchema),
  loginASchema: yupResolver(loginASchema),
  addLecturerSchema,
  addCourseSchema,
  addStudentSchema,
  changeLPassword: yupResolver(changeLPassword),
  addQuestionSchema,

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
