import React from "react"
import { Typography } from '@material-ui/core'
import useStyles from '../style'
import image_1 from '../components/img/IMG_0678.JPG'

export const AboutEng = () => {

  const classes = useStyles()

  return (
    <>
      <div className={classes.containerText}>
        <Typography
          className={classes.typo}
          align='center'
          color='primary'
          variant='h4'
        >
          About me
        </Typography>
        <p><strong>Maxim Klishevich</strong> is a famous scientist, Doctor of Theology and Philosophy of the Meister Eckhart International Academy of Theological and Philosophical Thought at Harvard University, author of the famous best-selling monograph “Theological and critical analysis of the doctrine of apocatastasis”, as well as more than 22 other scientific , journalistic and critical works.
      An internationally recognized expert in audit, soteriology and eschatology.</p>
        <p>Director of several drama performances, the singer is the owner of one of the most unique near-baritone in Russia, auditor, economist, collector (Owner of one of the largest collections of Coca-Cola cans on the Eurasian continent).</p>
        <p>Master of Sports in Backstroke and Colchis - Iberian Style. Participant of international tournaments in sports poker and chess.
      </p>
        <p><strong>Education:</strong> Faculty of Economics, Krasnoyarsk State University, Holy Trinity Orthodox Seminary.</p>
        <p>
          Founder of the Community of Friends of the Korean People.</p>
        <p>
          Recently, a novice programmer.
      </p>
        <br /><br /><br /><br />
      </div>
      <div className={classes.divRight}>
        <img src={image_1} className={classes.img} alt='' />
      </div>
    </>
  )
}
