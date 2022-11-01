import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { removeFriend, addFriend } from "../../store";
import ScrollToTop from "react-scroll-to-top";

export const SearchFor = () => {
  const { title } = useParams();
  const dispatch = useDispatch();

  const titleFilter = (item) =>
    item.title.toLowerCase().includes(title.toLowerCase());
  const nameFilter = (user) =>
    user.firstName.toLowerCase().includes(title.toLowerCase());

  const auth = useSelector((state) => state.auth);
  const tvshows = useSelector((state) => state.tvs).filter(titleFilter);
  const movies = useSelector((state) => state.movies).filter(titleFilter);
  const books = useSelector((state) => state.books).filter(titleFilter);
  const users = useSelector((state) => state.users).filter(nameFilter);
  const count = useSelector((state) => state.count);

  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  // toggle button
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  // carousel for search results
  const settings = {
    dots: movies.length < 30,
    infinite: false,
    centerPadding: "80px",
    slidesToShow: 5,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          dots: movies.length < 30,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          dots: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
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

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="search-results">
          <Row className="searched-for">
            <Col lg={4} sm={12}>
              <Row>
                <h3 style={{ paddingLeft: "5rem", paddingTop: "2rem" }}>
                  You searched for: {title}
                </h3>
              </Row>
            </Col>
            <Col lg={4} sm={12}>
              {!isOn ? (
                <Row className="add-button" style={{ textAlign: "center" }}>
                  <h3>Don't see your favorite?</h3>
                  <Button
                    style={{
                      backgroundColor: "#023E8A",
                      color: "#dcdf00",
                    }}
                    className="add-button-button"
                    as={Link}
                    to={"/add"}
                  >
                    Add it!
                  </Button>
                </Row>
              ) : null}
            </Col>
            <Col
              lg={4}
              sm={12}
              style={{ paddingTop: "2rem", paddingRight: "5rem" }}
            >
              {isOn ? (
                <p style={{ textAlign: "right" }}>
                  Toggle to search for products
                </p>
              ) : (
                <p style={{ textAlign: "right" }}>Toggle to search for users</p>
              )}

              <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
              </div>
            </Col>
          </Row>

          {isOn ? (
            <div className="tvs people">
              {users.length > 0 ? (
                <h3 style={{ paddingTop: "2rem" }}>People: ({users.length})</h3>
              ) : (
                <h3>No users with the name "{title}"</h3>
              )}
              {
                <>
                  <ScrollToTop smooth color="#6f00ff" />
                  <Row>
                    <List>
                      {users.map((user) => {
                        const isFriend = auth.friend.find(
                          (friend) => friend.id === user.id
                        );

                        return (
                          <Link
                            to={`/users/${user.id}`}
                            key={user.id}
                            style={{ textDecoration: "none", color: "#03045e" }}
                          >
                            <ListItem>
                              <ListItemAvatar>
                                <img
                                  src={user.image}
                                  style={{
                                    width: "100px",
                                    borderRadius: "100%",
                                    padding: "15px",
                                  }}
                                />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      fontSize="1.8rem"
                                    >
                                      {`${user.firstName} ${user.lastName}`}
                                    </Typography>
                                  </React.Fragment>
                                }
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: "inline" }}
                                      component="span"
                                      fontSize="1.2rem"
                                    >
                                      {` — ${user.bio}…`}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                              <div style={{ textAlign: "right" }}>
                                {isFriend ? (
                                  <ListItemButton
                                    sx={{
                                      backgroundColor: "#03045e",
                                      color: "white",
                                      width: 100,
                                      justifyContent: "center",
                                    }}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      event.preventDefault();
                                      dispatch(removeFriend(user.id));
                                    }}
                                  >
                                    Unfollow
                                  </ListItemButton>
                                ) : (
                                  <ListItemButton
                                    sx={{
                                      backgroundColor: "#dcdf00",
                                      color: "#03045e",
                                      width: 100,
                                      justifyContent: "center",
                                    }}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      event.preventDefault();
                                      dispatch(addFriend(user.id));
                                    }}
                                  >
                                    Follow
                                  </ListItemButton>
                                )}
                              </div>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                          </Link>
                        );
                      })}
                    </List>
                  </Row>
                </>
              }
            </div>
          ) : (
            <div>
              {tvshows.length > 0 ? (
                <div className="tvs">
                  <h3>Shows: ({tvshows.length})</h3>
                  <Row>
                    <Slider {...settings}>
                      {tvshows.map((tvshow) => {
                        return (
                          <Col key={tvshow.id} style={{ margin: "2rem" }}>
                            <Link to={`/tvshows/${tvshow.id}`}>
                              <Card.Img
                                className="card-img"
                                variant="top"
                                src={tvshow.imageUrl}
                                alt="tv-image"
                                style={{ height: "340px" }}
                              />
                            </Link>
                          </Col>
                        );
                      })}
                    </Slider>
                  </Row>
                </div>
              ) : null}

              <br />
              {movies.length > 0 ? (
                <div className="movies">
                  <h3>Movies: ({movies.length})</h3>
                  <Row>
                    <Slider {...settings}>
                      {movies.map((movie) => {
                        return (
                          <Col key={movie.id} style={{ margin: "2rem" }}>
                            <Link to={`/movies/${movie.id}`}>
                              <Card.Img
                                className="card-img"
                                variant="top"
                                src={movie.imageUrl}
                                alt="movie-image"
                                style={{ height: "340px" }}
                              />
                            </Link>
                          </Col>
                        );
                      })}
                    </Slider>
                  </Row>
                </div>
              ) : null}

              <br />

              {books.length > 0 ? (
                <div className="books">
                  <h3>Books: ({books.length})</h3>
                  <Row>
                    <Slider {...settings}>
                      {books.map((book) => {
                        return (
                          <Col key={book.id} style={{ margin: "2rem" }}>
                            <Link to={`/books/${book.id}`}>
                              <Card.Img
                                className="card-img"
                                variant="top"
                                src={book.imageUrl}
                                alt="book-image"
                                style={{ height: "340px" }}
                              />
                            </Link>
                          </Col>
                        );
                      })}
                    </Slider>
                  </Row>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFor;
