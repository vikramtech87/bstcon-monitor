import { SignUp } from "@clerk/nextjs";

import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
