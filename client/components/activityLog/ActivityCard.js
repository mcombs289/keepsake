import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import RatedStars from "./RatedStars";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";
import { BsFillBookFill } from "react-icons/bs";
import { MdLocalMovies } from "react-icons/md";

TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");

export const ActivityCard = (props) => {
  const { activity } = props;

  return (
    <Container className="activity-log-card">
      <>
        {activity.book ? (
          <Container className="activity-log-card">
            <Col className="card-col" style={{ borderRadius: "15px" }}>
              <Row>
                <Col lg={3} md={12} sm={12} className="d-none d-sm-block">
                  <Link to={`/book/${activity.book.id}`}>
                    <img
                      src={activity.book.imageUrl}
                      alt="book-image"
                      className="activity-card-img"
                    />{" "}
                  </Link>
                </Col>
                <Col lg={9} md={12} sm={12} className="post-info">
                  <Row>
                    <Col lg={1} md={1} sm={1}>
                      <Link to={`/users/${activity.user.id}`}>
                        <img
                          src={activity.user.image}
                          className="post-user-image"
                        />
                      </Link>
                    </Col>
                    <Col lg={11} md={11} sm={11}>
                      <h3 className="post-title">
                        {activity.user.firstName} {activity.user.lastName}{" "}
                        reviewed {activity.book.title}
                      </h3>
                    </Col>
                  </Row>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                  >
                    <RatedStars rating={activity.rating} />
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {timeAgo.format(new Date(activity.updatedAt))}
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {activity.content}
                  </Card.Text>
                </Col>
                <div className="innerdiv">
                  <BsFillBookFill size={30} color="#03045E" />
                </div>
              </Row>
            </Col>
          </Container>
        ) : activity.tv ? (
          <Container className="activity-log-card">
            <Col className="card-col" style={{ borderRadius: "15px" }}>
              <Row>
                <Col lg={3} md={12} sm={12} className="d-none d-sm-block">
                  <Link to={`/tvshows/${activity.tv.id}`}>
                    <img
                      src={activity.tv.imageUrl}
                      alt="tv-image"
                      className="activity-card-img"
                    />{" "}
                  </Link>
                </Col>
                <Col lg={9} md={12} sm={12} className="post-info">
                  <Row>
                    <Col lg={1} md={1} sm={1}>
                      <Link to={`/users/${activity.user.id}`}>
                        <img
                          src={activity.user.image}
                          className="post-user-image"
                        />
                      </Link>
                    </Col>
                    <Col lg={11} md={11} sm={11}>
                      <h3 className="post-title">
                        {activity.user.firstName} {activity.user.lastName}{" "}
                        reviewed {activity.tv.title}
                      </h3>
                    </Col>
                  </Row>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                  >
                    <RatedStars rating={activity.rating} />
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {timeAgo.format(new Date(activity.updatedAt))}
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {activity.content}
                  </Card.Text>
                </Col>
                <div className="innerdiv">
                  <img
                    src="https://i.pinimg.com/originals/9e/d8/61/9ed86194c90b60ad5ce0e14fdb1b97d5.png"
                    alt="tvimage"
                    style={{ height: "30px" }}
                  />
                </div>
              </Row>
            </Col>
          </Container>
        ) : (
          <Container className="activity-log-card">
            <Col className="card-col" style={{ borderRadius: "15px" }}>
              <Row>
                <Col lg={3} md={12} sm={12} className="d-none d-sm-block">
                  <Link to={`/movies/${activity.movie.id}`}>
                    <img
                      src={activity.movie.imageUrl}
                      alt="book-image"
                      className="activity-card-img"
                    />{" "}
                  </Link>
                </Col>
                <Col lg={9} md={12} sm={12} className="post-info">
                  <Row>
                    <Col lg={1} md={1} sm={1}>
                      <Link to={`/users/${activity.user.id}`}>
                        <img
                          src={activity.user.image}
                          className="post-user-image"
                        />
                      </Link>
                    </Col>
                    <Col lg={11} md={11} sm={11}>
                      <h3 className="post-title">
                        {activity.user.firstName} {activity.user.lastName}{" "}
                        reviewed {activity.movie.title}
                      </h3>
                    </Col>
                  </Row>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem", paddingTop: "1rem" }}
                  >
                    <RatedStars rating={activity.rating} />
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {timeAgo.format(new Date(activity.updatedAt))}
                  </Card.Text>
                  <Card.Text
                    className="text-left"
                    style={{ paddingLeft: "1rem" }}
                  >
                    {activity.content}
                  </Card.Text>
                </Col>
                <div className="innerdiv">
                  <MdLocalMovies size={30} color="#03045E" />
                </div>
              </Row>
            </Col>
          </Container>
        )}
      </>
    </Container>
  );
};

export default ActivityCard;
