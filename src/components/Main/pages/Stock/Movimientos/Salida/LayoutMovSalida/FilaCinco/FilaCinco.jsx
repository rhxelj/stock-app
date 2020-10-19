import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
// import useStyles from "../styles";
import ComboBCC from "../../../../../../../lib/ComboBCC";
// import { agregaStock } from "../../agregaStock";
import Confirmacion from "./Confirmacion";

import { useContext } from "react";

import { StkMovSalidaContext } from "../../StkMovSalida";

import { initial_state } from "../../Initial_State";

// import { stkitemsmodstock } from "../../../../Items/StkItemsModStock"; //"../../../Items/StkItemsModStock";
// import { stkenvaseagregar } from "../../../../Envase/StkEnvaseAgregar";
// import { stkitemsleedisp } from "../../../../Items/StkItemsLeeDisp";
import { verificaDisp } from "../../verificaDisp";
import { descargaStock } from "../descargaStock"
import { Exito } from "../../../../../../../../Ui-Components/Exito"



export default function Fila() {
  const { state, setState } = useContext(StkMovSalidaContext);

  async function confirmar() {
    const [faltante, total] = await verificaDisp(state);
    setState({
      ...state,
      total: total,
      faltante: faltante
    }); // las hago global en el contexto de Movimiento de Salida
  };

  useEffect(() => {

    if (state.faltante > 0) {
      setState({ ...state, confOpen: true })
    } else {
      descargaStock(state)
      setState(initial_state)
    }
  }, [state.total, state.faltante]);

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
        < Confirmacion
          open={state.confOpen}
          title="Movimiento de Salida"
          contentText={`ATENCION NO ALCANZA EL STOCK`}
        />
        <Exito open={state.exito} closeAction={actions.cancelAction} />
      </Grid>
    </>
  );
}
