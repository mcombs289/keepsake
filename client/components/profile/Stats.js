import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";

export const Stats = ({ user }) => {
  const books = user?.books || [];
  const tvs = user?.tvs || [];
  const movies = user?.movies || [];

  const readBooks = books.filter((book) => book.user_book.status === "Read");

  const watchedMovies = movies.filter(
    (movie) => movie.user_movie.status === "Watched"
  );
  const watchedTvs = tvs.filter((tv) => tv.user_tv.status === "Watched");

  return (
    <div>
      <Row className="stats-row">
        <Col lg={6} sm={12}>
          <Row>
            <Col className="stats">
              <Row className="stats-inner-row">
                <Col lg={4} className="stats-image-icon d-none d-lg-block">
                  <img src="/images/booksIcon.png" />
                </Col>
                <Col lg={8}>
                  <h2>{readBooks.length}</h2>
                  <p> Books Read</p>
                </Col>
              </Row>
            </Col>
            <Col className="stats">
              <Row className="stats-inner-row">
                <Col lg={4} className="stats-image-icon d-none d-lg-block">
                  <img src="https://flaticons.net/icon.php?slug_category=miscellaneous&slug_icon=film-reel" />
                </Col>
                <Col lg={8}>
                  <h2> {watchedMovies.length} </h2>
                  <p> Movies Watched</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={6} sm={12}>
          <Row>
            <Col className="stats">
              <Row className="stats-inner-row">
                <Col lg={4} className="stats-image-icon d-none d-lg-block">
                  <img src="/images/tvIcon.png" />
                </Col>
                <Col lg={8}>
                  <h2> {watchedTvs.length} </h2>
                  <p> TV Shows Watched</p>
                </Col>
              </Row>
            </Col>
            <Col className="stats">
              <Link to="/profile/friends" style={{ textDecoration: "none" }}>
                <Row className="stats-inner-row">
                  <Col lg={4} className="stats-image-icon d-none d-lg-block">
                    <FaUserFriends size={80} color="#ffffff" />
                  </Col>
                  <Col lg={8}>
                    <h2> {user.friend.length} </h2>
                    <p>Following</p>
                  </Col>
                </Row>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Stats;
