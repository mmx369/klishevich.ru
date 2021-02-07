import { CHANGE_CURRENCY } from './types'

const currencyReducer = (state = (localStorage.getItem('i18nextLng') || 'en'), action) => {
  switch (action.type) {
    case CHANGE_CURRENCY: {
      return action.data
    }
    default:
      return state
  }
}

export const changeCurrency = (currency) => {
  return { type: CHANGE_CURRENCY, data: currency }
};

export default currencyReducer
