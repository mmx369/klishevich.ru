import React, { useState, useContext } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import shopServices from '../services/shop';
import { useTranslation } from 'react-i18next';
import uploadService from '../services/upload';
import Notification from './Notification';
import { AuthContext } from '../context/AuthContext';
import { createNewMsg } from '../reducers/newMsgReducer';
import { InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SelectShop from '../components/SelectShop';
import { teal } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    marginTop: 70,
    padding: 15,
    border: 'solid 1px',
  },

  button: {
    borderRadius: 13,
    boxShadow: '0 3px 2px 2px',
    padding: '0 10px',
    margin: '10px 0',
  },

  inputStyle: {
    borderRadius: 13,
    boxShadow: '0 3px 2px 2px',
    padding: '5px 10px',
    margin: '10px 0',
    color: teal[500],
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.22s',
    fontWeight: 500,
  },
  field: {
    margin: 0,
  },
});

const AddNewItem = () => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemPath, setNewItemPath] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();

  const { t } = useTranslation();

  const auth = useContext(AuthContext);

  console.log('Auth: ', auth);

  // const input = document.querySelector('#files');
  // const triggerInput = () => input.onChange()

  // console.log('Input', input);

  //upload image - begin-----------

  const [selectedFile, setSelectedFile] = useState(null);

  const fileSelectedHandler = (event) => {
    console.log(1111, event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setNewItemPath(event.target.files[0].name);
  };

  const fileUploadHandler = () => {
    if (!selectedFile) {
      return null;
    }
    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    uploadService.uploadImageShop(fd).then((res) => {
      console.log(res);
    });
  };

  //upload image -end-------------

  // useEffect(() => {
  //   (async () => {
  //     const qqq = await getListOfImages()
  //     setListOfImages(qqq)
  //   })()
  // }, [])

  // const getListOfImages = async () => {
  //   const res = await axios.get('http://localhost:4000/api/uploads/')
  //   return res.data
  // }

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
    if (selectedFile) {
      setNewItemPath(selectedFile.name);
    } else {
      setNewItemPath(event.target.value);
    }
  };

  const AddNewItem = (event) => {
    event.preventDefault();
    fileUploadHandler();

    const newItem = {
      nameOfGoods: newItemName,
      amountOfGoods: newItemAmount,
      priceOfGoods: newItemPrice,
      imagePath: newItemPath,
      country,
      category,
    };

    console.log('newItem; ', newItem);

    shopServices.setToken(auth.token);

    shopServices
      .createNewItem(newItem)
      .then((data) => {
        console.log(2222, data);
        setNewItemName('');
        setNewItemAmount('');
        setNewItemPrice('');
        setNewItemPath('');
        dispatch(
          createNewMsg({
            message: `Item ${newItem.nameOfGoods} added to shop`,
            msgType: 'success',
          })
        );
        setTimeout(() => {
          dispatch(createNewMsg([]));
        }, 3000);
      })
      .catch((e) => {
        console.error(e);
        dispatch(createNewMsg({ message: e.message, msgType: 'error' }));
        setTimeout(() => {
          dispatch(createNewMsg([]));
        }, 3000);
      });
  };

  return (
    <>
      <Notification />
      <div className={classes.root}>
        <h2>{t('add_item_to_shop')}</h2>
        <form onSubmit={AddNewItem}>
          <SelectShop
            country={country}
            setCountry={setCountry}
            category={category}
            setCategory={setCategory}
            className={classes.field}
          />

          <div>
            <TextField
              value={newItemName}
              onChange={handleNewItemName}
              label={t('new_item_name')}
            />
          </div>

          <div>
            <TextField
              value={newItemAmount}
              onChange={handleNewItemAmount}
              label={t('amount_of_items')}
            />
          </div>
          <div>
            <TextField
              value={newItemPrice}
              onChange={handleNewItemPrice}
              label={t('price')}
            />
          </div>
          <div>
            <TextField
              value={newItemPath}
              onChange={handleNewItemPath}
              label={t('image_name')}
              disabled={!selectedFile ? false : true}
              className={classes.field}
            />
          </div>

          <div>
            <label htmlFor="files" className={classes.inputStyle}>
              {t('select_image')}
            </label>
            <InputBase
              id="files"
              style={{ visibility: 'hidden' }}
              type="file"
              name="image"
              onChange={fileSelectedHandler}
            />
          </div>

          <div>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
              type="submit"
            >
              {t('add_item_to_shop')}
            </Button>
          </div>
        </form>
      </div>
      <br />

      {/* <div>
        {listOfImages.map((el) => <img src={`http://localhost:4000/api/uploads/${el.id}`} alt="" style={{ width: '300px' }} />)
        }
      </div> */}
    </>
  );
};

export default AddNewItem;
