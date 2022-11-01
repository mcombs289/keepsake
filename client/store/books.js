import axios from "axios";

// action type:
const GET_BOOKS = "GET_BOOKS";
const CREATE_BOOK = "CREATE_BOOK";

// action creators:
const setBooks = (books) => ({
  type: GET_BOOKS,
  books,
});

const createBook = (book) => {
  return {
    type: CREATE_BOOK,
    book,
  };
};

// thunks:
export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: "INC" });
  let { data } = await axios.get("/api/books");
  data = data.reverse();
  dispatch(setBooks(data));
  dispatch({ type: "DEC" });
};

export const fetchCreateBook = (book, navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: created } = await axios.post(`/api/books`, book);
      dispatch({ type: "DEC" });
      dispatch(createBook(created));
      navigate("/books");
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

// reducer
export default function booksReducer(state = [], action) {
  switch (action.type) {
    case CREATE_BOOK:
      return [...state, action.book];
    case GET_BOOKS:
      return action.books;
    default:
      return state;
  }
}
