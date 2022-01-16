const screens = {
  selectExam: '/select-exam',
  test: '/test',
  // lectuerer
  lecturerLogin: '/lecturer/login',
  lecturerDashboard: '/lecturer/dashboard',
  lecturerCourses: '/lecturer/courses',
  lecturerSettings: '/lecturer/settings',
  lecturerCourseDetails: '/lecturer/courses/:id',
  // admin
  adminLogin: '/admin/login',
  adminDashboard: '/admin/dashboard',
  adminlecturers: '/admin/lecturers',
  adminCourses: '/admin/courses',
  adminStudents: '/admin/students',
  adminCourseDetails: '/admin/courses/:id',
  adminResults: '/admin/results',
  // uploadDocuments: (type = ':type') => `/profile/upload-document/${type}`,
  resetPassword: '/reset-password',
};
export default screens;
