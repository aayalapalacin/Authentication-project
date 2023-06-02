const getState = ({ getStore, getActions, setStore }) => {
  let backend_url = process.env.BACKEND_URL;
  return {
    store: {
      token: null,
      user: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      login: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(backend_url + "/api/login", opts);
          if (resp.status !== 200) {
            alert("There has been an error");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend");
          localStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("there has been an error during  log in");
        }
      },
      signup: async (email, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        };
        try {
          const resp = await fetch(backend_url + "/api/signup", opts);
          if (resp.status !== 200) {
            alert("There has been an error");
            return false;
          }
          const data = await resp.json();
          console.log(data);

          return true;
        } catch (error) {
          console.error("there has been an error during signup");
        }
      },
      syncTokenFromLocalStorageStore: () => {
        const token = localStorage.getItem("token");
        console.log("aplication loaded");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },
      logout: () => {
        localStorage.removeItem("token");
        setStore({ token: null });
      },
    },
  };
};

export default getState;
