export const BASE_URL = process.env.REACT_APP_API_URL;

export const API = {
  base: BASE_URL,
  // student
  login: `${BASE_URL}/api/v1/auth/students/login`,
  getStartedCourses: `${BASE_URL}/api/v1/auth/students/assessments/start`,
  getQuestions: (courseId, type) =>
    `${BASE_URL}/api/v1/auth/students/courses/${courseId}/questions?type=${type}`,

  // lecturer
  lecLogin: `${BASE_URL}/api/v1/auth/lecturers/login`,
  changePassword: `${BASE_URL}/api/v1/auth/lecturers/password`,
  // with auth
  getMyCourses: `${BASE_URL}/api/v1/auth/lecturers/courses`,
  addQuestions: courseId =>
    `${BASE_URL}/api/v1/auth/lecturers/courses/${courseId}/questions`,
  courseDetails: (courseId, type) =>
    `${BASE_URL}/api/v1/auth/lecturers/courses/${courseId}/questions?type=${type}`,

  // admin
  adminLogin: `${BASE_URL}/api/v1/auth/admins/login`,
  // with auth
  addLecturer: `${BASE_URL}/api/v1/auth/admins/lecturers`,
  getLecturers: `${BASE_URL}/api/v1/auth/admins/lecturers`,
  getStudents: `${BASE_URL}/api/v1/auth/admins/students`,
  addCourse: `${BASE_URL}/api/v1/auth/admins/courses`,
  getCourses: `${BASE_URL}/api/v1/auth/admins/courses`,
  addStudent: `${BASE_URL}/api/v1/auth/admins/students`,
  uploadStudents: `${BASE_URL}/api/v1/auth/admins/students/uploads`,
  adminCourseDetails: (courseId, type) =>
    `${BASE_URL}/api/v1/auth/admins/courses/${courseId}/questions?type=${type}`,
  adminStartCourse: courseId =>
    `${BASE_URL}/api/v1/auth/admins/courses/${courseId}/questions`,
};

export default API;
