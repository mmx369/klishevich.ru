import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    fontFamily: 'Arial, Verdana, sans-serif',
    background: 'linear-gradient(60deg, #2196f3 30%, #FF8E53 90%)',
    // backgroundColor: '#ccff90',
    padding: 5,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },

  buttonMain: {
    backgroundColor: "#fce4ec",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 2px 2px",
    padding: "0 10px",
    margin: 10
  },

  blog: {
    padding: "5px",
    border: 'solid',
    borderColor: "#536dfe",
    backgroundColor: '#cccf90',
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 3,
  },

  input: {
    marginRight: '1rem',
    marhinLeft: '1rem',
  },

  title: {
    flexGrow: 1,
  },

  listDrawer: {
    width: 250,
    height: '100%',
    background: 'linear-gradient(45deg, #2196f3 30%, #FF8E53 90%)',
    fontFamily: 'Arial, Verdana, sans-serif',
  },

  gridList: {
    width: 500,
    paddingTop: 5,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'yellow',
  },

  footer: {
    marginTop: '1rem',
    padding: '1rem',
    background: 'linear-gradient(60deg, #2196f3 30%, #FF8E53 90%)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '1rem',
    width: '100%'
  }

});

export default useStyles