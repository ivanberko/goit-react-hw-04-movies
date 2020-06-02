import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { reviewsItem, reviewsAuthor } from "./ReviewsList.module.css";


const ReviewsList = ({ reviews = [] }) =>
  reviews.length ? (
    reviews.map(({ author, content, id }) => (
      <li key={id} className={reviewsItem}>
        <h4 className={reviewsAuthor}>Author: {author}</h4>
        <p>{content}</p>
      </li>
    ))
  ) : (
    <p>We don`t have reviews for this movie.</p>
  );

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
export default ReviewsList;
