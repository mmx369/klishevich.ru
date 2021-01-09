import React, { useState } from "react";
import { useSelector } from 'react-redux'
import {
  TextField,
  Button,
} from "@material-ui/core";
import cartServices from '../services/cart'
import Select from '../components/Select'

const CheckOut = () => {

  const [country, setNewCountry] = useState("");
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

    cartServices.createNewOrder(newOrder).then((data) => console.log(2222, data)).catch((e) => console.log('Error: ', e))
  };

  return (
    <div>
      <h1>shipping address</h1>
      <form onSubmit={makeNewOder}>

        <Select country={country} setNewCountry={setNewCountry} />

        <div>
          <TextField
            onChange={changeHandler}
            name='firstName'
            label="first name" />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='secondName'
            label="first name" />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='address'
            label="address" />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name='city'
            label="city" />
        </div>
        <div>
          <TextField
            name='state'
            onChange={changeHandler}
            label="state" />
        </div>
        <div>
          <TextField
            name='zip'
            onChange={changeHandler}
            label="zip code" />
        </div>
        <div>
          <TextField
            name='phone'
            onChange={changeHandler}
            label="phone number" />
        </div>
        <br />
        <div>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
            </Button>
        </div>
      </form>

    </div>
  )
}

export default CheckOut
