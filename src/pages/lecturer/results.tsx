// import React, {useState} from 'react';
import AnimatedContainer from 'components/AnimatedContainer';
import Button from 'components/Button';
import DashboardLayout from 'components/Dashboard/Layout';

// import toast from 'react-hot-toast';
// import {useForm} from 'react-hook-form';
import useFetch, {CachePolicies} from 'use-http';
import API from 'constants/api';
// import validation from 'constants/validation';
// import {useNavigate} from 'react-router';
// import screens from 'constants/screens';
import Table from 'react-tailwind-table';
import tableStyling from 'constants/tableStyling';
import Loader from 'components/Loader';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import screens from 'constants/screens';

const col = [
  {
    field: 'student.matric',
    use: 'Matric No',
  },
  {
    field: 'student.firstName',
    use: 'First Name',
  },
  {
    field: 'student.lastName',
    use: 'Last Name',
  },
  {
    field: 'ca',
    use: 'CA',
  },
  {
    field: 'exam',
    use: 'Exam',
  },
  {
    field: 'total',
    use: 'Total',
  },
  {
    field: 'grade',
    use: 'Grade',
  },
];

const LecResults = () => {
  // const navigate = useNavigate();
  const params = useParams();
  const {data, loading: gLoading} = useFetch(
    API.getLecResults(params.id),
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );

  const rowcheck = (row, column, display_value) => {
    if (column.field === 'grade') {
      return display_value?.toUpperCase();
    }

    return display_value;
  };

  return (
    <DashboardLayout type="lec">
      {/* <MainModal isVisible={showModal} title="Add Course">
       
      </MainModal> */}
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl pt-8">Results</h3>
        <div className="flex flex-wrap mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              <p>
                <Link className="text-primary" to={screens.lecturerCourses}>
                  Courses
                </Link>{' '}
                / {params?.courseTitle} - {params?.courseCode}
              </p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            {/* <Button type="button" onClick={() => setShowModal(true)}>
              Modify Result
            </Button> */}
          </div>
        </div>
        <div className="my-8 relative">
          {gLoading && (
            <Loader className="absolute text-primary top-[60%] left-[50%]" />
          )}
          <Table
            columns={col}
            per_page={
              data && data?.data && data?.data?.length > 0 ? 10 : undefined
            }
            rows={data && data.data ? data.data : []}
            styling={tableStyling}
            hovered={true}
            row_render={rowcheck}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default LecResults;
