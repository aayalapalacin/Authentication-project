import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Register from "./register";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>Sign Up/ Log in</h1>

      <Register />
      {/* <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div> */}
    </div>
  );
};
