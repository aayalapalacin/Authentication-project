import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Router, Link } from "@reach/router";
import { Home } from "./pages/home";
import NotFound from "./pages/notFound";
import { Single } from "./pages/single";
import User from "./pages/user";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <Navbar />
      <Router>
        <Home path="/home" />
        <Login path="/" />
        <Signup path="/signup" />
        <User path="/user" />
        <Single path="/single/:theid" />
        <NotFound default />
      </Router>
    </div>
  );
};

export default injectContext(Layout);
