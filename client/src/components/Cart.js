import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { CartEmpty } from './CartEmpty'
import { CartTable } from './CartTable'
import { initItems } from '../reducers/cartReducer'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginTop: 65,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    borderRadius: 13,
    boxShadow: "0 3px 2px 2px",
    padding: "0 10px",
    margin: 10
  },
  buttonsDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export const Cart = () => {
  let history = useHistory();
  const { t } = useTranslation()
  const classes = useStyles()

  const handleClick = () => history.push('/checkout')
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initItems())
  }, [dispatch]);

  const handleClearCart = () => {
    window.localStorage.removeItem('cart')
    window.location.reload()
  }

  const isCartEmpty = !window.localStorage.getItem('cart')

  return (
    <div className={classes.root}>

      {isCartEmpty && <CartEmpty />}
      {isCartEmpty || <CartTable />}

      {isCartEmpty ||
        <div className={classes.buttonsDiv}>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={() => handleClearCart()}>
            {t('clear_cart')}
          </Button>
          <Button
            className={classes.button}
            variant='outlined'
            color='secondary'
            onClick={handleClick}>
            {t('check_out')}
          </Button>
        </div>
      }
    </div>
  )
}
