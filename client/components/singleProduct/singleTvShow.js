import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Button, Col, Card, Row, Container } from "react-bootstrap";
import { fetchSingleTv } from "../../store/tv";
import { getReviews } from "../../store/reviews";
import { Rating } from "react-simple-star-rating";
import { fetchUserTv, fetchUpdateUserTv } from "../../store/userTv";
import { fetchCreateUserTv } from "../../store/userTvShows";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReviewForm from "./ReviewForm";
import SelectDropDown from "./SelectDropDown";
import RatedStars from "../activityLog/RatedStars";
import Slider from "react-slick";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const SingleTvShow = () => {
  const auth = useSelector((state) => state.auth);
  const tv = useSelector((state) => state.tv);
  const reviews = useSelector((state) => state.reviews);
  const count = useSelector((state) => state.count);
  const { imageUrl, title, description, starRating } = tv;
  const userTv = useSelector((state) => state.userTv);
  const dispatch = useDispatch();
  const { id } = useParams();
  let favorite = userTv ? userTv.favorite : null;
  let featured = userTv ? userTv.featured : null;
  let status = userTv ? userTv.status : null;

  const settings = {
    dots: reviews.length < 40,
    className: "center",

    centerPadding: "80px",
    infinite: false,
    slidesToShow: 3,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [{ breakpoint: 1500, settings: { dots: false } }],
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          content: " url(../images/next.png)",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          content: " url(../images/back.png)",
        }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    dispatch(fetchUserTv({ userId: auth.id, tvId: id }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSingleTv(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReviews("tv", id));
  }, [dispatch]);

  //update status tv
  const selectOptions = ["Status", "Saved", "Watched"];
  const [selected, setSelected] = useState(selectOptions[0]);

  //update featured tvs
  const handleFeaturedClick = (evt) => {
    evt.preventDefault();
    if (userTv) {
      featured === true ? (featured = false) : (featured = true);
      dispatch(
        fetchUpdateUserTv({
          userId: auth.id,
          tvkId: id,
          featured,
          status: "Watched",
        })
      );
    } else {
      featured = true;
      dispatch(
        fetchCreateUserTv({
          userId: auth.id,
          tvId: id,
          favorite: true,
          status: "Watched",
        })
      );
    }
    window.location.reload(false);
  };

  //update favorite tv
  const favoriteTv = auth.tvs.filter((tv) => tv.user_tv.favorite === true)[0];

  const handleFavoriteClick = (evt) => {
    evt.preventDefault();
    if (userTv) {
      if (favorite) {
        favorite = false;
        dispatch(fetchUpdateUserTv({ userId: auth.id, tvId: id, favorite }));
      } else {
        let text = `You already have a tv show!\nBy clicking OK you will change your favorite tv to ${title} permanently`;
        if (favoriteTv) {
          if (confirm(text) == true) {
            text = "You pressed OK!";
            dispatch(
              fetchUpdateUserTv({
                userId: auth.id,
                tvId: favoriteTv.id,
                favorite: false,
                status: "Watched",
              })
            );
            dispatch(
              fetchUpdateUserTv({
                userId: auth.id,
                tvId: id,
                favorite: true,
                status: "Watched",
              })
            );
          } else {
            text = "You canceled!";
          }
        } else {
          dispatch(
            fetchUpdateUserTv({
              userId: auth.id,
              tvId: id,
              favorite: true,
              status: "Watched",
            })
          );
        }
      }
    } else {
      if (favorite) {
        favorite = false;
        dispatch(fetchUpdateUserTv({ userId: auth.id, tvId: id, favorite }));
      } else {
        let text = `You already have a tv show!\nBy clicking OK you will change your favorite tv to ${title} permanently`;
        if (favoriteTv) {
          if (confirm(text) == true) {
            text = "You pressed OK!";
            dispatch(
              fetchUpdateUserTv({
                userId: auth.id,
                tvId: favoriteTv.id,
                favorite: false,
                status: "Watched",
              })
            );
            dispatch(
              fetchCreateUserTv({
                userId: auth.id,
                tvId: id,
                favorite: true,
                status: "Watched",
              })
            );
          } else {
            text = "You canceled!";
          }
        } else {
          dispatch(
            fetchCreateUserTv({
              userId: auth.id,
              tvId: id,
              favorite: true,
              status: "Watched",
            })
          );
        }
      }
    }
    window.location.reload(false);
  };
  return (
    <div>
      {count ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container fluid className="single-view">
          <Row className="single-view-row">
            <Col className="single-product-left" lg={6} sm={12}>
              <img src={imageUrl} alt="book-image" />
            </Col>
            <Col className="single-product-info-right" lg={6} sm={12}>
              <div className="info-container">
                <h1>{title}</h1>
                <Rating
                  readonly={true}
                  initialValue={starRating}
                  allowFraction={true}
                  fillColor="#f1a545"
                />
                {reviews.length} Reviews
                <p>{description}</p>
                <SelectDropDown
                  status={status}
                  selectOptions={selectOptions}
                  selected={selected}
                  auth={auth}
                  id={id}
                />
                <Row className="single-product-button-row">
                  <Button onClick={handleFavoriteClick}>
                    {favorite === true ? (
                      <> Remove as Favorite </>
                    ) : (
                      <>
                        <FaHeart /> Make Favorite
                      </>
                    )}
                  </Button>
                  <Button onClick={handleFeaturedClick}>
                    {featured === true ? (
                      <>Remove from Featured </>
                    ) : (
                      <> Add to Featured </>
                    )}
                  </Button>
                </Row>
                <ReviewForm product={tv.productType} />
                <hr />
                <p style={{ textAlign: "left" }}>Reviews:</p>
                <Slider {...settings}>
                  {reviews.map((review) => (
                    <Row key={review.id}>
                      <Card
                        style={{
                          padding: "1rem",
                          width: "15rem",
                          height: "17rem",
                          alignItems: "center",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={review.user.image}
                          alt="review-user0image"
                          style={{
                            width: "5rem",
                            borderRadius: "100%",
                            marginTop: "1rem",
                          }}
                        ></Card.Img>
                        <Card.Title>
                          {review.user.firstName} {review.user.lastName}
                        </Card.Title>
                        <Card.Text>
                          <RatedStars rating={review.rating} />
                        </Card.Text>
                        <Card.Text
                          style={{
                            alignItem: "left",
                          }}
                        >
                          {review.content}
                        </Card.Text>
                      </Card>
                    </Row>
                  ))}
                </Slider>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SingleTvShow;
