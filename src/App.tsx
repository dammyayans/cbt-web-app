import useScrollToTop from 'hooks/useScrollToTop';
import {Route, Routes} from 'react-router';
import Login from 'pages/login';
import SelectExam from 'pages/selectExam';
import PrivateRoute from './PrivateRoute';
import Test from 'pages/test';
import LecturerLogin from 'pages/lecturer/lecturerlogin';
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

function App() {
  useScrollToTop();

  return (
    <main>
      <Routes>
        {/* student routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/login/:name/:type" element={<Login />} />
        <Route
          element={
            <PrivateRoute type="student">
              <SelectExam />
            </PrivateRoute>
          }
          path={screens.selectExam}
        />
        <Route
          element={
            <PrivateRoute type="student">
              <Test />
            </PrivateRoute>
          }
          path="/test/:id/:type"
        />

        {/* lecturer routes */}
        <Route path="lecturer/login" element={<LecturerLogin />} />
        <Route
          element={
            <PrivateRoute type="lecturer">
              <DashboardHome />
            </PrivateRoute>
          }
          path={screens.lecturerDashboard}
        />
        <Route
          element={
            <PrivateRoute type="lecturer">
              <LCourses />
            </PrivateRoute>
          }
          path={screens.lecturerCourses}
        />
        <Route
          element={
            <PrivateRoute type="lecturer">
              <Settings />
            </PrivateRoute>
          }
          path={screens.lecturerSettings}
        />
        <Route
          element={
            <PrivateRoute type="lecturer">
              <CourseDetailsL />
            </PrivateRoute>
          }
          path={screens.lecturerCourseDetails}
        />

        {/* admin routes */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route
          element={
            <PrivateRoute type="admin">
              <ADashboardHome />
            </PrivateRoute>
          }
          path={screens.adminDashboard}
        />
        <Route
          element={
            <PrivateRoute type="admin">
              <Lecturers />
            </PrivateRoute>
          }
          path={screens.adminlecturers}
        />
        <Route
          element={
            <PrivateRoute type="admin">
              <Courses />
            </PrivateRoute>
          }
          path={screens.adminCourses}
        />
        <Route
          element={
            <PrivateRoute type="admin">
              <CourseDetails />
            </PrivateRoute>
          }
          path={screens.adminCourseDetails}
        />
        <Route
          element={
            <PrivateRoute type="admin">
              <Students />
            </PrivateRoute>
          }
          path={screens.adminStudents}
        />

        {/* </Route> */}
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: '#32A813',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#31a81381',
            },
          },
          error: {
            style: {
              background: '#D43228',
              color: 'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            },
          },
        }}
      />
    </main>
  );
}

export default App;
