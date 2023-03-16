import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../services/auth/authSlice";

export const Form = ({ isLoginPage }) => {
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isLoginPage) {
      console.log("login");
      return dispatch(login({ email, password }));
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{isLoginPage ? "Login" : "Register"}</h1>
      {error && <p>{message}</p>}
      {!isLoginPage && (
        <>
          <label>Name</label>
          <input type='text' ref={nameRef} />
        </>
      )}
      <label>Email</label>
      <input type='email' ref={emailRef} />
      <label>Password</label>
      <input type='password' ref={passwordRef} />
      <button type='submit'>Submit</button>
    </form>
  );
};
