import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import shopServices from '../services/shop'
import { useTranslation } from "react-i18next";


const AddNewItem = () => {

  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemPath, setNewItemPath] = useState("");

  const { t } = useTranslation()


  const handleNewItemName = (event) => {
    setNewItemName(event.target.value);
  };

  const handleNewItemAmount = (event) => {
    setNewItemAmount(event.target.value);
  };

  const handleNewItemPrice = (event) => {
    setNewItemPrice(event.target.value);
  };

  const handleNewItemPath = (event) => {
    setNewItemPath(event.target.value);
  };


  const AddNewItem = (event) => {
    event.preventDefault();

    const newItem = {
      nameOfGoods: newItemName,
      amountOfGoods: newItemAmount,
      priceOfGoods: newItemPrice,
      imagePath: newItemPath
    }

    shopServices.createNewItem(newItem).then((data) => console.log(2222, data)).catch((e) => console.log('Error: ', e))

    setNewItemName('')
    setNewItemAmount('')
    setNewItemPrice('')
    setNewItemPath('')

  };

  return (
    <div>
      <h2>{t('add_item_to_shop')}</h2>
      <form onSubmit={AddNewItem}>

        <div>
          <TextField value={newItemName} onChange={handleNewItemName} label={t('new_item_name')} />
        </div>

        <div>
          <TextField value={newItemAmount} onChange={handleNewItemAmount} label={t('amount_of_items')} />
        </div>
        <div>
          <TextField value={newItemPrice} onChange={handleNewItemPrice} label={t('price')} />
        </div>
        <div>
          <TextField value={newItemPath} onChange={handleNewItemPath} label={t('image_name')} />
        </div>

        <div>
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px' }}>
            {t('add_item_to_shop')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewItem
