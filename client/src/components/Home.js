import React from "react"
import GridList from './GridList'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 65
  },
}))

const Home = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        variant='h4'
      >
        {t('max_klish')}
      </Typography>
      <GridList />
    </div>
  )
}
export default Home
