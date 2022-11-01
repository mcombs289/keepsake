import axios from "axios";

// action type:
const GET_MOVIES = "GET_MOVIES";
const CREATE_MOVIE = "CREATE_MOVIE";

// action creators:
const setMovies = (movies) => ({
  type: GET_MOVIES,
  movies,
});

export const createMovie = (movie) => {
  return {
    type: CREATE_MOVIE,
    movie,
  };
};

// thunks:
export const fetchMovies = () => async (dispatch) => {
  dispatch({ type: "INC" });
  let { data } = await axios.get("/api/movies");
  data = data.reverse();
  dispatch(setMovies(data));
  dispatch({ type: "DEC" });
};

export const fetchCreateMovie = (movie, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: created } = await axios.post(`/api/movies`, movie);
      dispatch(createMovie(created));
      dispatch({ type: "DEC" });
      navigate("/movies");
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

// reducer
export default function moviesReducer(state = [], action) {
  switch (action.type) {
    case CREATE_MOVIE:
      return [...state, action.movie];
    case GET_MOVIES:
      return action.movies;
    default:
      return state;
  }
}
