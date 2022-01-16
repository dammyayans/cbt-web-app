import cn from 'classnames';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import API from 'constants/api';
import screens from 'constants/screens';
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import useFetch, {CachePolicies} from 'use-http';

const SelectExam = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const {data, loading, get} = useFetch(
    API.getStartedCourses,
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const startedCourses = data?.startedCourses;
  return (
    <Layout>
      <div className="flex justify-between items-center flex-wrap w-full">
        <div className="px-4 max-w-[100%] md:max-w-[60%] w-full">
          <h1 className="font-extrabold text-black text-4xl">Select Course</h1>
          <p className="text-gray mt-2 mb-5 text-[18px]">
            Select a course and start your exam
          </p>
          <div className="mb-4">
            {loading ? (
              <div className="min-h-[100px] text-primary">
                <Loader className="p-6 m-0" />
              </div>
            ) : startedCourses?.length ? (
              startedCourses.map((c, _) => (
                <button
                  onClick={() => setSelected(c)}
                  key={_}
                  className={cn(
                    `w-full rounded-[10px] border-2 py-4 pl-10 text-left text-sm text-black mb-6 cursor-pointer transition-all duration-300`,
                    {
                      'bg-primary text-white border-primary font-bold active-shadow':
                        selected === c,
                      'border-border-gray': selected !== c,
                    },
                  )}>
                  {`${c?.course?.courseCode.toUpperCase()} ${c?.type?.toUpperCase()} - ${
                    c?.course?.courseTitle
                  }`}
                </button>
              ))
            ) : (
              <div className="min-h-[100px] text-primary">
                <p>No Course at the moment</p>
              </div>
            )}
          </div>
          <div className="flex mt-14">
            <Button onClick={() => get()} variant="text" isDisabled={loading}>
              Refresh
            </Button>
            <Button
              className="w-[180px] mr-3"
              hoverStyle={false}
              onClick={() =>
                selected
                  ? navigate(
                      `${screens.test}/${selected?.courseID}/${selected?.type}`,
                    )
                  : toast.error('Please select a course')
              }
              type="submit">
              Start
            </Button>
          </div>
        </div>
        {selected ? (
          <div className="border-2 border-primary rounded-[10px] transition-all duration-500">
            <h2 className="font-extrabold text-black text-[15px] pt-5 pb-[10px] px-5 border-b-2 border-b-primary">
              Assessment Details
            </h2>
            <div className="p-5">
              <p className="text-[12px] mb-2">
                Course Code:{' '}
                <span className="font-bold">
                  {selected?.course?.courseCode?.toUpperCase()}
                </span>
              </p>
              <p className="text-[12px] mb-2">
                Course Code:{' '}
                <span className="font-bold">
                  {selected?.course?.courseTitle?.toUpperCase()}
                </span>
              </p>
              <p className="text-[12px] mb-2">
                Duration:{' '}
                <span className="font-bold"> {selected?.duration} minutes</span>
              </p>
              <p className="text-[12px] mb-2">
                Total Questions:{' '}
                <span className="font-bold">{selected?.amount}</span>
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SelectExam;
