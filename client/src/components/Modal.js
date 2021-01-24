import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'


function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '100vw-20px',
    height: '100vh-20px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

export function SimpleModal({ open, setOpen, image }) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const { t } = useTranslation()

  const handleClose = () => {
    setOpen(false)
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <img src={image} alt=''></img>
      <Button size='small' color='primary' type='button' onClick={handleClose}>
        {t('close')}
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
}
