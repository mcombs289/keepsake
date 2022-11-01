import axios from "axios";

// ACTION TYPE
const GET_SINGLE_BOOK = "GET_SINGLE_BOOK";

const getSingleBook = (book) => {
  return {
    type: GET_SINGLE_BOOK,
    book,
  };
};

export const fetchSingleBook = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "INC" });
      const { data: book } = await axios.get(`/api/books/${id}`);
      const { data: rating } = await axios.get(
        `/api/reviews/avgStarBooks/${id}`
      );
      book.starRating = rating;
      dispatch(getSingleBook(book));
      dispatch({ type: "DEC" });
    } catch (error) {
      dispatch({ type: "DEC" });
      return error;
    }
  };
};

// REDUCER
export default function bookReducer(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return action.book;
    default:
      return state;
  }
}
