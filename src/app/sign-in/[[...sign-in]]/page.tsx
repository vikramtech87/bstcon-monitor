import { SignIn } from "@clerk/nextjs";
import React from "react";

const SingInPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <SignIn />
    </div>
  );
};

export default SingInPage;
