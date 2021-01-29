import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import { GridList } from '@material-ui/core';
import shopService from '../services/shop'
import ImgMediaCard from './MediaCard'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'
import useStyles from '../style'

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
    <div className={classes.container}>
      <Notification />
      <Typography
        className={classes.typo}
        align='center'
        color='primary'
        variant='h4'
      >
        {t('Shop')}
      </Typography>
      <GridList className={classes.gridListShop}>
        {listOfGoods.map((el) => {
          return (
            <ImgMediaCard el={el} key={el.id} />
          )
        })}
      </GridList>
    </div >)
};
export default Shop
