import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: '1rem'
  },
  a: {
    textDecoration: 'none'
  }
}))

const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [showEmail, setShowEmail] = useState(false)

  const show = () => setShowEmail(true)

  const Email = () => (<a href="mailto:info@klishevich.com" className={classes.a}>info@klishevich.com</a>)

  return (
    <div className={classes.root}>
      &copy; {new Date().getFullYear()} Copyright:&nbsp; <a href="https://www.klishevich.com" className={classes.a}> {t('max_klishevich')} </a>
      &nbsp; &nbsp; { (!showEmail) ? <Button size='small' variant='text' onClick={() => show()}>{t('show_email')}</Button> : <Email />}
    </div >
  )
}

export default Footer;