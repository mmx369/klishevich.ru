import React from 'react'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { useTranslation } from 'react-i18next'
import { tileData } from './tileData/tileData'
import useStyles from '../style'

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
    <div>
      <GridList cellHeight={200} spacing={2} className={classes.gridList} cols={2}>
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
    </div >
  );
}
