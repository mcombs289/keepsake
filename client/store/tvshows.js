import axios from "axios";

// action type:
const GET_TV_SHOWS = "GET_TV_SHOWS";
const CREATE_TV = "CREATE_TV";

// action creators:
const setTvShows = (tvs) => ({
  type: GET_TV_SHOWS,
  tvs,
});

//Action Creator
const createTv = (tv) => {
  return {
    type: CREATE_TV,
    tv,
  };
};

//Thunk
export const fetchCreateTv = (tv, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      let { data: created } = await axios.post(`/api/tvs`, tv);
      dispatch(createTv(created));
      dispatch({ type: "DEC" });
      navigate("/tvshows");
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const fetchTvShows = () => async (dispatch) => {
  try {
    dispatch({ type: "INC" });
    let { data } = await axios.get("/api/tvs");
    data = data.reverse();
    dispatch(setTvShows(data));
    dispatch({ type: "DEC" });
  } catch (error) {
    dispatch({ type: "DEC" });
    return error;
  }
};

// reducer
export default function tvsReducer(state = [], action) {
  switch (action.type) {
    case CREATE_TV:
      return [...state, action.tv];
    case GET_TV_SHOWS:
      return action.tvs;
    default:
      return state;
  }
}
