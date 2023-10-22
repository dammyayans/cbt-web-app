import AnimatedContainer from "components/AnimatedContainer";
import Button from "components/Button";
import DashboardLayout from "components/Dashboard/Layout";
import API from "constants/api";
import validation from "constants/validation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useFetch from "use-http";

interface IFormValue {
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValue>({ resolver: validation.changeLPassword });
  const { patch: patchChangePassword, loading } = useFetch(API.changePassword);

  const onSubmit = async (data: IFormValue) => {
    try {
      const res = await patchChangePassword(data);
      if (res?.status === "success") {
        reset();
      }
    } catch (e) {
      toast.error(String(e));
    }
  };
  return (
    <DashboardLayout type="lec">
      <AnimatedContainer className="md:px-8 px-4 container mx-auto w-full mt-[85px]">
        <h3 className="font-bold text-3xl pt-8">Change Password</h3>
        <div className="rounded-[15px] p-[20px] md:p-[40px] mt-[40px] bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <p className="text-black mb-2 text-[18px]">Old Password</p>
              <input
                {...register("oldPassword")}
                type="password"
                className=" px-6 py-1 border bg-white border-border-gray rounded-[10px] outline-none w-full md:w-[50%]"
              />
              <span className="text-red-600 text-xs mb-2 pl-2 block">
                {errors.oldPassword && errors.oldPassword.message}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-black mb-2 text-[18px]">Password</p>
              <input
                {...register("password")}
                type="password"
                className=" px-6 py-1 border bg-white border-border-gray rounded-[10px] outline-none w-full md:w-[50%]"
              />
              <span className="text-red-600 text-xs mb-2 pl-2 block">
                {errors.password && errors.password.message}
              </span>
            </div>
            <div className="">
              <p className="text-black mb-2 text-[18px]">Confirm Password</p>
              <input
                {...register("confirmPassword")}
                type="password"
                className=" px-6 py-1 border bg-white border-border-gray rounded-[10px] outline-none w-full md:w-[50%]"
              />
              <span className="text-red-600 text-xs mb-2 pl-2 block">
                {errors.confirmPassword && errors.confirmPassword.message}
              </span>
            </div>
            <Button
              type="submit"
              onClick={() => null}
              loading={loading}
              className="mt-[60px]"
            >
              Save
            </Button>
          </form>
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
};

export default Settings;
