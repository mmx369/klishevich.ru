import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import cartReducer from './reducers/cartReducer'
import msgReducer from "./reducers/newMsgReducer"
import blogReducer from './reducers/blogReducer'
import langReducer from './reducers/langReducer'
import currencyReducer from './reducers/currencyReducer'

const reducer = combineReducers({
  cartR: cartReducer,
  msgR: msgReducer,
  blogR: blogReducer,
  langR: langReducer,
  currR: currencyReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
