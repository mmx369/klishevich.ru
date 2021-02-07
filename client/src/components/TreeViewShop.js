import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useTranslation } from 'react-i18next'


const useStyles = makeStyles({
  root: {
    // height: 240,
    flexGrow: 1,
    maxWidth: 300,
  },
});

export default function FileSystemNavigator({ paperMoneyList, coinList }) {
  const classes = useStyles();
  const { t } = useTranslation()

  console.log('444444', coinList);

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label="Category">
        <TreeItem nodeId="2" label="Paper money">
          {paperMoneyList.map((el, index) => (
            <TreeItem key={el} nodeId={String(index + 10)} label={el} />
          ))}
        </TreeItem>

        <TreeItem nodeId="5" label="Coins">
          {coinList.map((el, index) => (
            <TreeItem key={el} nodeId={String(index + 100)} label={el} />
          ))}
        </TreeItem>

        <TreeItem nodeId="8" label='Other' />

      </TreeItem>


    </TreeView >

  );
}
