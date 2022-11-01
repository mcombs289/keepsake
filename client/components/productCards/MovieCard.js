import React from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

export const MovieCard = (props) => {
  const { movies } = props;
  const { id, imageUrl, title } = movies;

  return (
    <Container fluid className="all-movies">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          style={{ width: "15rem", margin: "2rem", border: "none" }}
        >
          <Link to={`/movies/${movie.id}`} style={{ color: "inherit" }}>
            <Card.Img
              className="card-img"
              style={{ borderRadius: "1rem" }}
              variant="top"
              src={movie.imageUrl}
            />
          </Link>
        </Card>
      ))}
    </Container>
  );
};

export default MovieCard;
