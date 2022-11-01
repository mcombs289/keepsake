import React from "react";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import Profile from "./Profile";

const UserProfilePage = () => {
  let user = useSelector((state) => state.auth);
  const count = useSelector((state) => state.count);

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container fluid className="profile">
          <Profile user={user} />
        </Container>
      )}
    </div>
  );
};

export default UserProfilePage;
