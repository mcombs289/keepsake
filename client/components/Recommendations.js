import React from "react";
import { Container, Col } from "react-bootstrap";

export const Recommendations = () => {
  return (
    <Container
      fluid
      style={{
        backgroundImage:
          "url(https://i.ytimg.com/vi/TG042Ugg5H8/maxresdefault.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "0px",
      }}
    >
      <Col
        md={12}
        style={{
          height: "1000px",
          textAlign: "center",
          paddingTop: "25rem",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "75px" }}>WE ARE COMING SOON</h2>
        <h6>Get Ready... We are currently working on something really cool</h6>
        <p>Recommendations launching soon!</p>
      </Col>
    </Container>
  );
};

export default Recommendations;
