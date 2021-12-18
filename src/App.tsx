import useScrollToTop from 'hooks/useScrollToTop';
import {Route, Routes} from 'react-router';
import Login from 'pages/login';
import SelectExam from 'pages/selectExam';
import PrivateRoute from './PrivateRoute';

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

        {/* </Route> */}
      </Routes>
    </main>
  );
}

export default App;
