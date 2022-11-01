import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Banner from "./Banner";
import SimpleSlider from "./SimpleSlider";

export class Profile extends React.Component {

  render() {
    const user = this.props.user || [];
    const tvs = user?.tvs || [];
    const books = user?.books || [];
    const movies = user?.movies || [];

    //favorites
    const favoriteBook = books.filter(
      (book) => book.user_book.favorite === true
    )[0];
    const favoriteMovie = movies.filter(
      (movie) => movie.user_movie.favorite === true
    )[0];
    const favoriteTv = tvs.filter((tv) => tv.user_tv.favorite === true
    )[0];

    //features
    const featuredTvs = tvs.filter((tv) => tv.user_tv.featured === true);
    const featuredMovies = movies.filter(
      (movie) => movie.user_movie.featured === true
    );
    const featuredBooks = books.filter(
      (book) => book.user_book.featured === true
    );


    return (
      <Container fluid className="profile">
        <Row>
          <Col>
            <Banner user={user} />
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="featured">
            <h2>Favorite Book</h2>
            {favoriteBook ? (
              <Link
                to={`/books/${favoriteBook.id}`}
                style={{ color: "inherit" }}
              >
                <img src={favoriteBook.imageUrl} alt="image" />
              </Link>
            ) : (
              <div>
                <h4>No favorite Book</h4>
                <h4>Add a favorite </h4>
              </div>
            )}
          </Col>
          <Col sm={4} className="featured">
            <h2>Favorite Movie</h2>
            {favoriteMovie ? (
              <Link
                to={`/movies/${favoriteMovie.id}`}
                style={{ color: "inherit" }}
              >
                <img src={favoriteMovie.imageUrl} alt="image" />
              </Link>
            ) : (
              <div>
                <h4>No favorite Movie</h4>
                <h4>Add a favorite </h4>
              </div>
            )}
          </Col>
          <Col sm={4} className="featured">
            <h2>Favorite Show</h2>
            {favoriteTv ? (
              <Link
                to={`/tvshows/${favoriteTv.id}`}
                style={{ color: "inherit" }}
              >
                <img src={favoriteTv.imageUrl} alt="image" />
              </Link>
            ) : (
              <div>
                <h4>No favorite Show</h4>
                <h4>Add a favorite </h4>
              </div>
            )}
          </Col>
        </Row>
        <Row className="favorite">
          <h2>Featured Books</h2>
          <SimpleSlider books={featuredBooks} />
        </Row>
        <Row className="favorite">
          <h2>Featured Shows</h2>
          <SimpleSlider tvs={featuredTvs} />
        </Row>
        <Row className="favorite">
          <h2>Featured Movies</h2>
          <SimpleSlider movies={featuredMovies} />
        </Row>
        <br />
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatchToProps)(Profile);
