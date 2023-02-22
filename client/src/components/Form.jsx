import React, { useRef } from "react";

export const Form = ({ onSubmit }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    onSubmit({ email, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input ref={emailRef} />
      <label>Password</label>
      <input ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  );
};
