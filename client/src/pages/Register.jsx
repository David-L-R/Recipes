import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";
import { register } from "../features/auth/authSlice";

export const Register = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate, user]);

  return (
    <div>
      <h1>Register</h1>
      <Form onSubmit={(user) => dispatch(register(user))} nameIncluded />
    </div>
  );
};
