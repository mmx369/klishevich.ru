import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { GridList } from '@material-ui/core';
import shopService from '../services/shop'
import MediaCard from './MediaCard'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    padding: 5,
  },
  listShop: {
    justifyContent: 'center',
    alignContent: 'center'
  },
}
))

const Shop = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  const [listOfGoods, setlistOfGoods] = useState([]);
  const dispatch = useDispatch()


  useEffect(() => {
    shopService.getAll().then((initialList) => {
      setlistOfGoods(initialList);
    }).catch((e) => {
      dispatch(createNewMsg({ message: `${t('smth_wrong')}`, msgType: 'error' }))
      console.log(e)
    })
  }, [dispatch, t]);

  return (
    <div className={classes.root}>
      <Notification />
      <Typography
        align='center'
        variant='h4'
      >
        {t('Shop')}
      </Typography>
      <GridList className={classes.listShop}>
        {listOfGoods.map((el) => {
          return (
            <MediaCard el={el} key={el.id} />
          )
        })}
      </GridList>
    </div >)
};
export default Shop
