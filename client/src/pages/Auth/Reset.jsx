import React, { useEffect, useRef } from "react";
import { Form } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/auth/authSlice";
import { useSelector } from "react-redux";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { success } = useSelector((state) => state.auth);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const inputs = [
    {
      name: "password",
      label: "New password",
      type: "password",
      ref: passwordRef,
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      ref: confirmPasswordRef,
    },
    {
      name: "token",
      type: "hidden",
      ref: useRef(token),
      value: token,
    },
  ];

  useEffect(() => {
    console.log("success", success);
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <div>
      <h1>Reset Password</h1>
      <Form inputs={inputs} action={resetPassword} />;
    </div>
  );
};
