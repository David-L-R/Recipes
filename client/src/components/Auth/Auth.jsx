import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo, logout } from "../../services/auth/authSlice";

export const Auth = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log(error);
    if (error) {
      navigate("/login");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!user && !token) {
      navigate("/login");
    }

    if (!user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, navigate, user, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) return <div>loading...</div>;

  return (
    <>
      {/* <button onClick={handleLogout}>Logout</button> */}
      {children}
    </>
  );
};
