import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import cartServices from '../services/cart'
import Select from '../components/Select'
import useStyles from '../style'

const CheckOut = () => {

  const { t } = useTranslation()
  const classes = useStyles()

  const [country, setNewCountry] = useState('')
  const [form, setForm] = useState({
    firstName: '', secondName: '', address: '', city: '', state: '', zip: '', phone: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const order = useSelector(state => state.cartR)

  const makeNewOder = (event) => {
    event.preventDefault();

    const newOrder = {
      order,
      country,
      ...form
    }

    cartServices.createNewOrder(newOrder).then((data) => console.log('Data: ', data)).catch((e) => console.log('Error: ', e))
  };

  return (
    <div className={classes.container}>
      <h1 style={{ margin: '0' }}>{t('shipp_address')}</h1>
      <form onSubmit={makeNewOder}>

        <Select country={country} setNewCountry={setNewCountry} />

        <div>
          <TextField
            onChange={changeHandler}
            name='firstName'
            label={t('first_name')} />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='secondName'
            label={t('second_name')} />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='address'
            label={t('address')} />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='city'
            label={t('city')} />
        </div>
        <div>
          <TextField
            name='state'
            onChange={changeHandler}
            label={t('state')} />
        </div>
        <div>
          <TextField
            name='zip'
            onChange={changeHandler}
            label={t('zip_code')} />
        </div>
        <div>
          <TextField
            name='phone'
            onChange={changeHandler}
            label={t('phone')} />
        </div>
        <br />
        <div>
          <Button
            className={classes.buttonMain}
            variant='outlined'
            color='primary'
            type='submit'>
            {t('finish_order')}
          </Button>
        </div>
      </form>

    </div>
  )
}

export default CheckOut
