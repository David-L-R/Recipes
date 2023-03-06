import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AuthWrapper = ({ children }) => {
//   const user = useSelector((state) => state.auth.user);
  const { token, loading } = useSelector(state => stat.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !loading) {
      navigate("/login");
    }
  }, [token, loading]);
  
  /*
  
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
  
  */
  
  if (loading) return (
    <span class="loader"></span>
  )

  return <div>{children}</div>;
};
