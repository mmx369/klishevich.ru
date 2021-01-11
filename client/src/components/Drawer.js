import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import Shop from '@material-ui/icons/Shop';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const MyDrawer = ({ stateLeft, setStateLeft, userName }) => {

  const classes = useStyles()

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setStateLeft(false);
  };

  const ListAdmin = () => (
    <>
      <Divider />
      <List>
        {['Add item to shop', 'Add new blog'].map((text, index) => (
          <ListItem button key={text} component={Link} to={index === 0 ? '/_addingItem' : '/_addingNewBlog'}>
            <ListItemIcon><AcUnitIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  )

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'About', 'Shop', 'Blog', 'Work'].map((text, index) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
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
      </List>
      {userName === 'maximus' && <ListAdmin />}
    </div>
  );

  return (
    <div>
      <Drawer anchor='left' open={stateLeft} onClose={toggleDrawer()} >
        {list('left')}
      </Drawer>
    </div>
  )
}
