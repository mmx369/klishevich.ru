import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useTranslation } from 'react-i18next';
import shopService from '../services/shop';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 300,
  },
});

export default function FileSystemNavigator({
  paperMoneyList,
  coinList,
  updateData,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleFilter = async (country) => {
    const initialAllData = await shopService.getAll();
    const initialData = initialAllData.goodsList;

    shopService.getAllCountries().then((data) => {
      const newData = data.countries.filter((el) => el.country === country);
      const { _id } = newData[0];
      const newListOfGoods = initialData.filter((el) => el.country === _id);
      updateData(newListOfGoods);
    });
  };

  const handleRemoveFilter = async () => {
    const initialAllData = await shopService.getAll();
    const initialData = initialAllData.goodsList;
    updateData(initialData);
  };

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem nodeId="1" label={t('category')}>
        <TreeItem nodeId="2" label={t('paperMoney')}>
          <TreeItem
            nodeId="8"
            label={t('showAll')}
            onLabelClick={() => handleRemoveFilter()}
          />

          {paperMoneyList.map((el, index) => (
            <TreeItem
              key={el}
              nodeId={String(index + 10)}
              label={el}
              onLabelClick={() => handleFilter(el)}
            />
          ))}
        </TreeItem>

        {/* <TreeItem nodeId="5" label="Coins">
          {coinList.map((el, index) => (
            <TreeItem key={el} nodeId={String(index + 100)} label={el} />
          ))}
        </TreeItem> */}

        {/* <TreeItem nodeId="8" label="Other" /> */}
      </TreeItem>
    </TreeView>
  );
}
