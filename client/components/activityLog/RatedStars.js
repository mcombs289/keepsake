import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";

export const RatedStars = (props) => {
  return <Rating readonly={true} initialValue={props.rating} />;
};

export default RatedStars;
