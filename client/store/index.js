import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import tvsReducer from "./tvshows";
import movieReducer from "./movies";
import booksReducer from "./books";
import user from "./user";
import tv from "./tv";
import book from "./book";
import movie from "./movie";
import activityLog from "./activityLog";
import users from "./users";
import reviews from "./reviews";
import userBook from "./userBook";
import userBooks from "./userBooks";
import userTv from "./userTv";
import userTvShows from "./userTvShows";
import userMovie from "./userMovie";
import userMovies from "./userMovies";
import count from "./count";

const reducer = combineReducers({
  auth,
  tvs: tvsReducer,
  movies: movieReducer,
  userTvShows: userTvShows,
  books: booksReducer,
  userBooks: userBooks,
  userMovies: userMovies,
  tv: tv,
  book: book,
  movie: movie,
  user,
  activityLog,
  users,
  reviews,
  userBook,
  userTv,
  userMovie,
  count,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
