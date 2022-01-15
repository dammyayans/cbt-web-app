import React, {useState} from 'react';
import AnimatedContainer from 'components/AnimatedContainer';
import Button from 'components/Button';
import DashboardLayout from 'components/Dashboard/Layout';
import MainModal from 'components/MainModal';
import toast from 'react-hot-toast';
import {useForm} from 'react-hook-form';
import useFetch, {CachePolicies} from 'use-http';
import API from 'constants/api';
import validation from 'constants/validation';
import {useNavigate} from 'react-router';
import screens from 'constants/screens';
import Table from 'react-tailwind-table';
import tableStyling from 'constants/tableStyling';
import Loader from 'components/Loader';
import {ReactComponent as AddFile} from 'assets/icons/add-file.svg';
import {ReactComponent as DownloadIcon} from 'assets/icons/download-icon.svg';
import {useDropzone} from 'react-dropzone';

interface IFormValue {
  excelFile: object;
  duration: string;
  amount: string;
  type: string;
}

const col = [
  {
    field: 'courseCode',
    use: 'Course Code',
  },
  {
    field: 'courseTitle',
    use: 'Course Title',
  },
  {
    field: 'unit',
    use: 'Unit',
    use_in_search: false,
  },
  // {
  //   field: 'status',
  //   use: 'Status',
  // },
  {
    field: 'action',
    use: 'Action',
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const [uploadModal, setUploadModal] = useState(false);
  const [questionsFile, setQuestionsFile] = useState(null);
  const [courseId, setCourseID] = useState(null);

  const {post: postQuestions, loading} = useFetch(API.addQuestions(courseId));
  const {
    data,
    loading: gLoading,
    get,
  } = useFetch(
    API.getMyCourses,
    {cachePolicy: CachePolicies.CACHE_AND_NETWORK},
    [],
  );

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IFormValue>({resolver: validation.addQuestionSchema});

  const {getRootProps, getInputProps} = useDropzone({
    multiple: false,
    accept:
      '.xlsx,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    onDropAccepted: res => {
      setQuestionsFile(res[0]);
    },
    onDropRejected: files => {
      // console.log(files);
      files[0]?.errors.forEach(err => {
        if (err.code === 'file-invalid-type')
          toast.error('Invalid file format');
        else toast.error(err.message);
      });
    },
  });

  const rowcheck = (row, column, display_value) => {
    if (column.field === 'action') {
      return (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setCourseID(row.courseID);
              setUploadModal(true);
            }}
            // variant="outlined"
            className="py-1 rounded-[5px] text-[10px] border-0 px-1 text-blackk bg-lightblue mr-[15px]"
            hoverStyle={false}>
            Upload questions
          </Button>
          <Button
            onClick={() => navigate(row.courseID)}
            className="py-1 rounded-[5px] text-[10px] px-1 border-0 text-blackk bg-lightblue mr-[15px]"
            hoverStyle={false}>
            View questions
          </Button>
          <Button
            // onClick={() => navigate(row.courseID)}
            className="py-1 text-[10px] border-0 rounded-[5px] px-1"
            hoverStyle={false}>
            View results
          </Button>
        </div>
      );
    } else if (column.field === 'courseCode') {
      return display_value.toUpperCase();
    }

    return display_value;
  };

  const onSubmit = async (data: IFormValue) => {
    if (questionsFile) {
      const {amount, duration, type} = data;
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('duration', duration);
      formData.append('type', type);
      formData.append('excelFile', questionsFile);
      try {
        const res = await postQuestions(formData);
        if (res?.status.toLowerCase() === 'success') {
          get();
          setUploadModal(false);
          reset();
          setQuestionsFile(null);
          navigate(screens.lecturerCourses);
        }
      } catch (e) {
        toast.error(String(e));
      }
    } else {
      toast.error('Please upload a file');
    }
  };

  return (
    <DashboardLayout type="lec">
      {/* upload students modal */}
      <MainModal isVisible={uploadModal} title="Upload Questions">
        <div className="flex justify-end">
          <a href="/question.xlsx" target="_blank" download>
            <button className="flex items-center">
              <DownloadIcon />
              <p className="ml-[5px] text-primary text-[15px]">
                Download format
              </p>
            </button>
          </a>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <button
              type="button"
              {...getRootProps({
                className:
                  'w-full grid place-items-center mt-5 py-10 border-primary bg-[#F5F6FF] mb-[27px]',
                style: {
                  borderStyle: 'dashed',
                  borderWidth: '1px',
                },
              })}>
              <input {...register('excelFile')} {...getInputProps()} />
              <AddFile />
              <p className="text-[13px] mt-[15px]">
                Drag and drop or{' '}
                <span className="text-primary underline">browse</span> your
                files
              </p>
            </button>
            {questionsFile ? (
              <div className="flex items-center">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.5 17.5V5.625L9.875 0H3C2.33696 0 1.70107 0.263392 1.23223 0.732233C0.763392 1.20107 0.5 1.83696 0.5 2.5V17.5C0.5 18.163 0.763392 18.7989 1.23223 19.2678C1.70107 19.7366 2.33696 20 3 20H13C13.663 20 14.2989 19.7366 14.7678 19.2678C15.2366 18.7989 15.5 18.163 15.5 17.5ZM9.875 3.75C9.875 4.24728 10.0725 4.72419 10.4242 5.07583C10.7758 5.42746 11.2527 5.625 11.75 5.625H14.25V17.5C14.25 17.8315 14.1183 18.1495 13.8839 18.3839C13.6495 18.6183 13.3315 18.75 13 18.75H3C2.66848 18.75 2.35054 18.6183 2.11612 18.3839C1.8817 18.1495 1.75 17.8315 1.75 17.5V2.5C1.75 2.16848 1.8817 1.85054 2.11612 1.61612C2.35054 1.3817 2.66848 1.25 3 1.25H9.875V3.75Z"
                    fill="black"
                  />
                </svg>
                <p className="ml-2 text-[13px]">{questionsFile?.path}</p>
              </div>
            ) : null}
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {/* {errors.excelFile && errors.excelFile?.name.message} */}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Duration (minutes)</p>
            <input
              {...register('duration')}
              type="number"
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.duration && errors.duration.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">
              Questions to be shown to the student
            </p>
            <input
              {...register('amount')}
              type="number"
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.amount && errors.amount.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Question type</p>

            <div className="relative md:w-2/3 w-full">
              <select
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                {...register('type')}
                placeholder="">
                <option value="">Select an option</option>
                <option value="ca">CA</option>
                <option value="exam">Exam</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.type && errors.type.message}
            </span>
          </div>
          <div className="flex mt-12">
            <Button
              type="submit"
              onClick={() => null}
              hoverStyle={false}
              loading={loading}
              className="bg-primary mr-2 hover:bg-primary border-none hover:text-white rounded-[7px]">
              Submit
            </Button>
            <Button
              onClick={() => {
                setQuestionsFile(null);
                setUploadModal(false);
              }}
              type="button"
              variant="text"
              className="text-primary">
              Cancel
            </Button>
          </div>
        </form>
      </MainModal>
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl">My Courses</h3>
        <div className="flex mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>Manage Courses</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            {/* <Button type="button" onClick={() => setShowModal(true)}>
              Add Course
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
              data && data.data && data.data.length > 0 ? 10 : undefined
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

export default Courses;
