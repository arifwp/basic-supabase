import React from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

interface Props {
  children: React.ReactNode;
}

export default function UserRoute({ children }: Props) {
  const token = getCookie("userToken");
  const navigate = useNavigate();

  if (!token) {
    return (
      <div className="w-full max-w-md mx-auto h-screen p-12 gap-2 flex flex-col justify-center items-center">
        <img className="w-full" src="/assets/images/ill_secure.svg" />

        <p className="mt-4 text-xl md:text-2xl font-semibold text-center">
          Login terlebih dahulu
        </p>

        <ButtonPrimary
          className="!w-fit"
          variant="ghost"
          title="Login"
          onClick={() => navigate("/")}
        />
      </div>
    );
  }

  return children;
}
