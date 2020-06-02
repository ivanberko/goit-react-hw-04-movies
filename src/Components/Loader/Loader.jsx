import React from "./node_modules/react";
import { css } from "./node_modules/@emotion/core";
import ClipLoader from "./node_modules/react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => (
  <ClipLoader
    css={override}
    size={35}
    color={"rgb(218, 56, 56)"}
  />
);

export default Loader;
