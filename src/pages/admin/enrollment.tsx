/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AnimatedContainer from "components/AnimatedContainer";
import Button from "components/Button";
import DashboardLayout from "components/Dashboard/Layout";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetch, { CachePolicies } from "use-http";
import API from "constants/api";
import validation from "constants/validation";
import Loader from "components/Loader";
import { ReactComponent as AddFile } from "assets/icons/add-file.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/download-icon.svg";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import MainModal from "components/MainModal";

interface IFormValue {
  excelFile: any;
  courseId?: string;
}

const Enrollment = () => {
  const [questionsFile, setEnrollmentFile] = useState<any>(null);
  const [courseId, setCourseId] = useState(null);

  const { post: postEnrollment, loading } = useFetch(
    API.enrollStudents(courseId)
  );
  const { data: allCourses, loading: cLoading } = useFetch(
    API.getCourses,
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );

  const options = !cLoading
    ? allCourses && allCourses.courses
      ? allCourses.courses.map(
          (c: { courseID: any; courseTitle: any; courseCode: any }) => ({
            value: c.courseID,
            label: `${c.courseTitle} - ${c.courseCode}`,
          })
        )
      : []
    : [];

  const {
    register,
    handleSubmit,
    // formState: {errors},
    reset,
  } = useForm<IFormValue>({ resolver: validation.enrollmentSchema });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    onDropAccepted: (res) => {
      setEnrollmentFile(res[0]);
    },
    onDropRejected: (files) => {
      // console.log(files);
      files[0]?.errors.forEach((err) => {
        if (err.code === "file-invalid-type")
          toast.error("Invalid file format");
        else toast.error(err.message);
      });
    },
  });

  const onSubmit = async () => {
    if (questionsFile) {
      if (courseId) {
        const formData = new FormData();
        formData.append("excelFile", questionsFile);
        try {
          const res = await postEnrollment(formData);
          if (res?.status.toLowerCase() === "success") {
            reset();
            setEnrollmentFile(null);
          }
        } catch (e) {
          toast.error(String(e));
        }
      } else toast.error("Please select a course");
    } else {
      toast.error("Please upload a file");
    }
  };

  return (
    <DashboardLayout type="admin">
      <MainModal title="" isVisible={cLoading}>
        <div className="flex justify-center items-center">
          <Loader className="text-primay h-5 w-5 m-0" />
        </div>
      </MainModal>
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl">Enrollmment</h3>
        <div className="flex mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>Register students for a course</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3"></div>
        </div>
        <div className="my-8 relative">
          <div className="flex justify-end">
            <a href="/enrollment.xlsx" target="_blank" download>
              <button className="flex items-center">
                <DownloadIcon />
                <p className="ml-[5px] text-primary text-[15px]">
                  Download format
                </p>
              </button>
            </a>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[15px]">
              <p className="text-black mb-2 text-[13px]">Courses</p>
              <Select
                isClearable
                className="block appearance-none bg-gray-200 border border-border-gray rounded w-full focus:outline-none text-sm"
                isSearchable
                name="courseId"
                placeholder="Select a course"
                onChange={(e: any) => setCourseId(e?.value)}
                // onInputChange={handleInputChange}
                options={options}
              />
              {/* <span className="text-red-600 text-xs mb-2 pl-2 block">
                {errors.courseId && errors.courseId.message}
              </span> */}
            </div>
            <div>
              <button
                type="button"
                {...getRootProps({
                  className:
                    "w-full grid place-items-center mt-5 py-10 border-primary bg-[#F5F6FF] mb-[27px]",
                  style: {
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  },
                })}
              >
                <input {...register("excelFile")} {...getInputProps()} />
                <AddFile />
                <p className="text-[13px] mt-[15px]">
                  Drag and drop or{" "}
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
                    xmlns="http://www.w3.org/2000/svg"
                  >
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

            <div className="flex mt-12">
              <Button
                type="submit"
                onClick={() => null}
                hoverStyle={false}
                loading={loading}
                className="bg-primary mr-2 hover:bg-primary border-none hover:text-white rounded-[7px]"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Enrollment;
