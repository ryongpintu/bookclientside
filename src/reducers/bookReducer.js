import {
  GET_BOOK,
  GET_BOOKS,
  BOOK_LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types.js";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BOOK_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_BOOK:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_BOOKS:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
}
