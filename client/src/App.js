import React from "react";
import { Container } from "@material-ui/core";
import AppBarUi from './components/AppBar'
import { useRoutes } from './routes'
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Loader } from "./components/Loader";

const App = () => {

  const { token, login, logout, userId, userName, ready } = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes()

  if (!ready) {
    return <Loader />
  }

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
