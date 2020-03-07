import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import F2C1 from "./F2C1";
import F2C2 from "./F2C2";

// import useStyles from "./styles";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

export default function Fila2() {
  // const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <F2C1 />
        <F2C2 />
      </Grid>
    </>
  );
}
