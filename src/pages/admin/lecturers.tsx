import { useState } from "react";
import AnimatedContainer from "components/AnimatedContainer";
import Button from "components/Button";
import DashboardLayout from "components/Dashboard/Layout";
import MainModal from "components/MainModal";
import departments from "constants/departments";
import faculties from "constants/faculties";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useFetch, { CachePolicies } from "use-http";
import API from "constants/api";
import validation from "constants/validation";
import { useNavigate } from "react-router";
import screens from "constants/screens";
import Table from "react-tailwind-table";
import tableStyling from "constants/tableStyling";
import Loader from "components/Loader";

interface IFormValue {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  faculty?: string;
}

const col = [
  {
    field: "firstName",
    use: "First Name",
  },
  {
    field: "lastName",
    use: "Last Name",
  },
  {
    field: "faculty",
    use: "Faculty",
  },
  {
    field: "department",
    use: "Department",
  },
  {
    field: "email",
    use: "Email",
  },
  {
    field: "phoneNumber",
    use: "Phone Number",
    use_in_search: false,
  },
];

const Lecturers = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [faculty, setFaculty] = useState("");
  const { post: postLeturer, loading } = useFetch(API.addLecturer);
  const {
    data,
    loading: gLoading,
    get,
  } = useFetch(
    API.getLecturers,
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValue>({ resolver: validation.addLecturerSchema });

  const onSubmit = async (data: IFormValue) => {
    try {
      const res = await postLeturer(data);
      if (res?.status.toLowerCase() === "success") {
        get();
        setShowModal(false);
        reset();
        navigate(screens.adminlecturers);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };

  return (
    <DashboardLayout type="admin">
      <MainModal isVisible={showModal} title="Add Lecturer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Firstname</p>
            <input
              {...register("firstName")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.firstName && errors.firstName.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Lastname</p>
            <input
              {...register("lastName")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.lastName && errors.lastName.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Phone Number</p>
            <input
              {...register("phoneNumber")}
              type="tel"
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.phoneNumber && errors.phoneNumber.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Email</p>
            <input
              {...register("email")}
              type="email"
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Faculty</p>

            <div className="relative md:w-2/3 w-full">
              <select
                {...register("faculty")}
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                placeholder=""
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option value="">Select an option</option>
                {faculties.map((e) => (
                  <option value={e} key={e}>
                    {e}
                  </option>
                ))}
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
              {errors.faculty && errors.faculty.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Department</p>

            <div className="relative md:w-2/3 w-full">
              <select
                {...register("department")}
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                placeholder=""
                // disabled={!faculty}
                onClick={() =>
                  !faculty ? toast.error("Please select a faculty") : null
                }
              >
                <option value="">Select an option</option>
                {faculty
                  ? departments[faculty].map((e) => (
                      <option value={e} key={e}>
                        {e}
                      </option>
                    ))
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
              {errors.department && errors.department.message}
            </span>
          </div>
          <div className="flex mt-12">
            <Button
              type="submit"
              onClick={() => null}
              loading={loading}
              className="bg-primary mr-7 hover:bg-primary border-none hover:text-white  rounded-[7px]"
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
        <h3 className="font-bold text-3xl pt-8">Lecturers</h3>
        <div className="flex mt-6 justify-between">
          <div className="flex-auto w-2/3">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>View and Add lecturer</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/3">
            <Button type="button" onClick={() => setShowModal(true)}>
              Add Lecturer
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
              data && data.lecturers && data.lecturers.length > 0
                ? 10
                : undefined
            }
            rows={data && data.lecturers ? data.lecturers : []}
            styling={tableStyling}
            hovered={true}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Lecturers;
