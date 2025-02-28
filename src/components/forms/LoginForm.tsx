import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { supabase } from "../../libs/supabase";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ForgotPasswordModal from "../modals/ForgotPasswordModal";
import PopupNotif from "../modals/PopupNotif";
import ErrorText from "../texts/ErrorText";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email harus diisi")
        .email("Gunakan format email yang benar"),
      password: yup.string().required("Password harus diisi"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      const email = values.email;
      const password = values.password;
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        setMsg(error.message);
        return setIsOpen(true);
      }

      navigate("/posts");
      return;
    },
  });

  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <h1 className="text-2xl font-semibold text-center">Welcome Back!</h1>

        <div className="w-full flex flex-col">
          <label className="text-sm">Email</label>
          <input
            className="w-full mt-2 input-primary"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <ErrorText msg={formik.errors.email} />
          )}

          <label className="mt-8 text-sm">Password</label>
          <input
            className="w-full mt-2 input-primary"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorText msg={formik.errors.password} />
          )}

          <p
            className="text-gray-300 mt-2 text-sm flex justify-end cursor-pointer"
            onClick={() => setIsOpenModal(true)}
          >
            Lupa password?
          </p>

          <ButtonPrimary
            className="mt-8"
            type="submit"
            title="Log In"
            isLoading={isLoading}
          />
        </div>
      </form>

      <PopupNotif isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />

      <ForgotPasswordModal isOpen={isOpenModal} setIsOpen={setIsOpen} />
    </>
  );
}
