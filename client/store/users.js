import axios from "axios";

// ACTION TYPE
const GET_ALL_USERS = "GET_ALL_USERS";

// ACTION CREATOR
const _getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users,
  };
};

// THUNK CREATOR
export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: users } = await axios.get("/api/users");
      dispatch(_getAllUsers(users));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      console.log(error);
    }
  };
};

// REDUCER
export default function users(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users;
    default:
      return state;
  }
}
