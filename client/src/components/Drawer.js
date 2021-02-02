import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import Shop from '@material-ui/icons/Shop'
import CommentIcon from '@material-ui/icons/Comment'
import { Link } from 'react-router-dom'
import AcUnitIcon from '@material-ui/icons/AcUnit'
import WorkIcon from '@material-ui/icons/Work'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import { teal } from '@material-ui/core/colors'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({

  root: {
    background: teal[100],
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 230,
      flexShrink: 0,
    },
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    background: teal[100],
  },

}))

export const MyDrawer = ({ stateLeft, setStateLeft, userName }) => {

  const classes = useStyles()
  const { t } = useTranslation()

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setStateLeft(false)
  };

  const ListAdmin = () => (
    <>
      <List>
        {[`${t('add_item_to_shop')}`, `${t('add_new_blog')}`].map((text, index) => (
          <ListItem button key={text} component={Link} to={index === 0 ? '/_addingItem' : '/_addingNewBlog'}>
            <ListItemIcon><AcUnitIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  )

  const drawerRoute = (index) => {
    switch (index) {
      case 0:
        return 'home'
      case 1:
        return 'about'
      case 2:
        return 'shop'
      case 3:
        return 'blog'
      case 4:
        return 'work'
      default:
        return 'home'
    }
  }

  const list = (anchor) => (
    <div
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.root}
    >
      <List>
        {[`${t('home')}`, `${t('about')}`, `${t('shop')}`, `${t('blog')}`, `${t('work')}`].map((text, index) => (
          < ListItem button key={text} component={Link} to={`/${drawerRoute(index)}`}>
            {<ListItemIcon>
              {index === 0 ? <HomeIcon />
                : index === 1 ? <InfoIcon />
                  : index === 2 ? <Shop />
                    : index === 3 ? <CommentIcon />
                      : <WorkIcon />}
            </ListItemIcon>}
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
      </List>
      { userName === 'maximus' && <ListAdmin />}
    </div >
  );

  return (
    <Drawer
      anchor='left'
      open={stateLeft}
      onClose={toggleDrawer()}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={toggleDrawer()}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      {list('left')}
    </Drawer>
  )
}
