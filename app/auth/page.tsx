"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { SignInFlow } from "@/lib/types";
import { useState } from "react";

const AuthPage = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <>
      {state === "signIn" ? (
        <LoginForm setState={setState} />
      ) : (
        <RegisterForm setState={setState} />
      )}
    </>
  );
};

export default AuthPage;
