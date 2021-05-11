import { SET_TOKEN, GET_USER, SET_CHILDREN, SET_EVENT } from "../actions/types";

export const initialState = {
  user: {},
  token: null,
  children: [],
  current_event: "event",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CHILDREN:
      return {
        ...state,
        children: action.payload,
      };
    case SET_EVENT:
      return {
        ...state,
        current_event: action.payload,
      };
    default:
      return state;
  }
}
