import { NEW_MSG } from './types'


const newMsgReducer = (state = null, action) => {
  switch (action.type) {

    case NEW_MSG: {
      return action.data;
    }
    default:
      return state;
  }
};

export const createNewMsg = (msg) => {
  return { type: NEW_MSG, data: msg };
};

export default newMsgReducer
