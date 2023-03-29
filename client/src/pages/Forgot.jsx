import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { forgotPassword } from "../services/auth/authSlice";
import { Form } from "../components";
import { forgotPassword } from "../services/auth/authSlice";

export const ForgotPassword = () => {
  const { success, loading, token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const emailRef = useRef();

  const inputs = [
    {
      name: "email",
      label: "Email",
      type: "email",
      ref: emailRef,
    },
  ];

  useEffect(() => {
    // if (success || (user && token)) {
    // navigate("/dashboard");
    // }

    console.log("success", success);
  }, [success, user, token, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Forgot Password</h1>
      <Form inputs={inputs} action={forgotPassword} />
    </>
  );
};
