import axios from "axios";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const _setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    dispatch({ type: "INC" });
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    dispatch(_setAuth(res.data));
    dispatch({ type: "DEC" });
  }
};

export const updateAuth = (authId, authForm, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "INC" });
    const { data: auth } = await axios.put(`/api/users/${authId}`, authForm);
    dispatch({ type: "DEC" });
    dispatch(_setAuth(auth));
    navigate("/profile");
  } catch (error) {
    dispatch({ type: "DEC" });
    console.log(error);
  }
};

export const addFriend = (friendId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "INC" });
      const { data: updatedUser } = await axios.post(
        `/api/friends/${getState().auth.id}/${friendId}`
      );
      dispatch({ type: "DEC" });
      dispatch(_setAuth(updatedUser));
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const removeFriend = (friendId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: "INC" });
      const { data: updatedUser } = await axios.delete(
        `/api/friends/${getState().auth.id}/${friendId}`
      );
      dispatch({ type: "DEC" });
      dispatch(_setAuth(updatedUser));
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

export const authenticate =
  (username, password, method, email, firstName, lastName, navigate) =>
  async (dispatch) => {
    try {
      let res;
      dispatch({ type: "INC" });
      if (method === "login") {
        res = await axios.post("/auth/login", { username, password });
        window.localStorage.setItem(TOKEN, res.data.token);
        dispatch(me());
        navigate("/home");
      } else {
        res = await axios.post("/auth/signup", {
          username,
          password,
          email,
          firstName,
          lastName,
        });
        window.localStorage.setItem(TOKEN, res.data.token);
        dispatch(me());
        navigate("/profile");
      }
      dispatch({ type: "DEC" });
    } catch (authError) {
      dispatch({ type: "DEC" });
      return dispatch(_setAuth({ error: authError }));
    }
  };

export const logout = (navigate) => {
  window.localStorage.removeItem(TOKEN);
  navigate("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
