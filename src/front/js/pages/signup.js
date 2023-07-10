import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { navigate } from "@reach/router";

import "../../styles/home.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    actions.signup(name, email, password);
  };
  //   if (store.token && store.token != "" && store.token != undefined) {
  //     navigate("/home");
  //   }

  return (
    <div className="text-center mt-5">
      <h1>Signup</h1>

      <div>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>Signup</button>
      </div>
    </div>
  );
};
