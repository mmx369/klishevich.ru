import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import { GridList } from '@material-ui/core';
import shopService from '../services/shop';
import MediaCard from './MediaCard';
import Notification from './Notification';
import { createNewMsg } from '../reducers/newMsgReducer';
import { makeStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { changeCurrency } from '../reducers/currencyReducer';
import ShopAccordeon from './Accordion';
import TreeViewShop from '../components/TreeViewShop';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 65,
    padding: 5,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  listShop: {
    justifyContent: 'center',
    alignContent: 'center',
  },
}));

const Shop = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [listOfGoods, setlistOfGoods] = useState([]);
  const [listOfCountryPaperMoney, setListOfCountryPaperMoney] = useState([]);
  const [listOfCoins, setListOfCoins] = useState([]);

  const currency = useSelector((state) => state.currR);

  const dispatch = useDispatch();

  useEffect(() => {
    shopService
      .getAll()
      .then((initialList) => {
        setlistOfGoods(initialList.goodsList);
        setListOfCountryPaperMoney(initialList.categoryList);
        setListOfCoins(initialList.coinList);
      })
      .catch((e) => {
        dispatch(
          createNewMsg({ message: `${t('smth_wrong')}`, msgType: 'error' })
        );
        console.log(e);
      });
  }, [dispatch, t]);

  const handleChange = (event) => {
    console.log(1111, event.target.value);
    dispatch(changeCurrency(event.target.value));
  };

  console.log('ListOfGoods', listOfGoods);
  console.log(44444, listOfCountryPaperMoney);

  const updateData = (value) => {
    setlistOfGoods(value);
  };

  return (
    <div className={classes.root}>
      <Notification />
      <Typography align="center" variant="h4">
        {t('Shop')}
      </Typography>

      <div>
        <TreeViewShop
          paperMoneyList={listOfCountryPaperMoney}
          coinList={listOfCoins}
          listOfGoods={listOfGoods}
          updateData={updateData}
        />

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">{t('currency')}</InputLabel>
          <Select native onChange={handleChange}>
            <option aria-label="None" value="" />
            <option value="en">{t('usd')}</option>
            <option value="ru">{t('rur')}</option>
          </Select>
        </FormControl>
      </div>

      <GridList className={classes.listShop}>
        {listOfGoods.map((el) => {
          return <MediaCard el={el} key={el.id} currency={currency} />;
        })}
      </GridList>
      <ShopAccordeon />
    </div>
  );
};
export default Shop;
