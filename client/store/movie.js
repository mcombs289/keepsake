import axios from "axios";

// ACTION TYPE
const GET_SINGLE_MOVIE = "GET_SINGLE_MOVIE";
const CLEAR_MOVIE = "CLEAR_MOVIE";

const getSingleMovie = (movie) => {
  return {
    type: GET_SINGLE_MOVIE,
    movie,
  };
};

export const fetchSingleMovie = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: movie } = await axios.get(`/api/movies/${id}`);
      const { data: rating } = await axios.get(
        `/api/reviews/avgStarMovie/${id}`
      );
      movie.starRating = rating;
      dispatch(getSingleMovie(movie));
      dispatch({ type: "DEC" });
    } catch (error) {
      return error;
    }
  };
};

// REDUCER
export default function movieReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_MOVIE:
      return action.movie;
    default:
      return state;
  }
}
