"use client";

import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";

export const AuthToastCompoent = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

const AuthToast = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, isLoaded } = useUser();

  const notify = () => toast.error("You Need To Login First");

  return (
    <div onClick={() => !isSignedIn && isLoaded && notify()}>{children}</div>
  );
};

export default AuthToast;
