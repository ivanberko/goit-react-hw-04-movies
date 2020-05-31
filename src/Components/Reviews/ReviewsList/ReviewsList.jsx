import React from "react";
import PropTypes from "prop-types";


const ReviewsList = ({ reviews = [] }) =>
  reviews.length ? (
    reviews.map(({ author, content, id }) => (
      <li key={id}>
        <h4>Author: {author}</h4>
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
