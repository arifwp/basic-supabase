import { useState } from "react";
import CreatePostModal from "../modals/CreatePostModal";

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="p-2 rounded-full bg-green-primary text-white font-semibold absolute mb-12 bottom-0 right-0"
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
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>

      <CreatePostModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
