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
      <div className="px-4 md:pl-10 max-w-[417px] w-full">
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
                onClick={() => setSelected(c.courseID)}
                key={_}
                className={cn(
                  `w-full rounded-[10px] border-2 py-4 pl-10 text-left text-sm text-black mb-6 cursor-pointer transition-all duration-300`,
                  {
                    'bg-primary text-white border-primary font-bold active-shadow':
                      selected === c.courseID,
                    'border-border-gray': selected !== c.courseID,
                  },
                )}>
                {`${c?.course?.courseCode} - ${c?.course?.courseTitle}`}
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
            onClick={() =>
              selected
                ? navigate(screens.test)
                : toast.error('Please select a course')
            }
            type="submit">
            Start
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SelectExam;
