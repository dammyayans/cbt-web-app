import {Switch, Route, useRouteMatch} from 'react-router-dom';

import CreateAccount from './createAccount';
import VerifyPhone from './verify-phone';

import AnimatedContainer from 'components/AnimatedContainer';
import VerifyEmail from 'pages/createAccount/verify-email';
import SelectCountry from 'pages/createAccount/select-country';
import PersonalInfo from 'pages/createAccount/personal-info';
import screens from 'constants/screens';
// import screens from 'constants/screens';

const CreateAccountPages = () => {
  const {path} = useRouteMatch();
  return (
    <AnimatedContainer className="pt-14 pb-5 px-4 container mx-auto w-full min-h-screen">
      <Switch>
        <Route exact path={path + screens.selectCountry}>
          <SelectCountry />
        </Route>
        <Route exact path={path}>
          <CreateAccount />
        </Route>
        <Route exact path={path + screens.verifyEmail}>
          <VerifyEmail />
        </Route>
        <Route exact path={path + screens.personalInfo}>
          <PersonalInfo />
        </Route>
        <Route exact path={path + screens.verifyPhone}>
          <VerifyPhone />
        </Route>
      </Switch>
    </AnimatedContainer>
  );
};

export default CreateAccountPages;
