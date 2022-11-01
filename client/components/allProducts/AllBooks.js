import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import BookCard from "../productCards/BookCard";

export const AllBooks = () => {
  let books = useSelector((state) => state.books);
  const count = useSelector((state) => state.count);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(20);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container fluid className="all-movies">
          <Row>
            <Col className="all-movies">
              <Row>{/* <Genres movies={movies} /> */}</Row>
              <Row>
                <Pagination
                  itemsPerPage={booksPerPage}
                  totalItems={books.length}
                  paginate={paginate}
                />
              </Row>
              <Row>
                <BookCard books={currentBooks} />
              </Row>
              <Row>
                <Pagination
                  itemsPerPage={booksPerPage}
                  totalItems={books.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AllBooks;
