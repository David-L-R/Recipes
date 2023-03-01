import React, { useRef } from "react";

export const Form = ({ onSubmit, nameIncluded }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef?.current?.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    onSubmit({ email, password, ...(nameIncluded && name) });
  };
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        gap: "5px",
        padding: "20px",
      }}
    >
      {nameIncluded && (
        <>
          <label>Name</label>
          <input ref={nameRef} />
        </>
      )}
      <label>Email</label>
      <input ref={emailRef} />
      <label>Password</label>
      <input ref={passwordRef} />
      <button type='submit' style={{ marginTop: "10px", padding: "10px" }}>
        Submit
      </button>
    </form>
  );
};
