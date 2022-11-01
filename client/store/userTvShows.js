import axios from "axios";

const CREATE_USER_TV = "CREATE_USER_TV";
const DELETE_USER_TV = "DELETE_USER_TV";

const createUserTv = (userTv) => {
  return {
    type: CREATE_USER_TV,
    userTv,
  };
};

const deleteUserTv = (userTv) => {
  return {
    type: DELETE_USER_TV,
    userTv,
  };
};

export const fetchCreateUserTv = (userTv) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data } = await axios.post(`/api/userTvs`, userTv);
      dispatch(createUserTv(data));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const fetchDeleteUserTv = (userTv) => {
  const { userId, tvId } = userTv;
  return async (dispatch) => {
    dispatch({ type: "INC" });
    const { data: deleted } = await axios.delete(
      `/api/userTvs/${userId}/${tvId}`
    );
    dispatch(deleteUserTv(deleted));
    dispatch({ type: "DEC" });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case CREATE_USER_TV:
      return [...state, action.userTv];
    case DELETE_USER_TV:
      return state.filter((userTv) => userTv.id !== action.userTv.id);
    default:
      return state;
  }
}
