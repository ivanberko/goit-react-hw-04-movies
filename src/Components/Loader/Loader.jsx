import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

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
