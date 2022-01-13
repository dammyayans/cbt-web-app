import cn from 'classnames';
import AdminQuestion from 'components/AdminQuestion';
import AnimatedContainer from 'components/AnimatedContainer';
import Button from 'components/Button';
import DashboardLayout from 'components/Dashboard/Layout';
import Loader from 'components/Loader';
import API from 'constants/api';
import React, {useState} from 'react';
import {useParams} from 'react-router';
import useFetch, {CachePolicies} from 'use-http';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const [openTab, setOpenTab] = useState(1);
  // const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');
  const params = useParams();
  const {
    data,
    loading,
    get: getCA,
  } = useFetch(
    API.adminCourseDetails(params.id, 'ca'),
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const {data: data2, get: getExam} = useFetch(
    API.adminCourseDetails(params.id, 'exam'),
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const {post: postStatus, loading: pLoading} = useFetch(
    API.adminCourseDetails(params.id, openTab === 1 ? 'ca' : 'exam'),
  );

  const course = data?.data.course;
  const caQuestions = data?.data.questions;
  const examQuestions = data2?.data.questions;

  const handleStatus = async status => {
    setStatus(status);
    try {
      const res = await postStatus({
        approvalStatus: status,
      });
      if (res?.status.toLowerCase() === 'success') {
        openTab === 1 ? getCA() : getExam();
      }
    } catch (e) {
      toast.error(String(e));
    }
  };
  return (
    <DashboardLayout type="admin">
      {/* <ConfirmModal
        type="confirm"
        isDelete
        message={`Are you sure you want to Delete ${course?.courseTitle} Questions?`}
        onYes={onDelete}
        loading={delLoading}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      /> */}
      {loading ? (
        <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full h-screen flex justify-center items-center">
          <div className="flex justify-center items-center flex-col animate-bounce">
            <Loader className="text-primary h-8 w-8 my-10 mb-0" />
            <p className="text-[24px] font-bold  text-center mt-2">
              Loading Course Details
            </p>
          </div>
        </AnimatedContainer>
      ) : (
        <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
          <h3 className="font-bold text-3xl pt-8">{course?.courseTitle}</h3>
          <div className="flex mt-6 justify-between items-center">
            <div className="flex-auto w-2/3">
              <div className="relative">
                <p className="text-xl mb-2">{course?.courseCode}</p>

                <div className="flex">
                  <p className="text-[15px] mr-4">{course?.unit} Credit</p>
                  <p className="text-[15px]">Status: {course?.status}</p>
                </div>
              </div>
            </div>
            <div className="flex-auto flex justify-end w-1/3">
              {/* <Button
                hoverStyle={false}
                type="button"
                className="px-2"
                onClick={() => null}>
                Show Exam
              </Button> */}
            </div>
          </div>
          <h3 className="font-bold text-3xl mt-6 mb-4">Questions</h3>
          <div className="d">
            <button
              onClick={() => setOpenTab(1)}
              className={cn('py-2 px-8 mr-2 text-sm', {
                'bg-white border-b-[3px] border-b-primary': openTab === 1,
              })}>
              CA
            </button>
            <button
              onClick={() => setOpenTab(2)}
              className={cn('py-2 px-8 text-sm', {
                'bg-white border-b-[3px] border-b-primary': openTab === 2,
              })}>
              Exam
            </button>
          </div>
          {openTab === 1 ? (
            <div>
              <div className="bg-white rounded-b-[15px] p-7 mb-4">
                {caQuestions?.length ? (
                  <div>
                    <p className="text-lg text-right">
                      Status:{' '}
                      <span
                        className={cn('font-bold capitalize', {
                          'text-warning':
                            caQuestions[0].approvalStatus === 'pending',
                          'text-danger':
                            caQuestions[0].approvalStatus === 'declined',
                          'text-success':
                            caQuestions[0].approvalStatus === 'approved',
                        })}>
                        {caQuestions[0].approvalStatus}
                      </span>
                    </p>
                    {caQuestions.map((q, ind) => (
                      <AdminQuestion key={q.id} details={q} sn={ind + 1} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center">No Question Found</p>
                )}
                <div className="flex mt-4 justify-end">
                  {caQuestions?.length ? (
                    <div className="flex">
                      <Button
                        type="button"
                        className="mr-2 px-2 bg-danger border-0"
                        hoverStyle={false}
                        isDisabled={loading}
                        loading={pLoading && status === 'declined'}
                        onClick={() => handleStatus('declined')}>
                        Decline Questions
                      </Button>
                      <Button
                        type="button"
                        className=" px-2 bg-success border-0"
                        hoverStyle={false}
                        isDisabled={loading}
                        loading={pLoading && status === 'approved'}
                        onClick={() => handleStatus('approved')}>
                        Approve Questions
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={cn(
                  'bg-white rounded-b-[15px] p-7 mb-4 transition-opacity',
                )}>
                {examQuestions?.length ? (
                  <div>
                    <p className="text-lg text-right">
                      Status:{' '}
                      <span
                        className={cn('font-bold capitalize', {
                          'text-warning':
                            examQuestions[0].approvalStatus === 'pending',
                          'text-danger':
                            examQuestions[0].approvalStatus === 'declined',
                          'text-success':
                            examQuestions[0].approvalStatus === 'approved',
                        })}>
                        {examQuestions[0].approvalStatus}
                      </span>
                    </p>
                    {examQuestions.map((q, ind) => (
                      <AdminQuestion key={q.id} details={q} sn={ind + 1} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center">No Question Found</p>
                )}
                <div className="flex my-4 justify-end">
                  {examQuestions?.length ? (
                    <div className="flex">
                      <Button
                        type="button"
                        className="mr-2 px-2 bg-danger border-0"
                        hoverStyle={false}
                        isDisabled={loading}
                        loading={pLoading && status === 'declined'}
                        onClick={() => handleStatus('declined')}>
                        Decline Questions
                      </Button>
                      <Button
                        type="button"
                        className=" px-2 bg-success border-0"
                        hoverStyle={false}
                        isDisabled={loading}
                        loading={pLoading && status === 'approved'}
                        onClick={() => handleStatus('approved')}>
                        Approve Questions
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </AnimatedContainer>
      )}
    </DashboardLayout>
  );
};

export default CourseDetails;
