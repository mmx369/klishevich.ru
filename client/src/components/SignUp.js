import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import { createNewMsg } from '../reducers/newMsgReducer'
import { useHistory } from 'react-router-dom'
import createNewUser from '../services/users'
import Notification from '../components/Notification'


const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [form, setForm] = useState({
    name: '', email: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const addNewUser = (event) => {
    event.preventDefault();
    const newUser = {
      ...form
    }
    createNewUser(newUser)
      .then(() => {
        dispatch(createNewMsg(`New user ${form.name} created. Now you will redirect to login page`))
        setTimeout(() => {
          history.push(`/signin`)
        }, 6000)
      })
      .catch((e) => {
        dispatch(createNewMsg(`Something went wrong. Try later`));
        console.log('Error: ', e)
      })
  };

  return (
    <div>
      <Notification />
      <h2>Sign Up</h2>
      <div>
        <TextField
          onChange={changeHandler}
          type="text"
          value={form.name}
          label="name"
          name="name" />
      </div>
      <div>
        <TextField
          onChange={changeHandler}
          name="password"
          value={form.password}
          label="password"
          type="password" />
      </div>
      <div>
        <TextField
          onChange={changeHandler}
          value={form.email}
          label="e-mail"
          name="email" />
      </div>

      <div>
        <Button
          style={{ marginTop: 10 }}
          variant="contained"
          color="primary"
          onClick={addNewUser}
        >
          Sign Up
          </Button>
      </div>
    </div>
  );
};

export default SignUp
