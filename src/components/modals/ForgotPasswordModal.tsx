import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { supabase } from "../../libs/supabase";
import ErrorText from "../texts/ErrorText";
import ContainerModal from "./ContainerModal";
import PopupNotif from "./PopupNotif";

export default function ForgotPasswordModal() {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email harus diisi")
        .email("Gunakan format email yang benar"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { error: errorSendLink } =
        await supabase.auth.resetPasswordForEmail(values.email, {
          redirectTo: `${import.meta.env.VITE_FRONTEND_URL}/reset-password`,
        });

      if (errorSendLink) {
        formik.setErrors({ email: errorSendLink.message });
        return;
      }

      resetForm({ values: { email: "" } });
      setIsOpenPopup(true);
      return;
    },
  });

  return (
    <>
      <p
        className="text-gray-300 mt-2 text-sm flex justify-end cursor-pointer"
        onClick={() => setIsOpenModal(true)}
      >
        Lupa password?
      </p>

      <ContainerModal
        title="Gausah Khawatir"
        msg="Kami bakalan ngirim link reset password ke email kamu"
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        onBtnSubmit={() => {
          formik.handleSubmit();
        }}
      >
        <label className="text-sm">Email</label>
        <input
          className="mt-2 input-primary"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorText msg={formik.errors.email} />
        )}
      </ContainerModal>

      <PopupNotif
        title="Kami telah mengirimkan tautan reset password ke email kamu"
        isOpen={isOpenPopup}
        setIsOpen={setIsOpenPopup}
      />
    </>
  );
}
