"use client";

import { SignUpButton, UserButton, useSession, useUser } from "@clerk/nextjs";
import { IconButton } from "@radix-ui/themes";
import { FaGoogle } from "react-icons/fa";
import { default as S } from "react-loading-skeleton";

const AuthStatus = () => {
  const { isSignedIn, isLoaded } = useSession();
  if (!isLoaded) return <Skeleton />;
  return isSignedIn ? <UserButton /> : <Sign />;
};

const Sign = () => {
  return (
    <SignUpButton mode="modal">
      <IconButton className="!bg-transparent " aria-label="signup">
        <FaGoogle size="25" />
      </IconButton>
    </SignUpButton>
  );
};

const Skeleton = () => {
  return (
    <S
      circle
      width="2rem"
      height="2rem "
      baseColor="var(--loading-avatar-base)"
      highlightColor="var(--loading-avatar-highlight)"
    />
  );
};

export default AuthStatus;
