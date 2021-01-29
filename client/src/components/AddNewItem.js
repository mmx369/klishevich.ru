import React, { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { useDispatch } from "react-redux"
import shopServices from '../services/shop'
import { useTranslation } from "react-i18next";
import uploadService from '../services/upload'
import useStyles from '../style'
import Notification from './Notification'
import { createNewMsg } from '../reducers/newMsgReducer'
import { InputBase } from '@material-ui/core';


const AddNewItem = () => {

  const [newItemName, setNewItemName] = useState("")
  const [newItemAmount, setNewItemAmount] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [newItemPath, setNewItemPath] = useState("")
  const dispatch = useDispatch()
  const classes = useStyles()


  // const [listOfImages, setListOfImages] = useState([])

  const { t } = useTranslation()

  //upload image - begin-----------

  const [selectedFile, setSelectedFile] = useState(null)

  const fileSelectedHandler = event => {
    console.log(1111, event.target.files[0]);
    setSelectedFile(event.target.files[0])
    setNewItemPath(event.target.files[0].name)
  }

  const fileUploadHandler = () => {
    if (!selectedFile) {
      return null
    }
    const fd = new FormData()
    fd.append('image', selectedFile, selectedFile.name)
    uploadService.uploadImageShop(fd).then(res => {
      console.log(res)
    })
  }

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
      setNewItemPath(selectedFile.name)
    } else {
      setNewItemPath(event.target.value);
    }
  };


  const AddNewItem = (event) => {
    event.preventDefault();
    fileUploadHandler()

    const newItem = {
      nameOfGoods: newItemName,
      amountOfGoods: newItemAmount,
      priceOfGoods: newItemPrice,
      imagePath: newItemPath
    }

    shopServices.createNewItem(newItem)
      .then((data) => {
        console.log(2222, data)
        setNewItemName('')
        setNewItemAmount('')
        setNewItemPrice('')
        setNewItemPath('')
        dispatch(createNewMsg({ message: `Item ${newItem.nameOfGoods} added to shop`, msgType: 'success' }))
        setTimeout(() => {
          dispatch(createNewMsg([]))
        }, 3000);
      })
      .catch((e) => {
        console.error(e)
        dispatch(createNewMsg({ message: e.message, msgType: 'error' }))
        setTimeout(() => {
          dispatch(createNewMsg([]))
        }, 3000);
      })
  };

  return (
    <>
      <Notification />
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
            <TextField
              value={newItemPath}
              onChange={handleNewItemPath}
              label={t('image_name')}
              disabled={(!selectedFile) ? false : true}
            />
          </div>

          <div>
            <Button
              className={classes.buttonMain}
              variant="outlined"
              color="primary"
              type="submit"
            >
              {t('add_item_to_shop')}
            </Button>
          </div>
        </form>
        <div>
          <label htmlFor="files" className={classes.buttonMain}>{t('select_image')}</label>
          <InputBase
            id='files'
            style={{ visibility: 'hidden' }}
            type='file'
            name='image'
            onChange={fileSelectedHandler}
          />
        </div>
      </div>
      <br />

      {/* <div>
        {listOfImages.map((el) => <img src={`http://localhost:4000/api/uploads/${el.id}`} alt="" style={{ width: '300px' }} />)
        }
      </div> */}
    </>
  );
}

export default AddNewItem
