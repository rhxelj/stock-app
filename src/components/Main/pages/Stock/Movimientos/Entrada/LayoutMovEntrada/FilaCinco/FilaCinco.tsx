import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import ComboBCC from "../../../../../../../lib/ComboBCC";
import { agregaStock } from "../../agregaStock";
import Confirmacion from "./Confirmacion";

import { useContext } from "react";
import { StkMovEntradaContext } from "../../StkMovEntrada";
import { initial_state } from "../../Initial_State";

import { stkitemsmodstock } from "../../../../Items/StkItemsModStock"; //"../../../Items/StkItemsModStock";
import { stkenvaseagregar } from "../../../../Envase/StkEnvaseAgregar";
import { stkitemsleedisp } from "../../../../Items/StkItemsLeeDisp";

export default function Fila() {
  const { state, setState } = useContext(StkMovEntradaContext);

  //Control del Dialogo INICIO
  const [open, setOpen] = React.useState(false);
  const [cantidaddisponible, setCantidaddisponible] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //Control del Dialogo  FIN

  const confirmar = async (state: object) => {
    await stkitemsmodstock(state);
    await stkenvaseagregar(state);
    const cantidaddisponible = await stkitemsleedisp(state);
    setCantidaddisponible(cantidaddisponible);
    handleClickOpen();
    setState(initial_state);
  };

  const actions = {
    confirmar: () => confirmar(state),
    cancelar: () => setState(initial_state) //cancelar(state)
  };

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        <ComboBCC actions={actions} />
        <Confirmacion
          open={open}
          title="Movimiento de Entrada"
          contentText={`Cambio efectuado cantidad disponible ${cantidaddisponible}`}
          handleClose={handleClose}
        />
      </Grid>
    </>
  );
}
