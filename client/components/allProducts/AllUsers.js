import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { Pagination } from "./Pagination";
import UserCard from "../productCards/UserCard";

export const AllUsers = () => {
  const users = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="all-items">
          <Row xs={3} md={3}>
            {users.length
              ? users.map((user) => (
                  <Col key={user.id}>
                    <UserCard user={user} />
                  </Col>
                ))
              : null}
          </Row>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
