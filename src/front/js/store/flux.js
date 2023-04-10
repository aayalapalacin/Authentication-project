const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
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
          const resp = await fetch(
            "https://3001-4geeksacade-reactflaskh-i9gmafulgze.ws-us93.gitpod.io/api/token",
            opts
          );
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
      getMessage: async () => {
        try {
          const store = getStore();
          const opts = {
            headers: {
              Authorization: "Bearer " + store.token,
            },
          };
          // fetching data from the backend
          const resp = await fetch(
            "https://3001-4geeksacade-reactflaskh-i9gmafulgze.ws-us93.gitpod.io/api/hello",
            opts
          );
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
