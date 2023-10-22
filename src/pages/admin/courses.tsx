/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetch, { CachePolicies } from "use-http";
import { useNavigate } from "react-router";
import Table from "react-tailwind-table";

import validation from "constants/validation";
import AnimatedContainer from "components/AnimatedContainer";
import Button from "components/Button";
import DashboardLayout from "components/Dashboard/Layout";
import MainModal from "components/MainModal";
import API from "constants/api";
import screens from "constants/screens";
import tableStyling from "constants/tableStyling";
import Loader from "components/Loader";

interface IFormValue {
  courseCode?: string;
  courseTitle?: string;
  unit?: string;
  status?: string;
  lecturerID?: string;
}

const col = [
  {
    field: "courseCode",
    use: "Course Code",
  },
  {
    field: "courseTitle",
    use: "Course Title",
  },
  {
    field: "unit",
    use: "Unit",
    use_in_search: false,
  },
  {
    field: "status",
    use: "Status",
  },
  {
    field: "lecturer.firstName",
    use: "Lecturer",
  },
  {
    field: "lecturer.lastName",
    use: " ",
  },
  {
    field: "action",
    use: "Action",
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { post: postCourse, loading } = useFetch(API.addCourse);
  const {
    data,
    loading: gLoading,
    get,
  } = useFetch(
    API.getCourses,
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );
  const { data: allLecturers, loading: lLoading } = useFetch(
    `${API.getLecturers}?fields=firstName,lastName`,
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValue>({ resolver: validation.addCourseSchema });

  const onSubmit = async (formData: IFormValue) => {
    try {
      const res = await postCourse(formData);
      if (res?.status.toLowerCase() === "success") {
        get();
        setShowModal(false);
        reset();
        navigate(screens.adminCourses);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };

  const rowcheck = (
    row: any,
    column: { field: string },
    display_value: string
  ) => {
    if (column.field === "action") {
      return (
        <div className="flex justify-end">
          <Button
            onClick={() =>
              navigate(
                `results/${row.courseID}/${row.courseCode}/${row.courseTitle}`
              )
            }
            className="py-1 rounded-[5px] text-xs px-[10px] border-0 text-blackk bg-lightblue mr-[15px]"
            hoverStyle={false}
          >
            Results
          </Button>

          <Button
            onClick={() => navigate(row.courseID)}
            className="py-1 rounded-[5px] text-xs px-[10px] border-0 "
            hoverStyle={false}
          >
            More
          </Button>
        </div>
      );
    } else if (column.field === "courseCode") {
      return display_value.toUpperCase();
    }

    return display_value;
  };

  return (
    <DashboardLayout type="admin">
      <MainModal isVisible={showModal} title="Add Course">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Course Code</p>
            <input
              {...register("courseCode")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full uppercase"
              placeholder="CPE 565"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.courseCode && errors.courseCode.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Course Title</p>
            <input
              {...register("courseTitle")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
              placeholder="Introduction to Robotics"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.courseTitle && errors.courseTitle.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Course Unit</p>
            <input
              {...register("unit")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.unit && errors.unit.message}
            </span>
          </div>

          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Status</p>

            <div className="relative md:w-2/3 w-full">
              <select
                {...register("status")}
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                placeholder=""
              >
                <option value="">Select an option</option>
                <option value="C">C</option>
                <option value="R">R</option>
                <option value="E">E</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.status && errors.status.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Assign Lecturer</p>

            <div className="relative md:w-2/3 w-full">
              <select
                {...register("lecturerID")}
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                placeholder=""
                // disabled={!faculty}
              >
                <option value="">Select an option</option>
                {!lLoading
                  ? allLecturers && allLecturers.lecturers
                    ? allLecturers.lecturers.map((e: any) => (
                        <option value={e.uuid} key={e.uuid}>
                          {e.firstName} {e.lastName}
                        </option>
                      ))
                    : null
                  : null}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.lecturerID && errors.lecturerID.message}
            </span>
          </div>
          <div className="flex mt-12">
            <Button
              type="submit"
              hoverStyle={false}
              onClick={() => null}
              loading={loading}
              className="bg-primary mr-7 hover:bg-primary border-none hover:text-white rounded-none"
            >
              Add
            </Button>
            <Button
              onClick={() => setShowModal(false)}
              type="button"
              variant="text"
              className="text-primary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </MainModal>
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl pt-8">Courses</h3>
        <div className="flex flex-wrap mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>View and Add Course</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            <Button type="button" onClick={() => setShowModal(true)}>
              Add Course
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
              data && data.courses && data.courses.length > 0 ? 10 : undefined
            }
            rows={data && data.courses ? data.courses : []}
            styling={tableStyling}
            hovered
            row_render={rowcheck}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Courses;
