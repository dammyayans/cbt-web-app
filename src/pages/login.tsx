import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

import screens from "constants/screens";
import API from "constants/api";
import validation from "constants/validation";
import { useUser } from "context/user-context";
import Layout from "components/Layout";
import useAuth from "context/auth-context";
import MainModal from "components/MainModal";
import Button from "components/Button";

interface IFormValue {
  matric: string;
  password: string;
}

const Login = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { authenticate, isAuth } = useAuth();
  const { user, setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({ resolver: validation.loginSchema });
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { post: postLogin, loading } = useFetch(API.login);

  const onSubmit = async (data: IFormValue) => {
    try {
      const res = await postLogin(data);
      if (res?.status === "success") {
        setRedirectToReferrer(true);
        await authenticate(res.token, "student", res.user);
        setUser(res.user);
      }
    } catch (e) {
      toast.error(String(e));
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (user && isAuth) {
      setRedirectToReferrer(true);
    }
  }, [user, isAuth]);

  useEffect(() => {
    if (params.name) {
      setModal(true);
    }
  }, [params]);

  if (redirectToReferrer === true) {
    return <Navigate to={screens.selectExam} />;
  }

  return (
    <Layout>
      <MainModal
        isVisible={modal}
        contentClassName="max-w-[420px]"
        title="Submitted"
      >
        <p className="mb-[39px]">
          {params?.name}, You have successfully submitted your {params?.type}.
          Kindly exit the hall.
        </p>
        <Button
          className="mx-auto"
          onClick={() => {
            navigate("/login");
            setModal(false);
          }}
        >
          CLOSE
        </Button>
      </MainModal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-4 md:pl-10 max-w-[417px]"
      >
        <div>
          <h1 className="font-bold text-black text-4xl">Login</h1>
          <p className="text-gray mt-2 mb-5 text-[18px]">
            login to your account and start your exam
          </p>
        </div>
        <div className="">
          <p className="text-black mb-2 text-[18px]">Matric No</p>
          <input
            {...register("matric")}
            className=" px-6 py-2 border bg-white border-border-gray rounded-[10px] outline-none w-full"
          />
        </div>
        <span className="text-red-600 text-xs mb-2 pl-2 block">
          {errors.matric && errors.matric.message}
        </span>
        <div className="relative mt-4">
          <p className="text-black mb-2 text-[18px]">Password</p>
          <input
            {...register("password")}
            className=" px-6 py-2 border bg-white border-border-gray rounded-[10px] outline-none w-full"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-4 bottom-3"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.29 11.098a.833.833 0 01-1.58-.528c-.017.05 0-.002 0-.002.03-.091.064-.181.103-.27.067-.158.165-.376.3-.635A9.193 9.193 0 013.446 7.77C4.725 6.378 6.813 5 10 5c3.188 0 5.276 1.378 6.551 2.77.681.747 1.233 1.6 1.634 2.528.033.079.058.142.075.189.006.013.023.1.04.183.015.077.028.15.033.163 0 0 .14.555-.57.79a.833.833 0 01-1.053-.523v-.005l-.012-.027a6.103 6.103 0 00-.287-.626 7.46 7.46 0 00-1.088-1.545c-1.017-1.109-2.678-2.23-5.323-2.23-2.645 0-4.307 1.121-5.324 2.23a7.461 7.461 0 00-1.325 2.041 3.684 3.684 0 00-.05.13l-.011.03z"
                fill="#5C5C5C"
              />
              <path
                d="M6.666 11.667a3.333 3.333 0 116.667 0 3.333 3.333 0 01-6.667 0z"
                fill="#5C5C5C"
              />
            </svg>
          </button>
        </div>
        <span className="text-red-600 text-xs mb-2 pl-2 block">
          {errors.password && errors.password.message}
        </span>
        <Button
          loading={loading}
          className="mt-14"
          onClick={() => null}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Layout>
  );
};

export default Login;
