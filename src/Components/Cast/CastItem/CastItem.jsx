import React from "./node_modules/react";
import PropTypes from "./node_modules/prop-types";
import { getPoster } from "../../../utils/helpers";
import { castItem, castPhoto, castNoPhoto } from "./CastItem.module.css";

const CastList = ({ cast = [] }) =>
  cast.map(({ credit_id, profile_path, character, name }) => (
    <li key={credit_id} className={castItem}>
      {profile_path ? (
        <img src={getPoster(profile_path, "h100")} alt="" className={castPhoto} />
      ) : (
        <p className={castNoPhoto}>No photo</p>
      )}
      <p>{name}</p>
      <p>Character: {character}</p>
    </li>
  ));

CastList.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      credit_id: PropTypes.string.isRequired,
      profile_path: PropTypes.string,
      character: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default CastList;
