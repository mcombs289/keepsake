import React from "react";
import { Container } from "react-bootstrap";

export const Genres = ({ movies }) => {
  const genreArr = [];

  for (let i = 0; i < movies.length; i++) {
    let currentMovie = movies[i];
    let { genre } = currentMovie || "";
    if (genre) {
      genre.forEach((item) => {
        if (!genreArr.includes(item)) {
          genreArr.push(item);
        }
      });
    }
  }

  return (
    <Container>
      {genreArr.map((genre) => (
        <button key={genre}>{genre}</button>
      ))}
    </Container>
  );
};
export default Genres;
