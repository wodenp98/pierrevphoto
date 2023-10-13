"use client";
import { signOut } from "next-auth/react";
import { CgLogOff } from "react-icons/cg";

export default function SignOutButton() {
  return (
    <CgLogOff
      className="text-3xl  text-red-500 cursor-pointer absolute bottom-[-5px] right-[-5px]"
      onClick={() => signOut()}
    />
  );
}
