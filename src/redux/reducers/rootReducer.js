import {
  SET_TOKEN,
  GET_USER,
  SET_CHILDREN,
  SET_EVENT,
  SET_TEMP_CHILDREN,
  SET_TEMP_ACTIVITY,
} from "../actions/types";

export const initialState = {
  user: {},
  token: null,
  children: [],
  temp_children: [],
  current_event: "half term",
  temp_activity: "",
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
    default:
      return state;
  }
}
