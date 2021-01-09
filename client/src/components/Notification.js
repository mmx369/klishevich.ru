import React from "react";
import { useSelector } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function TransitionLeft(props) {
  return <Slide {...props} direction="right" />;
}

const Notification = () => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: true,
    vertical: 'top',
    horizontal: 'center',
  });

  const [transition, setTransition] = React.useState(() => TransitionLeft);

  const { vertical, horizontal, open } = state;
  const message = useSelector((state) => state.msgR);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  if (message === null) {
    return null;
  }
  if (message === "Item is sold out" || message === "Something went wrong. Try later") {
    return <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        TransitionComponent={transition}
        onClose={handleClose}
        key={vertical + horizontal}>
        <Alert severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>;
  } else {
    return <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={5000}
        TransitionComponent={transition}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="success" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div >
  }
};

export default Notification
