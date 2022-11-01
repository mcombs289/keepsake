import axios from "axios";

const GET_USER_MOVIE = "GET_USER_MOVIE";
const UPDATE_USER_MOVIE = "UPDATE_USER_MOVIE";

const getUserMovie = (userMovie) => {
  return {
    type: GET_USER_MOVIE,
    userMovie,
  };
};

const updateUserMovie = (userMovie) => {
  return {
    type: UPDATE_USER_MOVIE,
    userMovie,
  };
};

export const fetchUserMovie = (userMovie) => {
  const { userId, movieId } = userMovie;
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.get(`/api/userMovies/${userId}/${movieId}`);
      dispatch(getUserMovie(data));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const fetchUpdateUserMovie = (userMovie) => {
  const { userId, movieId } = userMovie;
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.put(
        `/api/userMovies/${userId}/${movieId}`,
        userMovie
      );
      dispatch(updateUserMovie(data));
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
    case GET_USER_MOVIE:
      return action.userMovie;
    case UPDATE_USER_MOVIE:
      return action.userMovie;
    default:
      return state;
  }
}
