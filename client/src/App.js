import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import AppBarUi from './components/AppBar'
import blogService from './services/blog'
import { useRoutes } from './routes'
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

const App = () => {

  const { token, login, logout, userId, userName } = useAuth()

  const isAuthenticated = !!token

  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedUser");
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON);
  //     setUser(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  const routes = useRoutes()

  return (
    <>
      <AuthContext.Provider value={{
        token, login, logout, userId, userName, isAuthenticated
      }}>
        <AppBarUi userName={userName} />
        <Container>
          {routes}
        </Container>
      </AuthContext.Provider>
    </>
  );
};

export default App
