import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import { createNewMsg } from '../reducers/newMsgReducer'
import { useHistory } from 'react-router-dom'
import createNewUser from '../services/users'
import Notification from '../components/Notification'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({

  root: {
    marginTop: 70,
    padding: 5,
    border: 'solid 1px'
  },

  button: {
    borderRadius: 13,
    boxShadow: "0 3px 2px 2px",
    padding: "0 10px",
    margin: 10
  },

}))


const SignUp = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const classes = useStyles()

  const { t } = useTranslation()

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
    <div className={classes.root}>
      <Notification />
      <h2>{t('sign_up')}</h2>
      <div>
        <TextField
          onChange={changeHandler}
          type='text'
          value={form.name}
          label={t('name')}
          name='name' />
      </div>
      <div>
        <TextField
          onChange={changeHandler}
          name='password'
          value={form.password}
          label={t('pass')}
          type='password' />
      </div>
      <div>
        <TextField
          onChange={changeHandler}
          value={form.email}
          label={t('email')}
          name='email' />
      </div>

      <div>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={addNewUser}
        >
          {t('sign_up')}
        </Button>
      </div>
    </div>
  );
};

export default SignUp
