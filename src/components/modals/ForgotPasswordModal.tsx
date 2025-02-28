import { useFormik } from "formik";
import ContainerModal from "./ContainerModal";
import * as yup from "yup";
import ErrorText from "../texts/ErrorText";
import { supabase } from "../../libs/supabase";
import PopupNotif from "./PopupNotif";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ForgotPasswordModal({ isOpen, setIsOpen }: Props) {
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

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
      <ContainerModal
        title="Gausah Khawatir"
        msg="Kami bakalan ngirim link reset password ke email kamu"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
