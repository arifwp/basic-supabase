import { Dispatch, SetStateAction, useState } from "react";
import ContainerModal from "./ContainerModal";
import ErrorText from "../texts/ErrorText";
import { useFormik } from "formik";
import * as yup from "yup";
import { supabase } from "../../libs/supabase";
import PopupNotif from "./PopupNotif";
import { ErrorInterface } from "../../constants/ErrorInterface";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const initialValues = {
  content: "",
};

export default function CreatePostModal({ isOpen, setIsOpen }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [msg, setMsg] = useState<ErrorInterface | undefined>(undefined);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      content: yup
        .string()
        .required("Konten postingan harus diisi")
        .max(255, "Tidak boleh melebihi 255 karakter"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const { data: user, error: authError } = await supabase.auth.getUser();

      setIsLoading(true);

      if (authError || !user?.user) {
        const err = authError?.message || "No user found";
        setMsg((prev) => ({
          ...prev,
          msg: err,
        }));
        setIsLoading(false);
        return setIsOpenPopup(true);
      }

      const { error } = await supabase.from("posts").insert([
        {
          user_id: user.user.id,
          content: values.content,
        },
      ]);

      if (error) {
        setIsLoading(false);
        setMsg((prev) => ({
          ...prev,
          msg: error.message,
        }));
        return setIsOpenPopup(true);
      }

      resetForm({ values: initialValues });
      setIsOpen(false);
      setIsLoading(false);
      setMsg({ title: "Berhasil menambahkan postingan", msg: undefined });
      return setIsOpenPopup(true);
    },
  });

  return (
    <>
      <ContainerModal
        title="Buat Postingan"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        onBtnSubmit={() => {
          formik.handleSubmit();
        }}
      >
        <textarea
          className="mt-4 !h-32 input-primary resize-y"
          name="content"
          onChange={formik.handleChange}
          value={formik.values.content}
        />
        {formik.touched.content && formik.errors.content && (
          <ErrorText msg={formik.errors.content} />
        )}
      </ContainerModal>

      <PopupNotif
        msg={msg?.msg}
        title={msg?.title}
        isOpen={isOpenPopup}
        setIsOpen={setIsOpenPopup}
      />
    </>
  );
}
