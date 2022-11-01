import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Button, Col, Card, Row, Container } from "react-bootstrap";
import { fetchSingleMovie } from "../../store/movie";
import { getReviews } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";
import { fetchUserMovie, fetchUpdateUserMovie } from "../../store/userMovie";
import { fetchCreateUserMovie } from "../../store/userMovies";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReviewForm from "./ReviewForm";
import SelectDropDown from "./SelectDropDown";
import RatedStars from "../activityLog/RatedStars";
import Slider from "react-slick";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const SingleMovie = () => {
  const auth = useSelector((state) => state.auth);
  const movie = useSelector((state) => state.movie);
  const reviews = useSelector((state) => state.reviews);
  const count = useSelector((state) => state.count);
  const { imageUrl, title, description, genre, starRating } = movie;
  const userMovie = useSelector((state) => state.userMovie);
  const dispatch = useDispatch();
  const { id } = useParams();

  let favorite = userMovie ? userMovie.favorite : null;
  let featured = userMovie ? userMovie.featured : null;
  let status = userMovie ? userMovie.status : null;

  const settings = {
    dots: reviews.length < 40,
    className: "center",
    infinite: false,
    centerPadding: "80px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [{ breakpoint: 1500, settings: { dots: false } }],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          content: " url(../images/next.png)",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          content: " url(../images/back.png)",
        }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    dispatch(fetchUserMovie({ userId: auth.id, movieId: id }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSingleMovie(id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getReviews("movie", id));
  }, [dispatch]);

  //update status movie
  const selectOptions = ["Status", "Saved", "Watched"];
  const [selected, setSelected] = useState(selectOptions[0]);

  //update featured movies
  const handleFeaturedClick = (evt) => {
    evt.preventDefault();
    if (userMovie) {
      featured === true ? (featured = false) : (featured = true);
      dispatch(
        fetchUpdateUserMovie({
          userId: auth.id,
          movieId: id,
          featured,
          status: "Watched",
        })
      );
    } else {
      dispatch(
        fetchCreateUserMovie({
          userId: auth.id,
          movieId: id,
          featured: true,
          status: "Watched",
        })
      );
    }
    window.location.reload(false);
  };

  //update favorite Movie
  const favoriteMovie = auth.movies.filter(
    (movie) => movie.user_movie.favorite === true
  )[0];

  const handleFavoriteClick = (evt) => {
    evt.preventDefault();
    if (userMovie) {
      if (favorite) {
        dispatch(
          fetchUpdateUserMovie({
            userId: auth.id,
            movieId: id,
            favorite: false,
            status: "Watched",
          })
        );
      } else {
        let text = `You already have a movie!\nBy clicking OK you will change your favorite movie to ${title} permanently`;
        if (favoriteMovie) {
          if (confirm(text) == true) {
            text = "You pressed OK!";
            dispatch(
              fetchUpdateUserMovie({
                userId: auth.id,
                movieId: favoriteMovie.id,
                favorite: false,
                status: "Watched",
              })
            );
            dispatch(
              fetchUpdateUserMovie({
                userId: auth.id,
                movieId: id,
                favorite: true,
                status: "Watched",
              })
            );
          } else {
            text = "You canceled!";
          }
        } else {
          dispatch(
            fetchUpdateUserMovie({
              userId: auth.id,
              movieId: id,
              favorite: true,
              status: "Watched",
            })
          );
        }
      }
    } else {
      if (favorite) {
        dispatch(
          fetchUpdateUserMovie({
            userId: auth.id,
            movieId: id,
            favorite: false,
            status: "Watched",
          })
        );
      } else {
        let text = `You already have a movie!\nBy clicking OK you will change your favorite movie to ${title} permanently`;
        if (favoriteMovie) {
          if (confirm(text) == true) {
            text = "You pressed OK!";
            dispatch(
              fetchUpdateUserMovie({
                userId: auth.id,
                movieId: favoriteMovie.id,
                favorite: false,
                status: "Watched",
              })
            );
            dispatch(
              fetchCreateUserMovie({
                userId: auth.id,
                movieId: id,
                favorite: true,
                status: "Watched",
              })
            );
          } else {
            text = "You canceled!";
          }
        } else {
          dispatch(
            fetchCreateUserMovie({
              userId: auth.id,
              movieId: id,
              favorite: true,
              status: "Watched",
            })
          );
        }
      }
    }
    window.location.reload(false);
  };

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container fluid className="single-view">
          <Row className="single-view-row">
            <Col className="single-product-left" lg={6} sm={12}>
              <img src={imageUrl} alt="movie-image" />
            </Col>
            <Col className="single-product-info-right" lg={6} sm={12}>
              <div className="info-container">
                <h1>{title}</h1>
                <Rating
                  readonly={true}
                  initialValue={starRating}
                  allowFraction={true}
                  fillColor="#f1a545"
                />
                {reviews.length} Reviews
                <p>{description}</p>
                <SelectDropDown
                  status={status}
                  selectOptions={selectOptions}
                  selected={selected}
                  auth={auth}
                  id={id}
                />
                <Row className="single-product-button-row">
                  <Button onClick={handleFavoriteClick}>
                    {favorite === true ? (
                      <> Remove as Favorite </>
                    ) : (
                      <>
                        <FaHeart /> Make Favorite
                      </>
                    )}
                  </Button>
                  <Button onClick={handleFeaturedClick}>
                    {featured === true ? (
                      <>Remove from Featured </>
                    ) : (
                      <> Add to Featured </>
                    )}
                  </Button>
                </Row>
                <ReviewForm product={movie.productType} />
                <hr />
                <p style={{ textAlign: "left" }}>Reviews:</p>
                <Slider {...settings}>
                  {reviews.map((review) => (
                    <Row key={review.id}>
                      <Card
                        style={{
                          padding: "1rem",
                          width: "15rem",
                          height: "17rem",
                          alignItems: "center",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={review.user.image}
                          alt="review-user0image"
                          style={{
                            width: "5rem",
                            borderRadius: "100%",
                            marginTop: "1rem",
                          }}
                        ></Card.Img>
                        <Card.Title>
                          {review.user.firstName} {review.user.lastName}
                        </Card.Title>
                        <Card.Text>
                          <RatedStars rating={review.rating} />
                        </Card.Text>
                        <Card.Text
                          style={{
                            alignItem: "left",
                          }}
                        >
                          {review.content}
                        </Card.Text>
                      </Card>
                    </Row>
                  ))}
                </Slider>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SingleMovie;
