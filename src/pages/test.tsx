import React, {useEffect, useState} from 'react';
import AnimatedContainer from 'components/AnimatedContainer';
import Header from 'components/Header';
import SwipeableViews from 'react-swipeable-views';
import Question from 'components/Question';
import Button from 'components/Button';
import {ReactComponent as TimerIcon} from 'assets/icons/timer.svg';
import {ReactComponent as TimerIconDanger} from 'assets/icons/timer-danger.svg';
import OverviewBox from 'components/OverviewBox';
import useCountDownTimer from 'hooks/useCountDownTimer';
import classNames from 'classnames';
// import questions from 'constants/Questions';
import ConfirmModal from 'components/SmallModal';
import useFetch, {CachePolicies} from 'use-http';
import API from 'constants/api';
import {useParams} from 'react-router';
import {useUser} from 'context/user-context';
import {getItemFromLocalStorage} from 'constants/index';

const Test = () => {
  const params = useParams();
  const {user} = useUser();
  const userQuestionslKey = `${user?.matric}-${params.id}`;
  const {data, loading} = useFetch(
    API.getQuestions(params.id, params.type),
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );

  const [questionsDetails, setQuestionsDetatils] = useState({
    questions: [],
    questionAmount: 0,
    duration: 0,
    courseCode: '',
    courseTitle: '',
  });

  // state for question indicators
  const [overview, setOverview] = useState([]);

  // state for current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // timer hook
  const [timer, lessThan10, timeUp] = useCountDownTimer({
    timestamp: 60 * questionsDetails?.duration,
  });

  // state for confirm modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userQuestionsDetails = getItemFromLocalStorage(userQuestionslKey);
    console.log(userQuestionsDetails);
    if (userQuestionsDetails) {
      // setLoading()
      setQuestionsDetatils(userQuestionsDetails);
    } else if (data?.data) {
      setQuestionsDetatils(data?.data);
      localStorage.setItem(userQuestionslKey, JSON.stringify(data?.data));
    }

    // setQuestionsDetatils()
  }, [data]);

  useEffect(() => {
    questionsDetails?.questions?.length
      ? setOverview(
          Array.from(Array(questionsDetails?.questions?.length).keys()).map(
            n => ({
              no: n + 1,
              type: 'default',
            }),
          ),
        )
      : [];
  }, [questionsDetails]);

  //next & previous question functions
  const handleNext = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === questionsDetails?.questions?.length - 1
        ? 0
        : prev => prev + 1,
    );
  };
  const handlePrevious = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === 0
        ? questionsDetails?.questions?.length - 1
        : prev => prev - 1,
    );
  };

  const handleOnOverviewBox = index => {
    setCurrentQuestionIndex(index - 1);
    setOverview(
      overview.map(el => (el.no === index ? {...el, type: 'done'} : el)),
    );
  };

  return (
    <AnimatedContainer>
      <ConfirmModal
        type="confirm"
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <Header
        avatar={
          user?.avatar ||
          'https://image.shutterstock.com/z/stock-photo-inmage-of-pensive-concentrated-woman-doctor-sitting-at-table-and-working-on-laptop-computer-2083183264.jpg'
        }
        firstname={user?.firstName}
        lastname={user?.lastName}
        matricNo={user?.matric}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
        <div className="col-span-2 bg-whitesmoke mt-[72px]">
          <div className="mt-14">
            <div className="px-4 md:px-14">
              <h2 className="text-3xl mb-10">
                {questionsDetails?.courseCode?.toUpperCase()} -{' '}
                {questionsDetails?.courseTitle}
              </h2>
            </div>
            <div className="h-[435px] overflow-y-scroll px-4 md:px-14">
              {questionsDetails?.questions?.length ? (
                <Question
                  number={currentQuestionIndex + 1}
                  details={questionsDetails?.questions[currentQuestionIndex]}
                />
              ) : null}
            </div>
            <div className="flex justify-center my-12">
              <Button
                onClick={handlePrevious}
                className="mr-14 bg-mediumblue  py-[10px]">
                Previous
              </Button>
              <Button onClick={handleNext} className="bg-mediumblue py-[10px]">
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-[72px] sticky">
          <div className="mt-14 px-4 md:px-14">
            <div className="flex animate-pulse">
              {lessThan10 ? <TimerIconDanger /> : <TimerIcon />}
              <div className="ml-3">
                <p
                  className={classNames('text-3xl', {
                    'text-danger': lessThan10,
                  })}>
                  {timer}
                </p>
                <p
                  className={classNames('text-xl', {
                    'text-[#666666]': !lessThan10,
                    'text-danger': lessThan10,
                  })}>
                  remaining
                </p>
              </div>
            </div>
            <p className="mt-5 text-danger text-[15px] mb-36">
              {lessThan10 ? 'You have less than 10 minutes!' : ''}
            </p>
            <div className="h-[435px] overflow-y-scroll">
              <p className="text-[15px]">You have answered:</p>
              <p className="mb-7 text-xl">
                3 of {questionsDetails?.questionAmount} questions
              </p>
              <p className="mb-7 text-[15px]">Questions Overview:</p>
              <div className="flex flex-wrap">
                {overview.map(n => (
                  // <div key>
                  <OverviewBox
                    onClick={() => handleOnOverviewBox(n.no)}
                    key={n.no}
                    type={
                      n.no === currentQuestionIndex + 1 ? 'current' : n.type
                    }>
                    {n.no}
                  </OverviewBox>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4 mb-4">
              <Button
                isDisabled={!lessThan10}
                className={classNames('py-[10px]', {
                  'opacity-40': !lessThan10,
                })}
                onClick={() => setShowModal(true)}>
                End Exam
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default Test;
