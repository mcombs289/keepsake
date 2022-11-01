import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import { me, logout } from "./store";
import NavigationBar from "./components/search/NavigationBar";
import SearchFor from "./components/search/SearchFor";
import AllTvShows from "./components/allProducts/AllTvShows";
import AllBooks from "./components/allProducts/AllBooks";
import AllMovies from "./components/allProducts/AllMovies";
import AllUsers from "./components/allProducts/AllUsers";
import SingleTvShow from "./components/singleProduct/singleTvShow";
import SingleBook from "./components/singleProduct/SingleBook";
import SingleMovie from "./components/singleProduct/SingleMovie";
import Saved from "./components/profile/Saved";
import Friends from "./components/profile/Friends";
import History from "./components/profile/History";
import Recommendations from "./components/Recommendations";
import Edit from "./components/profile/Edit";
import FriendsProfilePage from "./components/profile/FriendsProfilePage";
import UserProfilePage from "./components/profile/UserProfilePage";
import AddProduct from "./components/search/AddProduct";
import ReviewForm from "./components/singleProduct/ReviewForm";
import LandingPage from "./components/LandingPage";

const App = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(me());
  }, []);

  const handleClick = () => {
    dispatch(logout(navigate));
  };

  return (
    <div>
      <NavigationBar
        handleClick={handleClick}
        className="fixed-top"
        isLoggedIn={isLoggedIn}
      />
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/searchfor/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/users/:id" element={<FriendsProfilePage />} />
          <Route path="/profile/friends" element={<Friends />} />
          <Route path="/profile/history" element={<History />} />
          <Route path="/profile/saved" element={<Saved />} />
          <Route path="/profile/edit" element={<Edit />} />
          <Route path="/friend/:id" element={<FriendsProfilePage />} />
          <Route path="/reviewform" element={<ReviewForm />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/tvshows" element={<AllTvShows />} />
          <Route path="/tvshows/:id" element={<SingleTvShow />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/books/:id" element={<SingleBook />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/searchfor/:title" element={<SearchFor />} />
          <Route path="/add" element={<AddProduct />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/home" element={<AuthForm />} />
          <Route path="/searchfor/" element={<Navigate to="/" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
