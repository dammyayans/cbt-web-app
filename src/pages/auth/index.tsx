import {Switch, Route, useRouteMatch} from 'react-router-dom';

import ForgotPassword from './forget-password';

import screens from 'constants/screens';
import AnimatedContainer from 'components/AnimatedContainer';

const AuthPages = () => {
  const {path} = useRouteMatch();
  return (
    <>
      <AnimatedContainer className="pt-24 max-w-lg mx-auto w-full min-h-screen pb-12 px-4">
        <Switch>
          <Route path={path + screens.forgotPassword}>
            <ForgotPassword />
          </Route>
        </Switch>
      </AnimatedContainer>
    </>
  );
};

export default AuthPages;
