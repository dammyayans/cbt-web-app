import useScrollToTop from 'hooks/useScrollToTop';
import {Route, Routes} from 'react-router';
import Login from 'pages/login';
import SelectExam from 'pages/selectExam';
import PrivateRoute from './PrivateRoute';
import Test from 'pages/test';
import LecturerLogin from 'pages/lecturer/login';
import DashboardHome from 'pages/lecturer/dashboard';
import LCourses from 'pages/lecturer/courses';
import ADashboardHome from 'pages/admin/dashboard';
import Lecturers from 'pages/admin/lecturers';
import screens from 'constants/screens';
import AdminLogin from 'pages/admin/login';
import {Toaster} from 'react-hot-toast';
import Courses from 'pages/admin/courses';
import CourseDetails from 'pages/admin/courseDetails';
import Students from 'pages/admin/students';
import Settings from 'pages/lecturer/settings';
import CourseDetailsL from 'pages/lecturer/courseDetails';
import App2 from 'pages';

function App() {
  useScrollToTop();

  return <App2 />;
}

export default App;
