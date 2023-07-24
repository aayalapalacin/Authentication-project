import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

function User() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getUser();
  }, []);
  return <div>User</div>;
}

export default User;
