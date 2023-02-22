import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";
import { register } from "../features/auth/authSlice";

export const Register = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={(user) => dispatch(register(user))} />
    </div>
  );
};
