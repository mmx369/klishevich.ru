import React from 'react'
import useStyles from '../style'

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <p>This is some content in sticky footer</p>
    </div>
  )
}

export default Footer;