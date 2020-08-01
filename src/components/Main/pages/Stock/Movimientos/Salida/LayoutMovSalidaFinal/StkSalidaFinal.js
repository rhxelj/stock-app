import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from './styles'
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { stkitemsleecodgrrbit } from "../../../Items/StkItemsLeeCodGrRbIt";
import FilaMuestraDatos from './FilaMuestraDatos'
// import { stkitemsleecodgrrbit } from "../../../../Items/StkItemsLeeCodGrRbIt";


// Context

import { useContext } from "react";
import { StkMovSalidaFinalContext } from './StkMovSalidaFinal'

export default function StkSalidaFinal(props) {
  // Context
  const { state, setState } = useContext(StkMovSalidaFinalContext);
  // const [state, setState] = useState({
  //   codqr: '',
  //   cantidad: '',
  //   largo: ''
  //   //   nroenvase: 0,
  //   // grupo: 0,
  //   // rubro: 0,
  //   // item: 0

  // }
  // );
  const [datosmuestra, setDatosMuestra] = useState({

    StkItemsFAct: "",
    StkItemsMin: null,
    StkItemsMax: null,
    StkItemsCantDisp: 0,
    StkItemsCantidad: 0
  }
  );

  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  const [open, setOpen] = useState(false);


  // 1#1#4#1#
  //1#1#4#1#VORTEX 200# VERDE RUT   28'07'2020 40 MTS 
  // 
  //  2#1#5#15#STANDARD 840"AZUL QUILMES"PAR"""30-07-2020"35"MTS 

  async function restastock() {
    var cantarestar = 0
    var largopasa = state.largo
    if (state.largo > 0) {
      cantarestar = state.cantidad * state.largo
    }
    else {
      cantarestar = state.cantidad
    }
    var nroenvase = await state.codqr.split("#")[0];
    var grupo = await state.codqr.split("#")[1];
    var rubro = await state.codqr.split("#")[2];
    var item = await state.codqr.split("#")[3];
    var detalle = await state.codqr.split("#")[4];

    const result = await stkitemsleecodgrrbit(grupo, rubro, item);

    setDatosMuestra((datosmuestra) => ({
      ...datosmuestra,
      StkItemsCantidad: result[0].StkItemsCantidad,
      StkItemsCantDisp: result[0].StkItemsCantDisp,
      StkItemsFAct: result[0].StkItemsFAct,
      StkItemsMin: result[0].StkItemsMin,
      StkItemsMax: result[0].StkItemsMax,
      detalle,
      cantarestar,
      largopasa,
      nroenvase,
      grupo,
      rubro,
      item
    }));
    handleClickOpen()
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const classes = useStyles();

  return (
    <>
      <Grid
        container
        alignItems="center"
        justify="flex-end"
        item
        spacing={3}
        xs={12}
      >
        {/* Cantidad Disponible */}
        < Grid item xs={3}>
          <TextField
            size="small"
            variant="outlined"
            id="codqr"
            value={state.codqr}
            label='Código QR : '
            className={classes.textField}

            onChange={handleChange}
            onKeyPress={event => {
              if (event.key === "Enter")
                document.getElementById("cantidad").focus();
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            size="small"
            variant="outlined"
            id='cantidad'
            value={state.cantidad}
            label='Cantidad : '
            type="number"
            className={classes.textField}
            onChange={handleChange}
            onKeyPress={event => {
              if (event.key === "Enter")
                document.getElementById("largo").focus();
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            size="small"
            variant="outlined"
            id='largo'
            value={state.largo}
            label='Largo : '
            type="number"
            className={classes.textField}
            onChange={handleChange}
            onKeyPress={event => {
              if (event.key === "Enter")
                document.getElementById("botonconf").focus();
            }}
          />
        </Grid>
        <Button id='botonconf' variant="contained" color="primary" onClick={restastock}>
          Confirmar
          </Button>
      </Grid>






      <FilaMuestraDatos open={open} handleClose={handleClose} datosm={datosmuestra} />
    </>
  );
}
