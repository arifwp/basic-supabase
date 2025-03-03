import { useState } from "react";
import ContainerModal from "../modals/ContainerModal";
import { supabase } from "../../libs/supabase";
import PopupNotif from "../modals/PopupNotif";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "typescript-cookie";

export default function ButtonLogout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const navigate = useNavigate();

  const logout = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setIsLoading(false);
      setMsg(error.message);
      return setIsOpenPopup(true);
    }

    removeCookie("userToken");

    return navigate("/");
  };

  return (
    <>
      <button
        className="p-2 rounded-full bg-red-400 text-white font-semibold"
        onClick={() => setIsOpen(true)}
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
          />
        </svg>
      </button>

      <ContainerModal
        title="Anda yakin ingin keluar?"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        btnText="Logout"
        isLoading={isLoading}
        onBtnSubmit={() => {
          logout();
        }}
      ></ContainerModal>

      <PopupNotif isOpen={isOpenPopup} setIsOpen={setIsOpenPopup} msg={msg} />
    </>
  );
}
