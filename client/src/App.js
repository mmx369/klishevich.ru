import React from 'react'
import AppBarUi from './components/AppBar'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Loader } from './components/Loader'
import Footer from './components/Footer'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { Grid } from '@material-ui/core'

const App = () => {

  const { token, login, logout, userId, userName, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes()

  if (!ready) {
    return <Loader />
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{
        token, login, logout, userId, userName, isAuthenticated
      }}>

        <Grid container direction='column'>
          <Grid item>
            <AppBarUi userName={userName} />
          </Grid>

          <Grid item container>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              {routes}
            </Grid>
          </Grid>
          <Grid item xs={false} sm={2} />

          <Grid item>
            <Footer />
          </Grid>
        </Grid>

      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App
