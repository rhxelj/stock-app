import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import useStyles from "./styles";
import ComboBCC from "../../../../../../lib/ComboBCC";
import { agregaStock } from "../agregaStock";

import { useContext } from "react";
// import { StkMovEntradaContext } from "../Entrada/StkMovEntrada";
import { StkMovEntradaContext } from "../StkMovEntrada";
import { initial_state } from "../Initial_State";

import { stkitemsmodstock } from '../../../Items/StkItemsModStock';
import {stkenvaseagregar } from '../../../Envase/StkEnvaseAgregar';
import {stkitemsleedisp } from '../../../Items/StkItemsLeeDisp';


export default function Fila() {
  const classes = useStyles();
  const { state, setState } = useContext(StkMovEntradaContext);

  const confirmar = async state => {

    stkitemsmodstock(state)
   .then(stkenvaseagregar(state))
  //  .then(stkitemsleedisp(state))
  //  .then((resolve) => console.log('resolve  ' , resolve))

   const cantidaddisponible = await stkitemsleedisp(state);
   

  };
 
  const actions = {
    confirmar: () => confirmar(state).then(console.log("Cambio efectuado")),
    cancelar: () => setState(initial_state) //cancelar(state)

    // confirmar: () => agregaStock(state).then(alert("Cambio efectuado")),
    // confirmar: () => confirmar(state).then(setState(initial_state)),
    // cancelar: () => cancelar(state).then(state.reload)
  };

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        <ComboBCC actions={actions} />
      </Grid>
    </>
  );
}
