import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { fetchTvShows } from "../../store/tvshows";
import { fetchMovies } from "../../store/movies";
import { fetchBooks } from "../../store/books";
import { getAllUsers } from "../../store/users";
import SearchTabs from "./SearchTabs";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTvShows());
    dispatch(fetchMovies());
    dispatch(fetchBooks());
    dispatch(getAllUsers());
  }, [dispatch]);

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate(`/searchfor/${search}`);
  }

  return (
    <>
      <Row>
        <form onSubmit={handleSubmit}>
          <Col style={{ display: "flex", flexDirection: "row" }}>
            <input
              type="search"
              placeholder="Search for..."
              onChange={(evt) => setSearch(evt.target.value)}
              value={search}
              className="search-bar"
            />
            <Button
              type="submit"
              as={Link}
              to={`/searchfor/${search}`}
              style={{
                padding: "6px",
                borderRadius: "10px",
                backgroundColor: "transparent",
                border: "none",
                color: "#03045e",
              }}
            >
              <BsSearch size={30} />
            </Button>
          </Col>
        </form>
      </Row>
      <SearchTabs />
    </>
  );
};

export default SearchBar;
