import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import ComboBCC from "../../../../../../../lib/ComboBCC";
// import { agregaStock } from "../../agregaStock";
import Confirmacion from "./Confirmacion";

import { useContext } from "react";

import { StkMovSalidaContext } from "../../StkMovSalida";

import { initial_state } from "../../Initial_State";

import { stkitemsmodstock } from "../../../../Items/StkItemsModStock"; //"../../../Items/StkItemsModStock";
import { stkenvaseagregar } from "../../../../Envase/StkEnvaseAgregar";
import { stkitemsleedisp } from "../../../../Items/StkItemsLeeDisp";
import { verificaDisp } from "../../verificaDisp";
import { descargaStock } from "../descargaStock"
import { Exito } from "../../../../../../../../Ui-Components/Exito"
export default function Fila() {
  const { state, setState } = useContext(StkMovSalidaContext);

  //Control del Dialogo INICIO
  // const [open, setOpen] = React.useState(false);
  const [cantidaddisponible, setCantidaddisponible] = React.useState(false);

  // const confirmar = async () => {
  async function confirmar() {

    const [faltante, total] = await verificaDisp(state);
    setState({
      ...state,
      total: total,
      faltante: faltante
    }); // las hago global en el contexto de Movimiento de Salida

    // if (state.faltante > 0) {
    //   //ToDo: pongo confOpen en true
    //   //ToDo: muestro las opciones verificado / cancelar
    //   console.log("resultado es mayor que cero ");
    //   setState({ ...state, confOpen: true });
    // } else {
    //   //ToDo: Descargo directamente
    descargaStock(state)
    //   //ToDo: muestro cartel de Exito
    //   //ToDo: Pongo en Cero todos los campos
    //   console.log("Descargo estock directamente.....");
    // }
  };

  function variablesAuxiliares() {
    console.log("contenido de state.faltante : ", state.faltante);
    // console.log("contenido de faltante : ", faltante);
    console.log("contenido de state.total : ", state.total);
    // console.log("contenido de total : ", total);
  }
  function estado() {
    console.log("contenido de state => ");
    console.log(state);
  }

  useEffect(() => {
    // variablesAuxiliares()
    // estado()
    if (state.faltante >= 0) {
      setState({ ...state, confOpen: true })//ToDo: pongo confOpen en true
      //   //ToDo: muestro las opciones verificado / cancelar
      //   console.log("resultado es mayor que cero ");
      //   setState({ ...state, confOpen: true });
    } else {
      //   //ToDo: Descargo directamente
      //   //ToDo: muestro cartel de Exito
      //   //ToDo: Pongo en Cero todos los campos
      //   console.log("Descargo estock directamente.....");
    }
  }, [state.total, state.faltante]);



  function afuera() {
    console.log("Contenido de state fuera de la fuicnion confirmar => ", state)
  }
  const actions = {
    confirmAction: () => confirmar(), //Accion a ejecutar en caso de Aceptar
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
          title="Movimiento de Salida"
          contentText={`ATENCION NO ALCANZA EL STOCK`}
        />
      </Grid>
    </>
  );
}
