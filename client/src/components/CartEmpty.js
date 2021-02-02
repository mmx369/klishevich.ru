import React from 'react'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  button: {
    borderRadius: 13,
    boxShadow: "0 3px 2px 2px",
    padding: "0 10px",
    margin: 10
  },
})

export const CartEmpty = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const classes = useStyles()

  const handleGoShopping = () => history.push('/shop')

  return (
    <>
      <h1>{t('empty_cart')}</h1>
      <Button
        className={classes.button}
        variant='outlined'
        color='secondary'
        onClick={() => handleGoShopping()}
      >
        {t('go_shopping')}
      </Button>
    </>
  )
}