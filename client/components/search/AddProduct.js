import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, InputGroup, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { fetchCreateBook } from "../../store/books";
import { fetchCreateMovie } from "../../store/movies";
import { fetchCreateTv } from "../../store/tvshows";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [selectedOption, setSelectedOption] = useState("book");
  const count = useSelector((state) => state.count);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const title = evt.target.title.value;
    const description = evt.target.description.value;
    const genrePreSplit = evt.target.genre.value;
    const genre = genrePreSplit.split(",");
    const imageUrl = evt.target.image.value;

    if (selectedOption === "book") {
      const author = evt.target.author.value;
      dispatch(
        fetchCreateBook(
          { title, author, description, genre, imageUrl },
          navigate
        )
      );

      if(!author) {
        return alert(`Author must be included`);
      };

    }
    if (selectedOption === "movie") {
      dispatch(
        fetchCreateMovie({ title, description, genre, imageUrl }, navigate)
      );
    }
    if (selectedOption === "tv") {
      dispatch(
        fetchCreateTv({ title, description, genre, imageUrl }, navigate)
      );
    }

    if (!title) {
      return alert(`Title must be included`);
    }

    if(!imageUrl) {
      return alert(`Image must be included`);
    }

  };

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container className="add-product-form">
          <h1>Add a new Book, TV Show, or Movie!</h1>
          <div style={{ paddingLeft: "30%", marginBottom: "2rem" }}>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
              }}
            >
              <option value="book">Book</option>
              <option value="movie">Movie</option>
              <option value="tv">Tv Show</option>
            </select>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <div>
                <label htmlFor="title"></label>
                <input name="title" placeholder="Title" type="text" />
              </div>

              {selectedOption === "book" ? (
                <div>
                  <label htmlFor="author"></label>
                  <input name="author" placeholder="Author" type="text" />
                </div>
              ) : null}
            </Row>
            <Row>
              <div>
                <label htmlFor="description"></label>
                <input
                  name="description"
                  placeholder="Description"
                  type="text"
                />
              </div>

              <div>
                <label htmlFor="genre"></label>
                <input name="genre" placeholder="Genres" type="text" />
              </div>

              <div>
                <label htmlFor="image"></label>
                <input name="image" placeholder="Cover Image" type="text" />
              </div>
            </Row>
            <Row style={{ justifyContent: "center" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </div>
  );
};

export default AddProduct;
