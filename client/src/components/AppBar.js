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
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import { Link, useHistory } from "react-router-dom";
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import LoginModal from './LoginModal'
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux'
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

  const [authSwitch, setAuthSwitch] = useState({ checked: (userName) ? false : true });
  const [showLogin, setShowLogin] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateLeft, setStateLeft] = React.useState(false);
  const history = useHistory()
  const open = Boolean(anchorEl);

  const cart = useSelector(state => state.cartR) || []

  const handleChange = () => {
    if (!authSwitch.checked) {
      console.log('checked');
      setShowLogin(true)
      setAuthSwitch({ checked: true })
    } else {
      console.log('unchecked');
      auth.logout()
      setAuthSwitch({ checked: false })
      setShowLogin(false)
    }
  };

  const handleSignOut = () => {
    auth.logout()
    setAuthSwitch({ checked: false })
    setShowLogin(false)
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
    console.log('open drawer')
    setStateLeft(true)
  }

  if (userName === 'maximus') {
    return (
      <div className={classes.root}>
        {showLogin && <LoginModal user={userName} />}
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={authSwitch.checked} onChange={handleChange} aria-label="login switch" />}
            label={userName ? `${userName} logged in` : 'Login'}
          />
        </FormGroup>
        <MyDrawer stateLeft={stateLeft} setStateLeft={setStateLeft} userName={userName} />
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
            <Button color="inherit" component={Link} to="/">
              Home
          </Button>
            <Button color="inherit" component={Link} to="/about">
              About
          </Button>
            <Button color="inherit" component={Link} to="/shop">
              Shop
            </Button>

            <Button color="inherit" component={Link} to="/blog">
              Blog
          </Button>
            < Button color="inherit" component={Link} to="/_addingItem">
              add item to shop
                </Button>
            < Button color="inherit" component={Link} to="/_addingNewBlog">
              add new blog
                </Button>

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

  return (
    <div className={classes.root}>
      {showLogin && <LoginModal user={userName} />}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={authSwitch.checked} onChange={handleChange} aria-label="login switch" />}
          label={userName ? `${userName} logged in` : 'Login'}
        />
      </FormGroup>
      <MyDrawer stateLeft={stateLeft} setStateLeft={setStateLeft} userName={userName} />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawerOn}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            Shop
            </Button>

          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>

          {window.localStorage.getItem('cart') && (
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
