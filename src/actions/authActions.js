import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// lets create function

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("https://bookishappapi.herokuapp.com/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => {
      
      const error= err?err.response.data:null;
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });

  //We cannot do this  this is meant to do in component
  //.catch(err=>this.setState({errors:err.resonse.data}))

  // if we want to dispatch something to dispatcher we return with types

  // this will dispatch to reducer along with data
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userData
  // };
};

export const loginUser = userData => dispatch => {
  axios
    .post("https://bookishappapi.herokuapp.com/auth", userData)
    .then(res => {
      console.log(res);
      const { token } = res.data;

      localStorage.setItem("x-auth-token", token);

      setAuthToken(token);

      //decode token
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      
      const error= err?err.response.data:null;
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

//set logged in user

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out

export const logoutUser = () => dispatch => {
  // remove token from localstorage
  localStorage.removeItem("x-auth-token");
  //remove auth header
  setAuthToken(false);
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
