import React, { useState, useContext, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'
import Menu from '@material-ui/core/Menu'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginModal from './LoginModal'
import { AuthContext } from '../context/AuthContext'
import { MyDrawer } from './Drawer'
import LanguageSelect from './LangSelect'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    flex: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  menuButton: {
    marginRight: theme.spacing(1),
  },
}))


const AppBarUi = ({ userName }) => {

  const classes = useStyles();

  const auth = useContext(AuthContext)

  const { t } = useTranslation();

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
      setAnchorEl(null)
      history.push('/');
      setShowLogin(false)
    }
  };

  const handleSignOut = () => {
    auth.logout()
    setAnchorEl(null)
    history.push('/');
    setShowLogin(false)
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuCart = () => {
    history.push('/cart');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawerOn = () => {
    setStateLeft(true)
  }

  return (
    <>
      {showLogin && <LoginModal user={userName} />}
      <AppBar
        position='fixed'
      >
        <Toolbar
        >
          <IconButton
            onClick={toggleDrawerOn}
            className={classes.menuButton}
            edge='start'
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>

          <Typography
            variant='h6'
            className={classes.root}
          >
            {t('max_klishevich')}
          </Typography>

          <FormGroup>
            <FormControlLabel
              control={<Switch checked={auth.isAuthenticated} onChange={handleChange} aria-label='login switch' />}
              label={userName ? `${userName} ${t('logged_in')}` : `${t('login')}`}
            />
          </FormGroup>

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

          <Suspense fallback='...'>
            <div className='language-select'
            >
              <LanguageSelect />
            </div>
          </Suspense>

          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
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
            {(auth.isAuthenticated) ?

              <MenuItem
                onClick={handleSignOut}
              >
                {t('sign_out')}
              </MenuItem>
              :
              <MenuItem
                onClick={handleChange}
              >
                {t('sign_in')}
              </MenuItem>
            }
          </Menu>
        </Toolbar>
      </AppBar>
      <MyDrawer
        stateLeft={stateLeft}
        setStateLeft={setStateLeft}
        userName={userName} />
    </>
  )
}

export default AppBarUi
