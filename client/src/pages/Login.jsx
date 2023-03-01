import React from "react";
import { Form } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { AuthWrapper } from "../components/authWrapper";

export const Login = () => {
  const dispatch = useDispatch();
  return (
    <AuthWrapper>
      <h1>Login</h1>
      <Form onSubmit={(user) => dispatch(login(user))} />
    </AuthWrapper>
  );
};
