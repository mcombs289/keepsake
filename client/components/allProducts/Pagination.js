import React from "react";
import { Nav } from "react-bootstrap";

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="item-page">
            {currentPage == number ? (
              <a
                onClick={() => paginate(number)}
                className="page-link"
                style={{ backgroundColor: "yellow" }}
              >
                {number}
              </a>
            ) : (
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
