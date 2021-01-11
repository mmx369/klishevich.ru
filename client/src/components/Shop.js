import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import shopService from '../services/shop'
import ImgMediaCard from './MediaCard'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'

const Shop = () => {
  const [listOfGoods, setlistOfGoods] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    shopService.getAll().then((initialList) => {
      setlistOfGoods(initialList);
    }).catch((e) => {
      dispatch(createNewMsg(`Something went wrong. Try later`));
      console.log(e)
    })
  }, [dispatch]);

  return (
    <div>
      <h2>Shop</h2>
      <Notification />
      {listOfGoods.map((el) => {
        return (
          <ImgMediaCard el={el} key={el.id} />
        )
      })}
    </div>)
};
export default Shop
