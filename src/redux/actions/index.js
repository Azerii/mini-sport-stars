import axios from "axios";
import { store } from "../store";
import {
  SET_USER,
  SET_CHILDREN,
  SET_EVENT,
  SET_TEMP_CHILDREN,
  SET_TEMP_ACTIVITY,
  SET_TOKEN,
  SET_ADMIN_TOKEN,
  SET_TRANSACTIONS,
  SET_TEMP_CHILD_ID,
  SET_FEED,
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
  }
};

export const loginUser = async (cred) => {
  try {
    const res = await axios.post(`${api_host}/login`, cred);

    if (res && res.data.status === "success") {
      dispatch(setToken(res.data.data.access_token));
      dispatch(setUser(res.data.data.user));
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

export const removeChild = async (id) => {
  const token = store.getState().token;

  try {
    const res = await axios.post(
      `${api_host}/remove_child/${id}`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getProfile = async () => {
  const token = store.getState().token;

  try {
    const res = await axios.get(`${api_host}/get_profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      dispatch(setUser(res.data.data.user));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const updateProfile = async (data) => {
  const token = store.getState().token;

  try {
    const res = await axios.post(`${api_host}/update_profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      return res.data;
    }

    return null;
  } catch (e) {
    console.log(e.message);
  }
};

export const getFeed = async () => {
  const token = store.getState().token;

  try {
    const res = await axios.get(`${api_host}/get_transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      dispatch(setFeed(res.data.data));
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

export const setUser = (data) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: data,
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

export const setTempChildId = (id) => (dispatch) => {
  dispatch({
    type: SET_TEMP_CHILD_ID,
    payload: id,
  });
};

export const setFeed = (data) => (dispatch) => {
  dispatch({
    type: SET_FEED,
    payload: data,
  });
};

// admin

export const loginAdmin = async (cred) => {
  try {
    const res = await axios.post(`${api_host}/admin/login`, cred);

    if (res && res.data.status === "success") {
      dispatch(setAdminToken(res.data.data.access_token));
    }

    return res.data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getTransactions = async () => {
  const token = store.getState().admin_token;

  try {
    const res = await axios.get(`${api_host}/admin/get_all_transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res && res.data.status === "success") {
      dispatch(setTransactions(res.data.data));
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const setAdminToken = (data) => (dispatch) => {
  dispatch({
    type: SET_ADMIN_TOKEN,
    payload: data,
  });
};

export const setTransactions = (data) => (dispatch) => {
  dispatch({
    type: SET_TRANSACTIONS,
    payload: data,
  });
};
