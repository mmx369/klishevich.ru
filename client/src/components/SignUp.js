import React, { useState } from "react";
import {
  TextField,
  Button,
} from "@material-ui/core";
import userServices from '../services/users'

const SignUp = (props) => {

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

    userServices.createNewUser(newUser).then((data) => console.log(2222, data)).catch((e) => console.log('Error: ', e))

  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={addNewUser}>
        <div>
          <TextField
            onChange={changeHandler}
            type="text"
            label="name"
            name="name" />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            name="password"
            label="password"
            type="password" />
        </div>
        <div>
          <TextField
            onChange={changeHandler}
            label="e-mail"
            name="email" />
        </div>

        <div>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
            </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp
