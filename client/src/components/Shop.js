import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next'
import shopService from '../services/shop'
import ImgMediaCard from './MediaCard'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'

const Shop = () => {
  const { t } = useTranslation()
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
    <div>
      <h2>{t('Shop')}</h2>
      <Notification />
      {listOfGoods.map((el) => {
        return (
          <ImgMediaCard el={el} key={el.id} />
        )
      })}
    </div>)
};
export default Shop
