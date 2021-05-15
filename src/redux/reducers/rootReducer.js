import {
  SET_TOKEN,
  SET_USER,
  SET_CHILDREN,
  SET_EVENT,
  SET_TEMP_CHILDREN,
  SET_TEMP_ACTIVITY,
  SET_ADMIN_TOKEN,
  SET_TRANSACTIONS,
  SET_TEMP_CHILD_ID,
  SET_FEED,
} from "../actions/types";

export const initialState = {
  user: {},
  token: null,
  admin_token: null,
  transactions: [],
  children: [],
  temp_children: [],
  current_event: "",
  temp_activity: "",
  temp_child_id: null,
  feed: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ADMIN_TOKEN:
      return {
        ...state,
        admin_token: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CHILDREN:
      return {
        ...state,
        children: action.payload,
      };
    case SET_TEMP_CHILDREN:
      return {
        ...state,
        temp_children: action.payload,
      };
    case SET_EVENT:
      return {
        ...state,
        current_event: action.payload,
      };
    case SET_TEMP_ACTIVITY:
      return {
        ...state,
        temp_activity: action.payload,
      };
    case SET_TEMP_CHILD_ID:
      return {
        ...state,
        temp_child_id: action.payload,
      };
    case SET_FEED:
      return {
        ...state,
        feed: action.payload,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
}
