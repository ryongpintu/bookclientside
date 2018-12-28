import axios from "axios";
import {
  GET_BOOK,
  GET_BOOKS,
  BOOK_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types.js";

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("http://localhost:8000/books")
    .then(res =>
      dispatch({
        type: GET_BOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_BOOK,
        payload: {}
      })
    );
};

export const updateBook = (id, profileData, history) => dispatch => {
  console.log(profileData);
  axios
    .put(`http://localhost:8000/books/edit/${id}`, profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const getCurrentBook = id => dispatch => {
  axios
    .get(`http://localhost:8000/books/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_BOOK,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addBook = (expData, history) => dispatch => {
  axios
    .post("http://localhost:8000/books/add", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const deleteBook = id => dispatch => {
  axios
    .delete(`http://localhost:8000/books/delete/${id}`)
    .then(res =>
      dispatch({
        type: GET_BOOK,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const getBooks = () => dispatch => {
  dispatch(setProfileLoading());

  axios
    .get("http://localhost:8000/books/")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: null
      });
    });
};

export const setProfileLoading = () => {
  return {
    type: BOOK_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
