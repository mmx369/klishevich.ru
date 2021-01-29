import React from "react"
import GridList from './GridList'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import useStyles from '../style'

const Home = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <div>
      <Typography
        className={classes.typo}
        align='center'
        color='primary'
        variant='h4'
      >
        {t('max_klish')}
      </Typography>
      <GridList />
    </div>
  )
}
export default Home
