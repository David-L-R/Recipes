import React, { useEffect } from "react";
import { Form } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { success, loading, token, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (success || (user && token)) {
      navigate("/dashboard");
    }
  }, [success, user, token, navigate]);

  if (loading) return <p>Loading...</p>;
  return <Form isLoginPage={true} />;
};
