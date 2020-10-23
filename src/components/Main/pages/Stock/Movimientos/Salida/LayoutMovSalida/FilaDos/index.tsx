import React from "react";
import { Grid } from "@material-ui/core";
import F2C1 from "./F2C1";
import F2C2 from "./F2C2";

export default function Fila2() {
  // const classes = useStyles();

  return (
    <>
      <Grid item></Grid> {/*  Para dejar espacio  */}
      <Grid container justify="space-around" spacing={3}>
        <F2C1 />
        <F2C2 />
      </Grid>
    </>
  );
}
