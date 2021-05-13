import axios from "axios";
import { store } from "../store";
import {
  SET_CHILDREN,
  SET_EVENT,
  SET_TEMP_CHILDREN,
  SET_TEMP_ACTIVITY,
  SET_TOKEN,
} from "./types";
import { api_host } from "../../utils";

const dispatch = store.dispatch;

export const registerUser = (data) => async () => {
  try {
    const res = await axios.post(`${api_host}/register`, data);

    if (res) {
      return res.data;
    }

    return null;
  } catch (e) {
    console.log(e.message);
    alert("An error occurred");
  }
};

export const loginUser = async (cred) => {
  try {
    const res = await axios.post(`${api_host}/login`, cred);

    if (res && res.data.status === "success") {
      dispatch(setToken(res.data.data.access_token));
    }

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const addChildren = async (data) => {
  const token = store.getState().token;

  try {
    const res = await axios.post(`${api_host}/add_children`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      dispatch(setChildren(res.data.data));
    }

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getChildren = async () => {
  const token = store.getState().token;

  try {
    const res = await axios.get(`${api_host}/get_children`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      dispatch(setChildren(res.data.data));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const setToken = (token) => (dispatch) => {
  dispatch({
    type: SET_TOKEN,
    payload: token,
  });
};

export const setChildren = (data) => (dispatch) => {
  dispatch({
    type: SET_CHILDREN,
    payload: data,
  });
};

export const setTempChildren = (data) => (dispatch) => {
  dispatch({
    type: SET_TEMP_CHILDREN,
    payload: data,
  });
};

export const setEvent = (data) => (dispatch) => {
  dispatch({
    type: SET_EVENT,
    payload: data,
  });
};

export const setTempActivity = (data) => (dispatch) => {
  dispatch({
    type: SET_TEMP_ACTIVITY,
    payload: data,
  });
};
