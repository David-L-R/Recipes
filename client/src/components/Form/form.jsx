import React from "react";

export const Form = () => {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "200px",
        gap: "10px",
        padding: "20px",
      }}
    >
      <label>Name</label>
      <input type='text' />
      <label>Email</label>
      <input type='email' />
      <label>PASSWORD</label>
      <input type='password' />
      <button type='submit'>Submit</button>
    </form>
  );
};
