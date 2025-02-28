import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { supabase } from "../../libs/supabase";
import PopupNotif from "../modals/PopupNotif";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ErrorText from "../texts/ErrorText";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Nama harus diisi")
        .max(255, "Tidak boleh melebihi 255 karakter"),
      email: yup
        .string()
        .required("Email harus diisi")
        .email("Gunakan format email yang benar")
        .max(255, "Tidak boleh melebihi 255 karakter"),
      password: yup
        .string()
        .required("Password harus diisi")
        .min(6, "Password minimal harus 6 karakter"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const email = values.email;
      const password = values.password;
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setMsg(error.message);
        setIsLoading(false);
        return setIsOpen(true);
      }

      if (!data || !data.user) {
        setIsLoading(false);
        return setIsOpen(true);
      }

      const user = data.user;
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          { id: user?.id, name: values.name, email: values.email, role: 1 },
        ]);

      if (profileError) {
        setMsg(profileError.message);
        setIsLoading(false);
        return setIsOpen(true);
      }

      setIsLoading(false);
      resetForm({ values: initialValues });
      return;
    },
  });

  return (
    <>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <div className="w-full mt-8 flex flex-col">
          <label className="text-sm">Name</label>
          <input
            className="w-full mt-2 input-primary"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <ErrorText msg={formik.errors.name} />
          )}

          <label className="mt-8 text-sm">Email</label>
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

          <ButtonPrimary
            className="mt-8"
            type="submit"
            title="Create Account"
            isLoading={isLoading}
          />
        </div>
      </form>

      <PopupNotif isOpen={isOpen} setIsOpen={setIsOpen} msg={msg} />
    </>
  );
}
