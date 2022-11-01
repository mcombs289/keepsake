import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { FaHeart } from "react-icons/fa";

export const BookCard = (props) => {
  const { books } = props;

  return (
    <Container fluid className="all-movies">
      {books.map((book) => (
        <Card
          key={book.id}
          style={{ width: "15rem", margin: "2rem", border: "none" }}
        >
          <Link to={`/books/${book.id}`}>
            <div className="wrapper">
              <Card.Img
                className="card-img"
                src={book.imageUrl}
                style={{ borderRadius: "1rem" }}
              ></Card.Img>
            </div>
          </Link>
        </Card>
      ))}
    </Container>
  );
};

export default BookCard;
