import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import useStyles from '../style'

const Footer = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [showEmail, setShowEmail] = useState(false)

  const show = () => setShowEmail(true)

  const Email = () => (<a href="mailto:info@klishevich.com">info@klishevich.com</a>)

  return (
    <div className={classes.footer}>
      &copy; {new Date().getFullYear()} Copyright: <a href="https://www.klishevich.com" className={classes.a}> {t('max_klishevich')} </a>
      &nbsp; &nbsp; { (!showEmail) ? <Button variant='outlined' onClick={() => show()}>{t('show_email')}</Button> : <Email />}
    </div >
  )
}

export default Footer;