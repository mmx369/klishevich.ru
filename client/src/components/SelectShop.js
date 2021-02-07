import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const countriesShop = [
  'Russian Federation',
  'USSR',
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bangladesh',
  'Belarus',
  'Belgium',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Congo',
  'Congo {Democratic Rep}',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland {Republic}',
  'Israel',
  'Italy',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mexico',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar, {Burma}',
  'Namibia',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Rwanda',
  'Samoa',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Yugoslavia',
  'Zambia',
  'Zimbabwe',
];

const categories = ['Paper money', 'Coin', 'Other']

export default function CountrySelect({ country, setCountry, category, setCategory }) {
  const classes = useStyles();

  const { t } = useTranslation()

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  }

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  }

  return (
    <>
      <div>
        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
          <Select
            displayEmpty
            value={country}
            onChange={handleChangeCountry}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>{t('select_country')}</em>;
              }
              return selected;
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{t('select_country')}</em>
            </MenuItem>
            {countriesShop.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className={clsx(classes.formControl, classes.noLabel)}>
          <Select
            displayEmpty
            value={category}
            onChange={handleChangeCategory}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>{t('select_category')}</em>;
              }
              return selected;
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{t('select_category')}</em>
            </MenuItem>
            {categories.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>))}
          </Select>
        </FormControl>
      </div>
    </>

  )
}