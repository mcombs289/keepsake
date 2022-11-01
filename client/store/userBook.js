import axios from "axios";

const GET_USER_BOOK = "GET_USER_BOOK";
const UPDATE_USER_BOOK = "UPDATE_USER_BOOK";
const FAVORITE_BOOK = "FAVORITE_BOOK";

const getUserBook = (userBook) => {
  return {
    type: GET_USER_BOOK,
    userBook,
  };
};

const updateUserBook = (userBook) => {
  return {
    type: UPDATE_USER_BOOK,
    userBook,
  };
};

const getFavoriteBook = (favoriteBook) => {
  return {
    type: FAVORITE_BOOK,
    favoriteBook,
  };
};

export const fetchUserBook = (userBook) => {
  const { userId, bookId } = userBook;
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.get(`/api/userBooks/${userId}/${bookId}`);
      dispatch(getUserBook(data));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const fetchFavoriteBook = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.get(`/api/userBooks/favoriteBook/${userId}`);
      dispatch(getFavoriteBook(data));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const fetchUpdateUserBook = (userBook) => {
  const { userId, bookId } = userBook;
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.put(
        `/api/userBooks/${userId}/${bookId}`,
        userBook
      );
      dispatch(updateUserBook(data));
      window.reload(false);
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER_BOOK:
      return action.userBook;
    case FAVORITE_BOOK:
      return action.favoriteBook;
    case UPDATE_USER_BOOK:
      return action.userBook;
    default:
      return state;
  }
}
