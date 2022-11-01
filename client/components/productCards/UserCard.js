import React from "react";
import { Card, Container } from "react-bootstrap";
import { removeFriend } from "../../store/auth";
import { useDispatch } from "react-redux";

export const UserCard = ({ friend }) => {
  const { id, firstName, lastName, image, username } = friend;

  const dispatch = useDispatch();
  return (
    <Container className="all-users">
      <Card className="friend-card">
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Img src={image}></Card.Img>
          <Card.Title>
            {firstName} {lastName}
          </Card.Title>
          <Card.Title>{username}</Card.Title>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFriend(user.id));
            }}
          >
            Unfollow
          </button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserCard;
