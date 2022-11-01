import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { addFriend, removeFriend } from "../../store/auth";
import Stats from "./Stats";

const Banner = (props) => {
  const { user } = props;
  let auth = useSelector((state) => state.auth);
  const isFriend = auth.friend.find((friend) => friend.id === user.id);
  const isOwnProfile = () => {
    return auth.id === user.id;
  };
  const dispatch = useDispatch();

  return (
    <Container fluid>
      <Row>
        <Col
          className="banner-image"
          style={{
            backgroundImage: `url(${user.bannerImage}) `,
          }}
        >
          <Row>
            <Col>
              <img
                src={user.image}
                className="banner-profile-image d-block mx-auto"
                alt="image"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="user-info">
        <Col sm={11} className="">
          <h1 style={{ fontSize: "60px", margin: "2rem" }}>
            {user.firstName} {user.lastName}
          </h1>

          <p style={{ margin: "2rem" }}>{user.bio} </p>
        </Col>

        <Col sm={1} style={{ textAlign: "right" }}>
          {!isOwnProfile() ? (
            isFriend ? (
              <button
                style={{
                  padding: "1rem",
                  marginTop: "1rem ",
                }}
                onClick={() => dispatch(removeFriend(user.id))}
              >
                Unfollow
              </button>
            ) : (
              <button
                style={{ padding: "1rem", marginTop: "1rem " }}
                onClick={() => dispatch(addFriend(user.id))}
              >
                Follow
              </button>
            )
          ) : null}
        </Col>
      </Row>
      <Stats user={user} />

      <hr />
    </Container>
  );
};

export default Banner;
