import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({

  containerMain: {
    fontFamily: 'Arial, Verdana, sans-serif',
    background: 'linear-gradient(60deg, #2196f3 30%, #FF8E53 90%)',
    display: 'flex',
    overflow: 'hidden',
    margin: 0,
    padding: 10,
    justifyContent: 'center',
  },

  container: {
    marginTop: 10,
    padding: 5,
    borderRadius: 40,
  },

  containerBlog: {
    padding: 5,
    marginBottom: 300
  },

  containerText: {
    margin: 0,
    padding: 5,
    justifyContent: 'space-between',
    float: 'left',
    width: '70%',
    boxSizing: 'border-box',
    marginBottom: 100
  },

  divRight: {
    float: 'right',
    width: '30%',
    boxSizing: 'border-box',
  },

  img: {
    width: '100%',
    borderRadius: 15,
    marginBottom: 35,
    marginTop: 35,
    paddingRight: 10
  },

  typo: {
    marginTop: 20,
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
    borderRadius: '20px'
  },

  gridListShop: {
    justifyContent: 'center',
    alignContent: 'center'
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
    display: 'flex',
    padding: '1rem',
    background: 'linear-gradient(60deg, #2196f3 30%, #FF8E53 90%)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: '1rem',
    width: '100%',
    justifyContent: 'center'
  },
  a: {
    textDecoration: 'none'
  }
})
export default useStyles