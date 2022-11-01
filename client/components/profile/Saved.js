import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Banner from "./Banner";
import { Container, Row, Col } from "react-bootstrap";
import Filter from "./Filter";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchDeleteUserBook } from "../../store/userBooks";
import { fetchDeleteUserMovie } from "../../store/userMovies";
import { fetchDeleteUserTv } from "../../store/userTvShows";

export const Saved = () => {
  const user = useSelector((state) => state.auth);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const tvs = user?.tvs || [];
  const books = user?.books || [];
  const movies = user?.movies || [];

  //Sorted and filtered books, tv, movies
  const savedBooks = books
    .filter((book) => book.user_book.status === "Saved")
    .sort((a, b) => a.title.localeCompare(b.title));
  const savedMovies = movies
    .filter((movie) => movie.user_movie.status === "Saved")
    .sort((a, b) => a.title.localeCompare(b.title));
  const savedTvs = tvs
    .filter((tv) => tv.user_tv.status === "Saved")
    .sort((a, b) => a.title.localeCompare(b.title));
  const savedAll = [...savedMovies, ...savedTvs, ...savedBooks].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  const [activeType, setActiveType] = useState("all");
  const [filtered, setFiltered] = useState(savedAll);

  //toggle stuff
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const handleDelete = (evt, id, productType) => {
    evt.preventDefault();
    let text = `You are deleting something`;
    if (confirm(text) == true) {
      if (productType === "book") {
        dispatch(
          fetchDeleteUserBook({
            userId: user.id,
            bookId: id,
          })
        );
      }
      if (productType === "movie") {
        dispatch(
          fetchDeleteUserMovie({
            userId: user.id,
            movieId: id,
          })
        );
      }
      if (productType === "tvshow") {
        dispatch(
          fetchDeleteUserTv({
            userId: user.id,
            tvId: id,
          })
        );
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
        <Container fluid>
          <Row>
            <Col>
              <Banner user={user} />
            </Col>
          </Row>
          <h1 style={{ paddingLeft: "1rem" }}>Saved</h1>
          <Row>
            <Col>
              <Filter
                activeType={activeType}
                setActiveType={setActiveType}
                setFiltered={setFiltered}
                movies={savedMovies}
                tvs={savedTvs}
                books={savedBooks}
                all={savedAll}
              />
            </Col>
            <Col>
              <div className="switch" data-ison={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: "2rem", marginLeft: "2rem" }}>
            <motion.div layout className="popular-movies">
              {filtered.map((item) => {
                return (
                  <AnimatePresence key={item.id}>
                    <motion.div
                      layout
                      animate={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      {/* <h2>{item.title}</h2> */}
                      <Link to={`/${item.productType}s/${item.id}`}>
                        <img src={item.imageUrl} alt="image" />
                      </Link>
                      {isOn ? (
                        <button
                          className="toggle-delete"
                          onClick={(evt) =>
                            handleDelete(evt, item.id, item.productType)
                          }
                        >
                          delete
                        </button>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                );
              })}
            </motion.div>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Saved;
