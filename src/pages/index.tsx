/* eslint-disable no-nested-ternary */
// import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import useFetch, {CachePolicies} from 'use-http';
// import InvestmentTab from 'components/Tabs/InvestmentTab';
// import classNames from 'classnames';
// import format from 'date-fns/format';
import styled from 'styled-components';

import InvestmentPlan from 'components/InvestmentPlan';
import API, {BASE_URL} from 'constants/api';
import screens from 'constants/screens';
import Loader from 'components/Loader/Loader';
import AnimatedContainer from 'components/AnimatedContainer';
import DashboardLayout from 'components/Dashboard/Layout';
import {useUser} from 'context/user-context';
// import formatCurrency from 'constants/formatCurrency';
import eye from 'assets/icons/eye.svg';
import Transactions from 'components/Dashboard/Transactions';
import getDayPeriod from 'constants/dayPeriod';

const plans = [
  // {
  //   status: 'active',
  //   title: 'Crypto Invest',
  //   guaranteed: true,
  //   minimum: '1000',
  //   percentage: '14',
  //   month: '6',
  //   risk: 'low',
  //   isHybrid: false,
  // },
  // {
  //   status: 'active',
  //   title: 'Crypto Invest',
  //   guaranteed: true,
  //   minimum: '1000',
  //   percentage: '30',
  //   month: '6',
  //   risk: 'low',
  //   isHybrid: false,
  // },
  {
    guaranteed: true,
    minimum: '5000',
    status: 'disabled',
    percentage: '',
    isHybrid: true,
    title: 'Crypto Hybrid Fund',
    month: '12',
    risk: 'medium',
  },
  // {
  //   status: 'active',
  //   title: 'Crypto Invest',
  //   guaranteed: true,
  //   minimum: '1000',
  //   percentage: '70',
  //   month: '6',
  //   risk: 'low',
  //   isHybrid: false,
  // },
];

const InvestmentPlanContainer = styled.div`
  /* grid-template-columns: auto auto; */
  /* max-width: 790px; */
  grid-gap: 2rem;
  .border-investment {
    border: 1px solid rgba(14, 86, 192, 0.3);
  }
`;

const Home = () => {
  const history = useHistory();
  // const [activeTab, setActiveTab] = useState('2');
  const {data, loading} = useFetch(
    API.userTransactions,
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const {data: completedTransactions, loading: completedTrxLoading} = useFetch(
    API.userCompletedTransactions,
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const {user} = useUser();
  const [showBal, setShowBal] = useState(false);
  useEffect(() => {
    // try {
    //   getUserTransactions();
    // } catch {
    //   //
    // }
    if (!loading && !completedTrxLoading) {
      if (
        completedTransactions?.data.transactions.length === 0 &&
        data?.data.transactions.length === 0
      ) {
        history.push(screens.plan);
      } else if (completedTransactions?.data.transactions.length > 0) {
        // history.push(screens.report);
      }
    }
  }, [
    completedTransactions?.data.transactions.length,
    completedTrxLoading,
    data?.data.transactions.length,
    history,
    loading,
  ]);

  // if (activeTab !== '2') {
  //   return <Redirect to="/plan" />;
  // }

  if (loading && completedTrxLoading) {
    return <Loader />;
  }

  // const totalAmnt = data?.data.transactions.reduce(
  //   (acc, cur) => acc + cur.amount,
  //   0,
  // );
  const totalCompletedAmnt = completedTransactions?.data.transactions.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );

  return (
    <DashboardLayout>
      <AnimatedContainer className=" px-4 container mx-auto w-full min-h-screen">
        {/* <InvestmentTab active={activeTab} onClick={setActiveTab} /> */}
        <div className="flex flex-col">
          <div className="w-full mt-20 flex items-center">
            {user.profilePicture ? (
              <img
                className="img-cont flex-shrink-0 w-20 h-20 border-primary border-4 rounded-full mr-2"
                src={`${BASE_URL}/${user.profilePicture}`}
                alt="profile"
                width="100%"
              />
            ) : null}
            <div className="flex flex-col gap-2">
              <h1 className="text-primary text-3xl">
                Good {getDayPeriod()},{' '}
                <span className="font-bold">{user.profile.firstName}</span>
              </h1>
              <p className="text-sm text-dark-gray">
                Here’s an overview of your investment performance.
              </p>
            </div>
          </div>
          <div className="w-full flex-col md:flex-row flex gap-5 mt-10">
            <div className="h-44 w-full md:w-1/2 flex flex-col justify-between p-6 rounded-2xl bg-primary">
              <p className="text-white text-sm">Portfolio balance</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-base mb-1">
                    💰 Crypto hybrid fund
                  </p>
                  <div className="flex items-center text-white">
                    <p className="text-white font-light leading-none">$</p>
                    <p className="font-bold text-4xl text-white leading-none">
                      {completedTransactions
                        ? showBal
                          ? Number(totalCompletedAmnt).toLocaleString()
                          : '****'
                        : '_'}
                    </p>
                    <p className="text-white font-light leading-none">.00</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-white text-sm">
                    Tap to {!showBal ? 'show' : 'hide'}
                  </p>
                  <button type="button" onClick={() => setShowBal(!showBal)}>
                    <img src={eye} alt="" />
                  </button>
                </div>
              </div>
              <p className="text-white text-sm">Swipe down to refresh</p>
            </div>
            <button
              type="button"
              onClick={() => history.push(screens.plan)}
              className="h-44 w-full md:w-1/2 flex flex-col justify-center items-center p-6 rounded-2xl border-dashed border border-dark-gray">
              <p className="text-dark-gray text-center text-4xl">+</p>
              <p className="text-dark-gray text-center text-sm">
                Click to add new plan
              </p>
            </button>
          </div>
          {data?.data.transactions.length && (
            <Transactions transactions={data.data.transactions} />
          )}
          {/* PLANS */}
          {completedTransactions?.data.transactions.length ? (
            <div className="col-2 my-8">
              <p className="text-sm font-bold text-primary mb-2">
                Your Investment Plans
              </p>
              <InvestmentPlanContainer className="flex flex-wrap max-w-3xl">
                {plans.map((inv, i) => (
                  <InvestmentPlan
                    key={String(i)}
                    status={inv.status}
                    title={inv.title}
                    guaranteed={inv.guaranteed}
                    minimum={totalCompletedAmnt}
                    percentage={inv.percentage}
                    month={inv.month}
                    risk={inv.risk}
                    isSubscribed
                    onView={() => history.push('/report')}
                    // isActive
                  />
                ))}
              </InvestmentPlanContainer>
            </div>
          ) : null}
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Home;
