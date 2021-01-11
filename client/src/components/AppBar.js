import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import Menu from '@material-ui/core/Menu';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import LoginModal from './LoginModal'
import { AuthContext } from '../context/AuthContext';
import { MyDrawer } from './Drawer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBarUi = ({ userName }) => {

  const classes = useStyles();

  const auth = useContext(AuthContext)

  const [showLogin, setShowLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateLeft, setStateLeft] = React.useState(false);
  const history = useHistory()
  const open = Boolean(anchorEl);

  const cart = useSelector(state => state.cartR) || []

  const handleChange = () => {
    if (!auth.isAuthenticated) {
      setShowLogin(true)
    } else {
      auth.logout()
    }
  };

  const handleSignOut = () => {
    auth.logout()
    setAnchorEl(null)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuCart = () => {
    history.push("/cart");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawerOn = () => {
    setStateLeft(true)
  }

  return (
    <div className={classes.root}>
      {showLogin && <LoginModal user={userName} />}

      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth.isAuthenticated} onChange={handleChange} aria-label="login switch" />}
          label={userName ? `${userName} logged in` : 'Login'}
        />
      </FormGroup>

      <MyDrawer
        stateLeft={stateLeft}
        setStateLeft={setStateLeft}
        userName={userName} />

      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawerOn}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            ~ Max Klishevich ~
          </Typography>

          {!!cart.length && (
            <div>
              <IconButton
                color='inherit'
                onClick={handleMenuCart}
              >
                <ShoppingCartRoundedIcon />
              </IconButton>
            </div>
          )}

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppBarUi
