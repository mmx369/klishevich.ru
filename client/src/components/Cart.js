import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { CartEmpty } from './CartEmpty'
import { CartTable } from './CartTable'
import { initItems } from '../reducers/cartReducer'
import useStyles from '../style'

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
    <div className={classes.container}>

      {isCartEmpty && <CartEmpty />}
      {isCartEmpty || <CartTable />}

      {isCartEmpty ||
        <div>
          <Button
            className={classes.buttonMain}
            variant='outlined'
            color='primary'
            onClick={() => handleClearCart()}>
            {t('clear_cart')}
          </Button>
          <Button
            className={classes.buttonMain}
            variant='outlined'
            color='primary'
            onClick={handleClick}>
            {t('check_out')}
          </Button>
        </div>
      }
    </div>
  )
}
