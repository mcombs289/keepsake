import { useEffect } from "react";
import React from "react";

export const Filter = ({
  setActiveType,
  activeType,
  setFiltered,
  movies,
  tvs,
  books,
  all,
}) => {
  return (
    <div className="filter-container">
      <button
        className={activeType === "all" ? "active" : ""}
        onClick={() => {
          setActiveType("all");
          setFiltered(all);
        }}
      >
        All
      </button>
      <button
        className={activeType === "movies" ? "active" : ""}
        onClick={() => {
          setActiveType("movies");
          setFiltered(movies);
        }}
      >
        Movies
      </button>
      <button
        className={activeType === "shows" ? "active" : ""}
        onClick={() => {
          setActiveType("shows");
          setFiltered(tvs);
        }}
      >
        Shows
      </button>
      <button
        className={activeType === "books" ? "active" : ""}
        onClick={() => {
          setActiveType("books");
          setFiltered(books);
        }}
      >
        Books
      </button>
    </div>
  );
};
export default Filter;
