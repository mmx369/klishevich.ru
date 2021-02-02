import React from "react"
import { Typography } from '@material-ui/core'
import image_1 from '../components/img/IMG_0678.JPG'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({

  divLeft: {
    margin: 0,
    marginTop: 65,
    padding: 5,
    justifyContent: 'space-around',
    float: 'left',
    width: '70%',
    boxSizing: 'border-box',
    textAlign: 'justify'
  },

  divRight: {
    float: 'right',
    marginTop: 115,
    width: '30%',
    boxSizing: 'border-box',
  },
  img: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 35,
    marginTop: 13,
    paddingRight: 0
  },
}))

export const AboutRu = () => {

  const classes = useStyles()

  return (
    <>
      <div className={classes.divLeft}>
        <Typography
          align='center'
          variant='h4'
        >
          Биография
        </Typography>
        <p><strong>Максим Клишевич</strong> – известный ученый, доктор богословия и философии Международной академии богословско-философской мысли имени Мейстера Экхарта при Гарвардском университете, автор знаменитого бестселлера-монографии “Богословско-критический анализ учения об апокатастасисе”, а также более 22 других научных, публицистических и критических трудов.</p>
        <p>Режиссер-постановщик нескольких драматических спектаклей, певец - обладатель одного из уникальнейшего около-баритона в России, аудитор, экономист, коллекционер (владелец одной из самых больших коллекций пустых банок Кока-колы на Евразийском континенте). </p>
        <p>
          Мастер спорта по плаванию на спине и в колхидо-иберийском стиле. Участник международных турниров по спортивному покеру и шахматам.</p>
        <p>
          Международно признанный эксперт в области аудита, сотериологии и эсхатологии.
        </p>
        <p>
          <strong>Образование:</strong> экономический факультет Красноярского государственного университета, Джорданвилльская духовная семинария. </p>
        <p>
          Один из основателей общества “Друзей корейского народа”.
      </p>
        <p>
          С недавних пор начинающий программист.</p><br /><br /><br />

      </div >
      <div className={classes.divRight}>
        <img src={image_1} className={classes.img} alt='' />
      </div>
    </>
  )
}
