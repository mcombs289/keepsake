import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav } from "react-bootstrap";

export const SearchTabs = () => {
  let pathname = window.location.pathname;
  return (
    <div className="search-tabs">
      <Row>
        <Col>
          <Nav variant="pills" className="flex-row">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/books"
                eventKey="books"
                className="search-tabs-buttons"
              >
                Books
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/movies"
                eventKey="movies"
                className="search-tabs-buttons"
              >
                Movies
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/tvshows"
                eventKey="tvshows"
                className="search-tabs-buttons"
              >
                TV Shows
              </Nav.Link>
            </Nav.Item>

            <br />
          </Nav>
        </Col>
      </Row>
    </div>
  );
};

export default SearchTabs;
