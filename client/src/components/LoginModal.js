import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { TextField, Button } from "@material-ui/core"
import loginService from '../services/login'
import { AuthContext } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default function LoginModal() {

  const auth = useContext(AuthContext)
  const history = useHistory()
  const { t } = useTranslation()

  const classes = useStyles()

  const [open, setOpen] = React.useState(true)

  const [form, setForm] = useState({
    name: '', password: ''
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleClose = () => {
    setOpen(false)
  };

  const loginHandler = async () => {
    try {
      const data = await loginService({
        ...form
      })
      auth.login(data.token, data.userId, data.name)
      setOpen(false)
    } catch (e) {
    }
  }

  const registerHandler = (event) => {
    event.preventDefault()
    history.push('/signup')
    setOpen(false)
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
          <div className={classes.paper}>
            <h3>{t('auth')}</h3>
            <div>
              <TextField
                onChange={changeHandler}
                name='name'
                value={form.name}
                type='text'
                label={t('name')} />
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
              <Button
                variant='outlined'
                color='primary'
                style={{ marginTop: 10, marginRight: 10 }}
                onClick={loginHandler}>
                {t('sign_in')}
              </Button>
              <Button
                variant='outlined'
                color='primary'
                style={{ marginTop: 10 }}
                onClick={registerHandler}>
                {t('sign_up')}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
