import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Auth } from "./components/Auth/Auth";
import { ForgotPassword } from "./pages/Forgot";
import { Success } from "./pages/Success";
import { ResetPassword } from "./pages/Reset";
import { ChakraProvider } from "@chakra-ui/react";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      // HOC Higher Order Component is an alternative
      <Auth>
        <Dashboard />
      </Auth>
    ),
  },
]);

root.render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
