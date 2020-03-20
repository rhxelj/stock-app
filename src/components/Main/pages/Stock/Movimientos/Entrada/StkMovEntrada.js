import React, { Fragment, useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

import useStyles from "./StkMovEntradaStyle";
import FilaUno from "./LayoutMovEntrada/FilaUno";
import FilaDos from "./LayoutMovEntrada/FilaDos";
import FilaTres from "./LayoutMovEntrada/FilaTres";
import FilaCuatro from "./LayoutMovEntrada/FilaCuatro";
import FilaCinco from "./LayoutMovEntrada/FilaCinco";
import { initial_state } from "./Initial_State";

// import { stkgrupolee } from "../../Grupos/StkGrupoLee";

export const StkMovEntradaContext = React.createContext();

// const GRI_initial_state = {
//   idStkGrupo: "",
//   idStkRubro: "",
//   idStkItems: ""
// };

// const data_initial_state = {
//   cantidad: "",
//   StkRubroPres: "",
//   StkItemsCantDisp: "",
//   StkItemsCantidad: "",
//   StkEnvasePartida: "",
//   StkEnvaseUbG: "",
//   StkEnvaseUbF: "",
//   StkEnvaseObserv: ""
// };

var StkMovEntrada = props => {
  const [state, setState] = useState(initial_state);
  // const [GRI, setGRI] = useState(GRI_initial_state); //la uso como variable para pasarla a la columna2

  // var [GRI, setGRI] = useState(GRI_initial_state); //la uso como variable para pasarla a la columna2
  // const [data, setData] = useState(data_initial_state);

  const classes = useStyles();

  // async function stkgrupoleer() {
  //   const result = await stkgrupolee();
  //   setState({ ...state, stkgrupo: result });
  // }
  // useEffect(() => {
  //   console.log("en stkmoventrada en state.stkgrupo  ");
  //   console.log(state.stkgrupo);

  //   if (state.stkgrupo.length === 0) {
  //     stkgrupoleer();
  //   }
  // }, [state.stkgrupo]);

  return (
    <div>
      <Container>
        <Grid container spacing={6}>
          <StkMovEntradaContext.Provider
            value={{
              state: state,
              setState: setState

              // GRI: GRI,
              // setGRI: setGRI
              // data: GRI,
              // stkgrupoleer: stkgrupoleer
              // data: data,
              // setData: setData,
            }}
          >
            <FilaUno /> {/* Fecha */}
            {/* Grupo, Rubro, Items, Cant. Disp., Cant, Min. */}
            <FilaDos />
            {/* Fila Cantidd, Pres. Desc., Pres., UM,Ancho */}
            <FilaTres />
            {/* Fila Partida, Ub. Geo., Ub. Fisc., Observaciones */}
            <FilaCuatro />
            {/* Fila Confirma, Cancela, Borra */}
            <FilaCinco />
          </StkMovEntradaContext.Provider>
        </Grid>
      </Container>
    </div>
  );
};
export default StkMovEntrada;
