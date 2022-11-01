import React from "react";
import { Container, Row, Col } from "react-bootstrap";
/**
 * COMPONENT
 */
export const PageNotFound = (props) => {
  let pathname = window.location.pathname;
  pathname = pathname.slice(1);
  return (
    <div>
      <Container className="pageNotFoundContainer">
        <Row>
          <Col>
            <h1>Oh no... looks like page {pathname} does't exist.</h1>
            <img src="/images/404image.jpeg" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageNotFound;
