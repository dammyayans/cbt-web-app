export const BASE_URL = process.env.REACT_APP_API_URL;

export const API = {
  base: BASE_URL,
  // student
  login: `${BASE_URL}/api/auth/login`,

  // lecturer
  lecLogin: `${BASE_URL}/api/v1/auth/lecturers/login`,
  changePassword: `${BASE_URL}/api/v1/auth/lecturers/password`,

  // admin
  adminLogin: `${BASE_URL}/api/v1/auth/admins/lecturers/login`,
  // with auth
  addLecturer: `${BASE_URL}/api/v1/auth/admins/lecturers`,
  getLecturers: `${BASE_URL}/api/v1/auth/admins/lecturers`,
  getStudents: `${BASE_URL}/api/v1/auth/admins/students`,
  addCourse: `${BASE_URL}/api/v1/auth/admins/courses`,
  getCourses: `${BASE_URL}/api/v1/auth/admins/courses`,
  addStudent: `${BASE_URL}/api/v1/auth/admins/students`,
  uploadStudents: `${BASE_URL}/api/v1/auth/admins/students/uploads`,

  // verifyPayment: (id: string) => `${BASE_URL}/api/investors/payment/${id}`,
};

export default API;
