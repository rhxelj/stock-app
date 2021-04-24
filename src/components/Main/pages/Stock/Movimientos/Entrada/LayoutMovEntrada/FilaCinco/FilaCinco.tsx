import React from "react";
import Grid from "@material-ui/core/Grid";
// import useStyles from "../styles";
import ComboBCC from "../../../../../../../lib/ComboBCC";
// import { agregaStock } from "../../agregaStock";
import Confirmacion from "./Confirmacion";

import { useContext } from "react";
import { StkMovEntradaContext } from "../../StkMovEntrada";
import { initial_state } from "../../Initial_State";

import { stkitemsmodstock } from "../../../../Items/StkItemsModStock"; //"../../../Items/StkItemsModStock";
import { stkenvaseagregar } from "../../../../Envase/StkEnvaseAgregar";
import { stkitemsleedisp } from "../../../../Items/StkItemsLeeDisp";

import ImprimirEtiquetas from "../../../../../Impresion/ImprimirEtiquetas";
// import imprimirQr from "../../../../../Impresion/ImprimirEtiquetas/imprimirQR"
// import { imprimirQr } from "../../../../../Impresion/ImprimirEtiquetas/imprimirQR";

export default function Fila() {
  const { state, setState } = useContext(StkMovEntradaContext);

  //Control del Dialogo INICIO
  // const [open, setOpen] = React.useState(false);
  const [cantidaddisponible, setCantidaddisponible] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  //Control del Dialogo  FIN

  // const imprimir_etiquetas = () => {
  //   handleClose();
  //   // llamo al componente a imprimir y le paso el dato de ubicacion fisica
  //   console.log(
  //     "Fila Cinco contenido de state.StkEnvaseUbG -> ",
  //     state.StkEnvaseUbG
  //   );
  //   imprimirQr(state.StkEnvaseUbG);

  //   setState(initial_state);
  //   // setState(() => {
  //   //   return initial_state;
  //   // });

  //   setState({ ...state, imp_etiquetas: true });
  // };

  // const confirmar = async (state: object) => {
  const confirmar = async (state: Object) => {
    await stkitemsmodstock(state);
    await stkitemsmodstock(state);
    console.log('state en filacinco  ', state)
    await stkenvaseagregar(state);
    const cantidaddisponible = await stkitemsleedisp(state);
    setCantidaddisponible(cantidaddisponible);
    // handleClickOpen();
    setState({ ...state, confOpen: true });
    // imprimir_etiquetas();
    // setState(initial_state);
  };

  const actions = {
    confirmAction: () => confirmar(state), //Accion a ejecutar en caso de Aceptar
    cancelAction: () => setState(initial_state), //Accion a ejecutar en caso de cancelar
    confirmText: "CONFIRMAR", //Texto en caso de afirmativo
    cancelText: "CANCELAR", //Texto en caso de No afirmativo
  };

  return (
    <>
      <Grid container item spacing={2} justify="flex-end">
        <ComboBCC actions={actions} />

        <Confirmacion
          open={state.confOpen}
          title="Movimiento de Entrada"
          contentText={`Cambio efectuado cantidad disponible ${cantidaddisponible}`}
        // handleClose={handleClose}
        // imprimir={imprimir_etiquetas}
        />

        <ImprimirEtiquetas
          open={state.imp_etiquetas} //inicialmente este componente no se muestra
        // title="Impresion De Etiquetas"
        // contentText="Imprimio correctamente ?"
        />
      </Grid>
    </>
  );
}
