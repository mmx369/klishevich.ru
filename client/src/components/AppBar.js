import React, { useState, useContext, Suspense } from 'react'
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
import useStyles from '../style'

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
    <div>
      {showLogin && <LoginModal user={userName} />}
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth.isAuthenticated} onChange={handleChange} aria-label='login switch' />}
          label={userName ? `${userName} ${t('logged_in')}` : `${t('login')}`}
        />
      </FormGroup>
      <MyDrawer
        stateLeft={stateLeft}
        setStateLeft={setStateLeft}
        userName={userName} />
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            onClick={toggleDrawerOn}
            edge='start'
            color='inherit'
            aria-label='menu'>
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            {t('max_klishevich')}
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
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={auth.isAuthenticated} onChange={handleChange} aria-label='login switch' />}
              label={userName ? `${userName} ${t('logged_in')}` : `${t('login')}`}
            />
          </FormGroup>
          <Suspense fallback='...'>
            <div className='language-select'>
              <LanguageSelect />
            </div>
          </Suspense>
          <div>
            <IconButton
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
              <MenuItem onClick={handleSignOut}>{t('sign_out')}</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div >
  )
}

export default AppBarUi
