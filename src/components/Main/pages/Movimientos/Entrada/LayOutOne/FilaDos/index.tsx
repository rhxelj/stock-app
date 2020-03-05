import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import F2C1 from "./F2C1";
import F2C2 from "./F2C2";

// import useStyles from "./styles";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";

const initial_state = {
  idStkGrupo: "",
  idStkRubro: "",
  idStkItems: ""
};
export default function Fila2() {
  // const classes = useStyles();

  var [GRI, setGRI] = useState(initial_state); //la uso como variable para pasarla a la columna2

  return (
    <>
      <Grid container spacing={3}>
        <F2C1 GRI={setGRI} />
        <F2C2 data={GRI} />
      </Grid>
    </>
  );
}
