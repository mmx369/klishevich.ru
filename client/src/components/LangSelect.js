import React from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'

const languageMap = {
  en: { label: 'English', dir: 'ltr', active: true },
  ru: { label: 'Русский', dir: 'ltr', active: false }
};

const LanguageSelect = () => {

  const { t } = useTranslation()

  const selected = localStorage.getItem('i18nextLng') || 'en'

  const [menuAnchor, setMenuAnchor] = React.useState(null)

  return (
    <div className='d-flex justify-content-end align-items-center language-select-root'>
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {languageMap[selected].label}
        <ArrowDropDown fontSize='small' />
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <div>
          <List>
            <ListSubheader>{t('select_language')}</ListSubheader>
            {Object.keys(languageMap)?.map(item => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null)
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect