import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'
import { addNewItem } from '../reducers/cartReducer'
import { SimpleModal } from './Modal'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    height: 300,
  },
})

export default function MediaCard({ el }) {

  const { t } = useTranslation()

  const [open, setOpen] = React.useState(false)

  const handleModalOpen = () => {
    setOpen(true)
  };

  const classes = useStyles()

  const dispatch = useDispatch()

  const handleDispatch = (id, name, amount) => {
    dispatch(addNewItem(id))
    if (amount === 0) {
      dispatch(createNewMsg({ message: `${t('item_sold_out')}`, msgType: 'error' }))
      setTimeout(() => {
        dispatch(createNewMsg([]))
      }, 3000)
    } else {
      dispatch(createNewMsg({ message: `${name} - ${t('added_to_cart')}`, msgType: 'success' }))
      setTimeout(() => {
        dispatch(createNewMsg([]))
      }, 3000)
    }
  }

  return (
    <>
      <Notification />
      <SimpleModal open={open} setOpen={setOpen} image={`/static/img_shop/${el.imagePath}`} />
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`/static/img_shop/${el.imagePath}`}
            title={el.nameOfGoods}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {el.nameOfGoods}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {t('in_stock')}{(el.amountOfGoods === 0) ? `${t('sold_out')}` : el.amountOfGoods}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {t('Price')}: ${el.priceOfGoods}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary' onClick={handleModalOpen}>
            {t('full_size')}
          </Button>
          <Button size='small' color='primary' onClick={() => { handleDispatch(el.id, el.nameOfGoods, el.amountOfGoods) }} >
            {t('add_to_cart')}
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
