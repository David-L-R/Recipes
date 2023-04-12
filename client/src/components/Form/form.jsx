import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const Form = ({ inputs, action, optinalValues }) => {
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = { ...optinalValues };
    inputs.forEach((input) => {
      values[input.name] = input.ref.current.value;
    });

    dispatch(action(values));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{message}</p>}
      {inputs.map((input) => (
        <>
          <label htmlFor={input.name}>{input.label}</label>
          <input
            name={input.name}
            type={input.type}
            ref={input.ref}
            value={input.value}
          />
        </>
      ))}
      <button type='submit'>Submit</button>
    </form>
  );
};
