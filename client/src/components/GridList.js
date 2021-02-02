import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { useTranslation } from 'react-i18next'
import { tileData } from './tileData/tileData'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({

  gridList: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 500,
    },
    transform: 'translateZ(0)',
    borderRadius: '20px',
    paddingBottom: 10,
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'yellow',
  },

}))

export default function AdvancedGridList() {
  const classes = useStyles()
  const { t } = useTranslation()

  const addTranslateToTileData = (title) => {
    return title.split(' ')[0].toLowerCase()
  }
  const getYearFromTitle = (title) => {
    return title.split(' ')[title.split(' ').length - 1]
  }

  return (
    <GridList cellHeight={200} spacing={2} cols={2} className={classes.gridList}>
      {tileData.map((tile) => (
        < GridListTile key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1} >
          <img src={tile.img} alt={t(addTranslateToTileData(tile.title))} />;
          <GridListTileBar
            title={t(addTranslateToTileData(tile.title)) + ' ' + getYearFromTitle(tile.title)}
            titlePosition='top'
            actionIcon={
              <IconButton aria-label={`star ${tile.title}`} className={classes.icon}>
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition='left'
            className={classes.titleBar}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
