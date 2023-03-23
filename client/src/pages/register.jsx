import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../components";
import { register } from "../services/auth/authSlice";

export const Register = () => {
  const { success, loading, token, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const inputs = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      ref: nameRef,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      ref: emailRef,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      ref: passwordRef,
    },
  ];

  useEffect(() => {
    if (success || (user && token)) {
      navigate("/dashboard");
    }
  }, [success, user, token, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Register</h1>
      <Form inputs={inputs} action={register} />;
      <p>
        Have an account? <Link to='/login'>Login</Link>
      </p>
    </>
  );
};
