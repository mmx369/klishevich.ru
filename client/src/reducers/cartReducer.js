import cartService from '../services/cart'
import { NEW_ITEM, INIT_ITEMS } from './types'

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_ITEM:
      if (!state.some((el) => el.id === action.data.id)) {
        const newState = [...state, action.data]
        localStorage.setItem('cart', JSON.stringify(newState))
        return newState
      } else {
        const element = state.find(el => el.id === action.data.id)
        if (element.amountOfGoods < action.stockamount) {
          const newElement = { ...element, amountOfGoods: element.amountOfGoods + 1 }
          const newState = state.filter((el) => el.id !== action.data.id)
          newState.push(newElement)
          localStorage.setItem('cart', JSON.stringify(newState))
          return newState
        } else {
          alert('Stock amount exceed')
          return state
        }
      }

    case INIT_ITEMS:
      return action.data
    default:
      return state
  }
}

export const initItems = () => {
  return async dispatch => {
    const items = JSON.parse(localStorage.getItem('cart'))
    dispatch({
      type: INIT_ITEMS,
      data: items || []
    })
  }
}

export const addNewItem = (id) => {

  return async dispatch => {
    const item = await cartService.getItem(id)
    const itemAmount = item.amountOfGoods
    if (itemAmount === 0) {
      dispatch({
        type: 'DEFAULT',
      })
    } else {
      item.amountOfGoods = 1
      dispatch({
        type: NEW_ITEM,
        data: item,
        stockamount: itemAmount,
      })
    }
  }
}

export default cartReducer
