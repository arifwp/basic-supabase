import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title?: string;
  msg?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function PopupNotif({
  title = "Terjadi kesalahan",
  msg,
  isOpen,
  setIsOpen,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <DialogBackdrop
        className={"fixed inset-0 bg-black/60 backdrop-blur-sm"}
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-dark-secondary p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className={clsx(`text-base/7 font-medium text-white`, {
                "text-center": !msg,
              })}
            >
              {title}
            </DialogTitle>

            {msg && <p className="mt-2 text-sm/6 text-white/50">{msg}</p>}

            <div className="mt-4 flex justify-end">
              <Button
                className="px-4 py-2 bg-green-secondary hover:bg-green-primary rounded-lg text-dark-primary font-semibold cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Okay
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
