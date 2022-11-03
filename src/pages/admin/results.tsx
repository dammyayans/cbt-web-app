/* eslint-disable camelcase */
import {useState} from 'react';
import useFetch, {CachePolicies} from 'use-http';
// import {useForm} from 'react-hook-form';
// import validation from 'constants/validation';
import Table from 'react-tailwind-table';
import toast from 'react-hot-toast';
import {useParams, useNavigate} from 'react-router';
import {Link} from 'react-router-dom';

// import screens from 'constants/screens';
import AnimatedContainer from 'components/AnimatedContainer';
import Button from 'components/Button';
import DashboardLayout from 'components/Dashboard/Layout';
import tableStyling from 'constants/tableStyling';
import Loader from 'components/Loader';
import API from 'constants/api';
import screens from 'constants/screens';
import ConfirmModal from 'components/SmallModal';

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

const Results = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showModal, setShowModal] = useState(false);
  const {data, loading: gLoading} = useFetch(
    API.getResults(params.id),
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );
  const {post: releaseResult, loading: rLoading} = useFetch(
    API.releaseCourseResult(params.id),
  );

  const onRelease = async () => {
    try {
      const res = await releaseResult(data);
      if (res?.status.toLowerCase() === 'success') {
        setShowModal(false);
        navigate(screens.adminResults);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };

  const rowcheck = (_, column, display_value) => {
    if (column.field === 'grade') {
      return display_value?.toUpperCase();
    }

    return display_value;
  };

  return (
    <DashboardLayout type="admin">
      <ConfirmModal
        type="confirm"
        isDelete
        message={`Are you sure you want to Release ${params?.courseTitle} Result?`}
        onYes={onRelease}
        loading={rLoading}
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <span
          onClick={() => navigate(-1)}
          className="pt-8 text-lg text-primary cursor-pointer">
          Go back
        </span>
        <h3 className="font-bold text-3xl mt-3">Results</h3>
        <div className="flex flex-wrap mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>
                <Link className="text-primary" to={screens.adminCourses}>
                  Courses
                </Link>{' '}
                / {params?.courseTitle} - {params?.courseCode}
              </p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            <Button type="button" onClick={() => setShowModal(true)}>
              Release Result
            </Button>
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
            hovered
            row_render={rowcheck}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Results;
