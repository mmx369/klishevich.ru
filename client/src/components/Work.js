import React from "react"
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginTop: 70,
    padding: 5,
  },
})

const WorkEng = () => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography
        align='left'
        variant='h4'
      >
        JavaScript, React, Node.js
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
        className={classes.root}
        align='left'
        variant='h4'
      >
        JavaScript, React, Node.js
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
    <div>
      { (language === 'en' ? <WorkEng /> : <WorkRu />)}
    </div >
  )
}

export default Work
