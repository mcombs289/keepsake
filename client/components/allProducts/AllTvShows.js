import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import TvCard from "../productCards/TvCard";

export const AllTvShows = () => {
  let tvshows = useSelector((state) => state.tvs);
  const count = useSelector((state) => state.count);

  const [currentPage, setCurrentPage] = useState(1);
  const [showsPerPage] = useState(20);

  const indexOfLastTv = currentPage * showsPerPage;
  const indexOfFirstTv = indexOfLastTv - showsPerPage;
  const currentTvs = tvshows.slice(indexOfFirstTv, indexOfLastTv);

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
                  itemsPerPage={showsPerPage}
                  totalItems={tvshows.length}
                  paginate={paginate}
                />
              </Row>
              <Row>
                <TvCard tvShow={currentTvs} />
              </Row>
              <Row>
                <Pagination
                  itemsPerPage={showsPerPage}
                  totalItems={tvshows.length}
                  paginate={paginate}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default AllTvShows;
