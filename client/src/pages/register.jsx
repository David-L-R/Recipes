import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../components";

export const Register = () => {
  const { success, loading, token, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (success || (user && token)) {
      navigate("/dashboard");
    }
  }, [success, user, token, navigate]);

  if (loading) return <p>Loading...</p>;

  return <Form />;
};
