import React from "react";
import { fetchUpdateUserBook } from "../../store/userBook";
import { fetchCreateUserBook } from "../../store/userBooks";
import { fetchUpdateUserMovie } from "../../store/userMovie";
import { fetchCreateUserMovie } from "../../store/userMovies";
import { fetchUpdateUserTv } from "../../store/userTv";
import { fetchCreateUserTv } from "../../store/userTvShows";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
const SelectDropDown = ({ selectOptions, selected, status, auth, id }) => {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  let productType = location[1];
  return (
    <select
      value={selected}
      onChange={(e) => {
        if (productType === "b") {
          if (status) {
            dispatch(
              fetchUpdateUserBook({
                userId: auth.id,
                bookId: id,
                status: e.target.value,
              })
            );
          } else {
            dispatch(
              fetchCreateUserBook({
                userId: auth.id,
                bookId: id,
                status: e.target.value,
              })
            );
          }
        } else if (productType === "t") {
          if (status) {
            dispatch(
              fetchUpdateUserTv({
                userId: auth.id,
                tvId: id,
                status: e.target.value,
              })
            );
          } else {
            dispatch(
              fetchCreateUserTv({
                userId: auth.id,
                tvId: id,
                status: e.target.value,
              })
            );
          }
        } else {
          if (status) {
            dispatch(
              fetchUpdateUserMovie({
                userId: auth.id,
                movieId: id,
                status: e.target.value,
              })
            );
          } else {
            dispatch(
              fetchCreateUserMovie({
                userId: auth.id,
                movieId: id,
                status: e.target.value,
              })
            );
          }
        }
        window.location.reload(false);
      }}
    >
      {selectOptions.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default SelectDropDown;
