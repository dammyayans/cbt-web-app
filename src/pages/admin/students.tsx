import { useState } from "react";
import AnimatedContainer from "components/AnimatedContainer";
import Button from "components/Button";
import DashboardLayout from "components/Dashboard/Layout";
import MainModal from "components/MainModal";
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
import departments from "constants/departments";
import faculties from "constants/faculties";
import { ReactComponent as AddFile } from "assets/icons/add-file.svg";
import { ReactComponent as DownloadIcon } from "assets/icons/download-icon.svg";
import { useDropzone } from "react-dropzone";

interface IFormValue {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  department: string;
  faculty: string;
  level: string;
  matric: string;
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
    field: "matric",
    use: "Matric No",
  },
  {
    field: "level",
    use: "Level",
  },
  {
    field: "department",
    use: "Department",
  },
  {
    field: "faculty",
    use: "Faculty",
  },
  {
    field: "email",
    use: "Email",
  },
];

const Students = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [faculty, setFaculty] = useState("");
  const [file, setFile] = useState(null);
  const { post: postStudent, loading } = useFetch(API.addStudent);
  const {
    data,
    loading: gLoading,
    get,
  } = useFetch(
    API.getStudents,
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );
  const { post: postFile, loading: uLoading } = useFetch(API.uploadStudents);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValue>({ resolver: validation.addStudentSchema });

  const onSubmit = async (data: IFormValue) => {
    try {
      const res = await postStudent(data);
      if (res?.status.toLowerCase() === "success") {
        get();
        setShowModal(false);
        reset();
        navigate(screens.adminStudents);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    onDropAccepted: (res) => {
      setFile(res[0]);
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

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("excelFile", file);
      const res = await postFile(formData);
      if (res?.status.toLowerCase() === "success") {
        get();
        setFile(null);
        setUploadModal(false);
        reset();
        navigate(screens.adminStudents);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };
  return (
    <DashboardLayout type="admin">
      <MainModal isVisible={showModal} title="Add Student">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">First Name</p>
            <input
              {...register("firstName")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.firstName && errors.firstName.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Last Name</p>
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

          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Level</p>

            <div className="relative md:w-2/3 w-full">
              <select
                {...register("level")}
                className="block appearance-none bg-gray-200 border border-border-gray py-2 px-4 pr-8 rounded w-full focus:outline-none text-sm"
                id="grid-state"
                placeholder=""
              >
                <option value="">Select an option</option>
                <option value="100">100L</option>
                <option value="200">200L</option>
                <option value="300">300L</option>
                <option value="400">400L</option>
                <option value="500">500L</option>
                <option value="600">600L</option>
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
              {errors.level && errors.level.message}
            </span>
          </div>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">Matric No</p>
            <input
              {...register("matric")}
              className=" px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none md:w-2/3 w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.matric && errors.matric.message}
            </span>
          </div>
          <div className="flex mt-12">
            <Button
              type="submit"
              onClick={() => null}
              hoverStyle={false}
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
      {/* upload students modal */}
      <MainModal isVisible={uploadModal} title="Upload Students">
        <div className="flex justify-end">
          <a href="/students.xlsx" target="_blank" download>
            <button className="flex items-center">
              <DownloadIcon />
              <p className="ml-[5px] text-primary text-[15px]">
                Download format
              </p>
            </button>
          </a>
        </div>
        <form onSubmit={handleUpload}>
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
              <input {...getInputProps()} />
              <AddFile />
              <p className="text-[13px] mt-[15px]">
                Drag and drop or{" "}
                <span className="text-primary underline">browse</span> your
                files
              </p>
            </button>
            {file ? (
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
                <p className="ml-2 text-[13px]">{file?.path}</p>
              </div>
            ) : null}
          </div>
          <div className="flex mt-12">
            <Button
              type="submit"
              onClick={() => null}
              hoverStyle={false}
              loading={uLoading}
              className="bg-primary mr-2 hover:bg-primary border-none hover:text-white rounded-[7px]"
            >
              Upload
            </Button>
            <Button
              onClick={() => {
                setFile(null);
                setUploadModal(false);
              }}
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
        <h3 className="font-bold text-3xl pt-8">Students</h3>
        <div className="flex mt-6 justify-between items-center">
          <div className="flex-auto w-1/2">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>Manage Students</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/2">
            <Button
              type="button"
              className="mr-2"
              hoverStyle={false}
              onClick={() => setShowModal(true)}
            >
              Add Student
            </Button>

            <Button
              hoverStyle={false}
              type="button"
              className="text-blackk bg-lightblue border-lightblue"
              onClick={() => setUploadModal(true)}
            >
              Upload Students
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
              data && data.students && data.students.length > 0 ? 10 : undefined
            }
            rows={data && data.students ? data.students : []}
            styling={tableStyling}
            hovered={true}
            // row_render={rowcheck}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Students;
