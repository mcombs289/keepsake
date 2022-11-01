import axios from "axios";

// ACTION TYPE
const SET_USER = "SET_USER";
const UPDATE_USER = "UPDATE_USER";

// ACTION CREATOR
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

// THUNK CREATOR
export const fetchUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: user } = await axios.get(`/api/users/${userId}`);
      dispatch(setUser(user));
      dispatch({ type: "DEC" });
    } catch (error) {
      return error;
    }
  };
};

// REDUCER
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
