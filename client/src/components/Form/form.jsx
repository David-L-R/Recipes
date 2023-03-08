import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../services/auth/authSlice";

export const Form = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type='text' ref={nameRef} />
      <label>Email</label>
      <input type='email' ref={emailRef} />
      <label>PASSWORD</label>
      <input type='password' ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  );
};
