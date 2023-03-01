import React, { useRef } from "react";

export const Form = ({ onSubmit }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    onSubmit({ email, password, name });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input ref={nameRef} />
      <label>Email</label>
      <input ref={emailRef} />
      <label>Password</label>
      <input ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  );
};
