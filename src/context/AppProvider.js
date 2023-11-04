import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import { deleteLocalStorage, getLocalStorage } from "@/helpers/localStorage";

export default function Provider({ children }) {
  const [login, setLogin] = useState(true);
  useEffect(() => {
    setLogin(!!getLocalStorage("token"));
  }, []);

  const setLoginStatus = (value) => {
    if (value === false) {
      deleteLocalStorage("token");
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <AppContext.Provider value={{ isLogin: login, setLogin: setLoginStatus }}>
      {children}
    </AppContext.Provider>
  );
}
