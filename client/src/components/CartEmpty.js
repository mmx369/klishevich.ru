import React from 'react'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import useStyles from '../style'

export const CartEmpty = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const classes = useStyles()

  const handleGoShopping = () => history.push('/shop')

  return (
    <>
      <h1>{t('empty_cart')}</h1>
      <Button
        className={classes.buttonMain}
        variant='outlined'
        color='primary'
        onClick={() => handleGoShopping()}
      >
        {t('go_shopping')}
      </Button>
    </>
  )
}