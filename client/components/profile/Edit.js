import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { updateAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import TemporaryDrawer from "./Drawer";

export function Edit(props) {
  const auth = useSelector((state) => state.auth);
  const authId = useSelector((state) => state.auth.id);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(auth.firstName);
  const [lastName, setLastName] = useState(auth.lastName);
  const [email, setEmail] = useState(auth.email);
  const [username, setUsername] = useState(auth.username);
  const [bio, setBio] = useState(auth.bio);
  const [image, setImage] = useState(auth.image);
  const [bannerImage, setBannerImage] = useState(auth.bannerImage);

  useEffect(() => {
    setFirstName(auth.firstName);
    setLastName(auth.lastName);
    setEmail(auth.email);
    setUsername(auth.username);
    setBio(auth.bio);
  }, [auth.firstName, auth.lastName, auth.email, auth.username, auth.bio]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert("Submitting form");
    dispatch(
      updateAuth(
        authId,
        { firstName, lastName, email, username, bio },
        navigate
      )
    );
  };

  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="edit-profile">
          <div style={{ textAlign: "right" }}>
            <TemporaryDrawer />
          </div>
          <h1>Edit Profile</h1>
          <div>
            <Row className="profile-row">
              <Col lg={4} sm={12}>
                <div className="edit-image">
                  <img
                    src={auth.image}
                    style={{ width: "250px", borderRadius: "100%" }}
                    alt="image"
                  />

                  <h6>Upload a different profile photo...</h6>
                </div>
              </Col>
              <Col lg={8} sm={12}>
                <form className="" onSubmit={handleSubmit}>
                  <Row className="input-row">
                    <Col lg={4} md={6} sm={6}>
                      <label htmlFor="firstName"> First Name: </label>
                      <input
                        type="text"
                        value={firstName || ""}
                        className="form-inputs"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <label htmlFor="lastName"> Last Name: </label>
                      <input
                        type="text"
                        value={lastName || ""}
                        className="form-inputs"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="input-row">
                    <Col lg={4} md={6} sm={6}>
                      <label htmlFor="email"> Email: </label>
                      <input
                        type="text"
                        value={email || ""}
                        className="form-inputs"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <label htmlFor="username"> Username: </label>
                      <input
                        type="text"
                        value={username || ""}
                        className="form-inputs"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="bio-row">
                    <Col>
                      <label htmlFor="bio"> Bio: </label>
                      <textarea
                        value={bio || ""}
                        className="bio-text"
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="submit">
                    <input
                      type="submit"
                      value="Submit"
                      className="submit-button"
                    />
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
