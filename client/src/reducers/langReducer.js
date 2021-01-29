import { CHANGE_LANG } from './types'

const langReducer = (state = null, action) => {
  switch (action.type) {
    case CHANGE_LANG: {
      return action.data
    }
    default:
      return state
  }
}

export const changeLanguage = (lang) => {
  return { type: CHANGE_LANG, data: lang }
};

export default langReducer
