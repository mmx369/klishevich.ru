import React from "react"
import { useSelector } from 'react-redux'
import useStyles from '../style'
import { Typography } from '@material-ui/core'

const WorkEng = () => {

  const classes = useStyles()

  return (
    <div>
      <Typography
        className={classes.typo}
        align='left'
        color='primary'
        variant='h4'
      >
        JavaScript, React, Node.js Dev
        </Typography>

      <Typography
        align='left'
        variant='subtitle1'>
        Development of frontend with React (Redux, TypeScript, Material-UI).
        </Typography>

      <Typography
        align='left'
        variant='subtitle1'>
        Development of backend with Node.js (Express, MongoDB).
        </Typography>
    </div >
  )
}

const WorkRu = () => {

  const classes = useStyles()

  return (
    <div>
      <Typography
        className={classes.typo}
        color='primary'
        align='left'
        variant='h4'
      >
        JavaScript, React, Node.js Dev
        </Typography>

      <Typography
        align='left'
        variant='subtitle1'>
        Фронтэнд разработка на React (Redux, TypeScript, Material-UI).
</Typography>

      <Typography
        align='left'
        variant='subtitle1'>
        Бэкэнд разработка на Node.js (Express, MongoDB).
        </Typography>
    </div >
  )
}

const Work = () => {

  const language = useSelector((state) => state.langR)

  return (
    <div style={{ marginBottom: '600px' }}>
      { (language === 'en' ? <WorkEng /> : <WorkRu />)}
    </div >
  )
}

export default Work
