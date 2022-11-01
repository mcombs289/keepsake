import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import { getActivityLog } from "../store/activityLog";
import ActivityCard from "./activityLog/ActivityCard";
import Pagination from "./allProducts/Pagination";

export const Home = () => {
  const userId = useSelector((state) => state.auth.id);
  let auth = useSelector((state) => state.auth);
  const count = useSelector((state) => state.count);
  let activityLog = useSelector((state) => state.activityLog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActivityLog(userId));
  }, [dispatch]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = activityLog.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Container fluid>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <ScrollToTop smooth color="#6f00ff" />

          <div className="activity-log">
            <h2
              style={{ textAlign: "center", fontWeight: 600, color: "#03045E" }}
            >
              Friend Activity
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "1rem",
                justifyContent: "center",
              }}
            >
              <Pagination
                itemsPerPage={postsPerPage}
                totalItems={activityLog.length}
                paginate={paginate}
              />
            </div>
            {currentPosts.length ? (
              currentPosts.slice(0).map((activity, index) => (
                <div key={index} style={{ textAlign: "center" }}>
                  <ActivityCard activity={activity} />
                </div>
              ))
            ) : (
              <div>
                <h1 style={{ margin: "2rem" }}>
                  Add some frieds to see posts!
                </h1>
                <img src="/images/friends.svg" />
              </div>
            )}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "2rem",
          justifyContent: "center",
        }}
      >
        <Pagination
          itemsPerPage={postsPerPage}
          totalItems={activityLog.length}
          paginate={paginate}
        />
      </div>
    </Container>
  );
};

export default Home;
