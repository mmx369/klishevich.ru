import React from "react"
import { useSelector } from "react-redux"
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import Slide from '@material-ui/core/Slide'

const Notification = () => {

  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  })

  const TransitionLeft = (props) => {
    return <Slide {...props} direction="right" />;
  }

  const { vertical, horizontal, open } = state;

  const message = useSelector((state) => state.msgR)

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if (!message.message) {
    return null
  }

  if (message.msgType === 'success') {
    return (<div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        TransitionComponent={TransitionLeft}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          severity="success"
          onClose={handleClose}>
          <strong>{message.message}</strong>
        </Alert>
      </Snackbar>
    </div >
    )
  }

  return (<div>
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      autoHideDuration={5000}
      TransitionComponent={TransitionLeft}
      onClose={handleClose}
      key={vertical + horizontal}>
      <Alert
        severity="error"
        onClose={handleClose}>
        <strong>{message.message}</strong>
      </Alert>
    </Snackbar>
  </div>)
};

export default Notification
