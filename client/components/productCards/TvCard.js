import React from "react";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";

export const TvCard = (props) => {
  const { tvShow } = props;
  const { id, imageUrl, title } = tvShow;

  return (
    <Container fluid className="all-movies">
      {tvShow.map((tv) => (
        <Card
          key={tv.id}
          style={{ width: "15rem", margin: "2rem", border: "none" }}
        >
          <Link to={`/tvshows/${tv.id}`}>
            <Card.Img
              className="card-img"
              style={{ borderRadius: "1rem" }}
              variant="top"
              src={tv.imageUrl}
            />
          </Link>
        </Card>
      ))}
    </Container>
  );
};

export default TvCard;
