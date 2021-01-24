import { NEW_MSG } from './types'


const newMsgReducer = (state = [], action) => {
  switch (action.type) {

    case NEW_MSG: {
      return action.data;
    }
    default:
      return state;
  }
};


export const createNewMsg = (msg) => {
  console.log(1111, msg);
  return { type: NEW_MSG, data: msg }
};

export default newMsgReducer
