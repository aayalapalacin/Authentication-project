import React, { useContext } from "react";
import { Link } from "@reach/router";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <Link to="/">
              <button className="btn btn-primary">log in</button>
            </Link>
          ) : (
            <button
              onClick={() => actions.logout()}
              className="btn btn-primary"
            >
              log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
