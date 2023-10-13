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
import { ReactComponent as AddFile } from "assets/icons/add-file.svg";
import { useDropzone } from "react-dropzone";

interface IFormValue {
  title: string;
}

const col = [
  {
    field: "title",
    use: "File title",
  },
  {
    field: "url",
    use: "Url",
  },
  {
    field: "action",
    use: "Action",
  },
];

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}
function copy(text) {
  const input = document.createElement("input");
  input.setAttribute("value", text);
  document.body.appendChild(input);
  input.select();
  const result = document.execCommand("copy");
  document.body.removeChild(input);
  toast.success("Copied successfully");
  return result;
}
const rowcheck = (row, column, display_value) => {
  if (column.field === "action") {
    return (
      <div className="flex">
        <Button
          onClick={() => {
            copy(row.url);
          }}
          className="py-1 rounded-[5px] text-xs px-[10px] border-0 text-blackk bg-lightblue mr-[15px]"
          hoverStyle={false}
        >
          copy url
        </Button>
      </div>
    );
  }

  if (column.field === "url") {
    return <p>{truncate(row.url, 40)}</p>;
  }

  return display_value;
};

const Images = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const {
    data,
    loading: gLoading,
    get,
  } = useFetch(
    API.myImages,
    { cachePolicy: CachePolicies.CACHE_AND_NETWORK },
    []
  );
  const { post: postImage, loading: uLoading } = useFetch(API.myImages);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValue>({ resolver: validation.addImageSchema });

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/png, image/jpeg",
    onDropAccepted: (res) => {
      setFile(res[0]);
    },
    onDropRejected: (files) => {
      files[0]?.errors.forEach((err) => {
        if (err.code === "file-invalid-type")
          toast.error("Invalid file format");
        else toast.error(err.message);
      });
    },
  });

  const handleUpload = async (dat: IFormValue) => {
    try {
      const formData = new FormData();
      formData.append("title", dat.title);
      formData.append("image", file);
      const res = await postImage(formData);
      if (res?.status.toLowerCase() === "success") {
        get();
        setFile(null);
        setShowModal(false);
        reset();
        navigate(screens.lecturerImages);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };
  return (
    <DashboardLayout type="lec">
      {/* upload image modal */}
      <MainModal isVisible={showModal} title="Upload an Image">
        <form onSubmit={handleSubmit(handleUpload)}>
          <div className="mb-[15px]">
            <p className="text-black mb-2 text-[13px]">File Title</p>
            <input
              {...register("title")}
              className="px-4 py-2 text-sm border bg-white border-border-gray rounded outline-none w-full"
            />
            <span className="text-red-600 text-xs mb-2 pl-2 block">
              {errors.title && errors.title.message}
            </span>
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
                setShowModal(false);
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
        <h3 className="font-bold text-3xl pt-8">Images</h3>
        <div className="flex mt-6 justify-between items-center">
          <div className="flex-auto w-1/2">
            <div className="relative">
              {/* <input
                placeholder="Search lecturer..."
                className="px-6 py-2 text-base border bg-white border-border-gray rounded-[10px] outline-none w-full"
              /> */}
              <p>Manage Images</p>
            </div>
          </div>
          <div className="flex-auto flex justify-end w-1/2">
            <Button
              hoverStyle={false}
              type="button"
              // className="text-blackk bg-lightblue border-lightblue"
              onClick={() => setShowModal(true)}
            >
              Upload an Image
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
              data && data.questionImages && data.questionImages.length > 0
                ? 10
                : undefined
            }
            rows={data && data.questionImages ? data.questionImages : []}
            styling={tableStyling}
            hovered
            row_render={rowcheck}
          />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Images;
