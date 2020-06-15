import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > svg": {
      border: "4px solid #da3838",
      borderRadius: "50%",
      cursor: 'pointer',
      width: 60,
      height: 60,
      padding: 6,
      position: 'fixed',
      right:20,
      bottom: 40,
      zIndex: 111111,
    },
  },
}));

export default function ArrowUpward({onClickUpward}) {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={onClickUpward}>
      <ArrowUpwardIcon />
    </div>
  );
}
