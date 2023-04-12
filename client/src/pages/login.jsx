import React, { useEffect, useRef } from "react";
import { Form } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth/authSlice";

export const Login = () => {
  const { success, loading, token, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const inputs = [
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
    if (user && token) {
      navigate("/dashboard");
    }
  }, [success, user, token, navigate]);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <h1>Login</h1>

      <Form inputs={inputs} action={login} />
      <p>
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
      <Link to='/forgot-password'>Forgot your password?</Link>
    </>
  );
};
