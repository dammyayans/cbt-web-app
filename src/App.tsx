import useScrollToTop from 'hooks/useScrollToTop';
import {Route, Routes} from 'react-router';
import Login from 'pages/login';
import SelectExam from 'pages/selectExam';
import PrivateRoute from './PrivateRoute';
import Test from 'pages/test';

function App() {
  useScrollToTop();

  return (
    <main>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <PrivateRoute>
              <SelectExam />
            </PrivateRoute>
          }
          path="/select-exam"
        />
        <Route
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
          path="/test"
        />

        {/* </Route> */}
      </Routes>
    </main>
  );
}

export default App;
