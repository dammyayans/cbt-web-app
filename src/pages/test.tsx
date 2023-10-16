import React, { useEffect, useState } from "react";
import AnimatedContainer from "components/AnimatedContainer";
import Header from "components/Header";
import Question from "components/Question";
import Button from "components/Button";
import { ReactComponent as TimerIcon } from "assets/icons/timer.svg";
import { ReactComponent as TimerIconDanger } from "assets/icons/timer-danger.svg";
import OverviewBox from "components/OverviewBox";
import useCountDownTimer from "hooks/useCountDownTimer";
import classNames from "classnames";
// import questions from 'constants/Questions';
import ConfirmModal from "components/SmallModal";
import useFetch, { CachePolicies } from "use-http";
import API from "constants/api";
import { useNavigate, useParams } from "react-router";
import { useUser } from "context/user-context";
import { getItemFromLocalStorage } from "constants/index";
import toast from "react-hot-toast";
import { useAuth } from "context/auth-context";
import Loader from "components/Loader";
import MainModal from "components/MainModal";

const Test = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { studentSignOut } = useAuth();

  //localstorage keys
  const userQuestionslKey = `${user?.matric}-${params.id}`;
  const overviewKey = `${user?.matric}-${params.id}-${params.type}-overview`;
  const durationKey = `${user?.matric}-${params.id}-${params.type}-timeLeft`;

  const { data, loading, error } = useFetch(
    API.getQuestions(params.id, params.type),
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );
  const { post: postAnswers, loading: sLoading } = useFetch(
    API.submitAssessment(params.id, params.type)
  );

  const [questionsDetails, setQuestionsDetatils] = useState({
    questions: [],
    questionAmount: 0,
    duration: 0,
    courseCode: "",
    courseTitle: "",
  });

  // state for question indicators including selected answer
  const [overview, setOverview] = useState<any[]>([]);

  // state for current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // timer hook
  const [timer, lessThan10, timeUp] = useCountDownTimer({
    timestamp: questionsDetails?.duration
      ? 60 * questionsDetails?.duration
      : undefined,
    durationKey,
  });
  // state for confirm modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userQuestionsDetails = getItemFromLocalStorage(userQuestionslKey);
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
    const overviewFromLocalStorage = getItemFromLocalStorage(overviewKey);
    if (overviewFromLocalStorage) {
      setOverview(overviewFromLocalStorage);
      // setCurrentQuestionIndex(
      //   overviewFromLocalStorage?.findIndex(
      //     ov => ov.type?.toLowerCase()?.includes('current') + 1,
      //   ) || 0,
      // );
    } else if (questionsDetails?.questions?.length) {
      const initOVerview = questionsDetails?.questions.map((n: any, _) => ({
        no: _ + 1,
        questionId: n?.id,
        type: "default",
        selectedAnswer: "",
      }));
      setOverview(initOVerview);
      localStorage.setItem(overviewKey, JSON.stringify(initOVerview));
    }
  }, [questionsDetails, overviewKey]);

  //next & previous question functions
  const handleNext = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === questionsDetails?.questions?.length - 1
        ? 0
        : (prev) => prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(
      currentQuestionIndex === 0
        ? questionsDetails?.questions?.length - 1
        : (prev) => prev - 1
    );
  };

  const handleOnOverviewBox = (index: number) => {
    setCurrentQuestionIndex(index - 1);
  };

  const logOut = (typ: string) => {
    localStorage.clear();
    studentSignOut();
    navigate(
      typ === "messgae"
        ? `/login/${user?.firstName} ${user?.lastName}/${params.type}`
        : "/login"
    );
  };

  const handleSubmit = async () => {
    const answers = overview
      .filter((ov: any) => ov?.selectedAnswer)
      .map((ov: any) => ({ id: ov?.questionId, answer: ov?.selectedAnswer }));
    const dataToPost = {
      questionAmount: questionsDetails?.questionAmount,
      answers,
    };
    try {
      const res = await postAnswers(dataToPost);
      if (res?.status === "success") {
        logOut("messgae");
      }
    } catch (e) {
      toast.error(String(e));
    }
  };
  useEffect(() => {
    if (timeUp && !error) {
      handleSubmit();
    }
  }, [timeUp, error]);

  useEffect(() => {
    if (error) {
      setTimeout(() => logOut(""), 3000);
    }
  }, [error]);

  return (
    <AnimatedContainer>
      <ConfirmModal
        type="confirm"
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        examType={params.type}
        onYes={handleSubmit}
        loading={sLoading}
      />
      <MainModal isVisible={timeUp} title="Time Up!!">
        <div>
          <Loader className="mb-4 w-7 h-6 text-primary" />
          <p className="text-danger">Submitting..</p>
        </div>
      </MainModal>

      <MainModal isVisible={Boolean(error)} title="Message">
        <div>
          <p>
            Sorry {user?.firstName} {user?.lastName} you cannot take this{" "}
            {params?.type?.toUpperCase()} again
          </p>
          <p>You are being logged out..</p>
        </div>
      </MainModal>
      <Header
        avatar={
          user?.avatar ||
          "https://image.shutterstock.com/z/stock-photo-inmage-of-pensive-concentrated-woman-doctor-sitting-at-table-and-working-on-laptop-computer-2083183264.jpg"
        }
        firstname={user?.firstName}
        lastname={user?.lastName}
        matricNo={user?.matric}
      />
      {!questionsDetails.courseTitle && loading ? (
        <div className="flex h-screen justify-center items-center">
          <Loader className="text-primary h-20 w-20 my-10 mb-0" />
        </div>
      ) : (
        !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 md:h-screen md:overflow-y-hidden">
            <div className="col-span-2 bg-whitesmoke mt-[72px]">
              <div className="mt-10 h-full">
                <div className="px-4 md:px-14">
                  <h2 className="text-3xl mb-10">
                    {questionsDetails?.courseCode?.toUpperCase()} -{" "}
                    {questionsDetails?.courseTitle}
                  </h2>
                </div>
                <div className="h-[59vh] overflow-y-scroll px-4 md:px-14">
                  {questionsDetails?.questions?.length ? (
                    <Question
                      number={currentQuestionIndex + 1}
                      details={
                        questionsDetails?.questions[currentQuestionIndex]
                      }
                      setOverview={setOverview}
                      overview={overview}
                      overviewKey={overviewKey}
                    />
                  ) : null}
                </div>
                <div className="flex justify-center my-12">
                  <Button
                    onClick={handlePrevious}
                    className="mr-14 bg-primary py-[10px]"
                  >
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="bg-primary py-[10px]">
                    Next
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-[72px]">
              <div className="mt-10 px-4 md:px-14 h-full">
                <div className="h-[28vh] overflow-y-scroll">
                  <div className="flex animate-pulse">
                    {lessThan10 ? <TimerIconDanger /> : <TimerIcon />}
                    <div className="ml-3">
                      <p
                        className={classNames("text-3xl", {
                          "text-danger": lessThan10,
                        })}
                      >
                        {timer}
                      </p>
                      <p
                        className={classNames("text-xl", {
                          "text-[#666666]": !lessThan10,
                          "text-danger": lessThan10,
                        })}
                      >
                        remaining
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-danger text-[15px] h-[20%]">
                    {lessThan10 ? "You have less than 10 minutes!" : ""}
                  </p>
                </div>
                <div className="h-[43vh] overflow-y-scroll">
                  <p className="text-[15px]">You have answered:</p>
                  <p className="mb-7 text-xl">
                    {overview?.filter((ov) => ov.type === "done")?.length} of{" "}
                    {questionsDetails?.questionAmount} questions
                  </p>
                  <p className="mb-7 text-[15px]">Questions Overview:</p>
                  <div className="flex flex-wrap">
                    {overview.map((n: any) => (
                      // <div key>
                      <OverviewBox
                        onClick={() => handleOnOverviewBox(n?.no)}
                        key={n.no}
                        type={
                          n.no === currentQuestionIndex + 1 && n.type === "done"
                            ? "doneCurrent"
                            : n.no === currentQuestionIndex + 1
                            ? "current"
                            : n.type
                        }
                      >
                        {n.no}
                      </OverviewBox>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4 mb-4">
                  <Button
                    // isDisabled={true || !lessThan10}
                    hoverStyle={lessThan10}
                    className={classNames("py-[10px]", {
                      // 'opacity-40': true || !lessThan10,
                    })}
                    onClick={() => setShowModal(true)}
                  >
                    End Exam
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </AnimatedContainer>
  );
};

export default Test;
