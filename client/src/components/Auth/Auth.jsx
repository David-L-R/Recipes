import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth/authSlice";

export const Auth = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [navigate, user, token]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </>
  );
};
