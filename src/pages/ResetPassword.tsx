import * as yup from "yup";
import ErrorText from "../components/texts/ErrorText";
import { useFormik } from "formik";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { useState } from "react";
import { supabase } from "../libs/supabase";
import PopupNotif from "../components/modals/PopupNotif";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required("Password baru harus diisi")
        .min(6, "Password minimal harus 6 karakter"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        formik.setErrors({ password: error.message });
        return;
      }

      setIsLoading(false);
      setIsOpen(true);
      navigate("/");
      return;
    },
  });

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto p-8 rounded-lg flex flex-col bg-dark-secondary">
          <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
          <h3 className="text-lg text-center text-gray-400">
            Set your new password to your account
          </h3>

          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div className="w-full mt-4 flex flex-col">
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

              <ButtonPrimary
                className="mt-8"
                type="submit"
                title="Submit"
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>

      <PopupNotif
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Berhasil reset password"
      />
    </>
  );
}
