import React from 'react'
import AppBarUi from './components/AppBar'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import Footer from './components/Footer'
import useStyles from './style'

const App = () => {

  const { token, login, logout, userId, userName, ready } = useAuth()
  const isAuthenticated = !!token
  const classes = useStyles()
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
        <div className={classes.containerMain} style={{ border: 'dotted' }}>
          {routes}
        </div>
        <Footer />
      </AuthContext.Provider>
    </>
  );
};

export default App
