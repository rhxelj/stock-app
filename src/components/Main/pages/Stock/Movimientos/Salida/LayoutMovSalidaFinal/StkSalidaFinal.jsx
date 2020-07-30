import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../LayoutMovSalida/styles";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { stkitemsleecodgrrbit } from "../../../../Stock/Items/StkItemsLeeCodGrRbIt";
import FilaMuestraDatos from './FilaMuestraDatos'
// import { stkitemsleecodgrrbit } from "../../../../Items/StkItemsLeeCodGrRbIt";


// Context



export default function StkSalidaFinal(props) {
  // Context
  const [state, setState] = useState({
    codqr: '',
    cantidad: 0
    //   nroenvase: 0,
    // grupo: 0,
    // rubro: 0,
    // item: 0

  }
  );
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
  //1#1#4#1#VORTEX 200 VERDE RUT   28'07'2020 40 MTS 
  // 
  //  2#1#5#15#STANDARD 840"AZUL QUILMES"PAR"""30-07-2020"35"MTS 

  async function restastock() {
    var nroenvase = state.codqr.split("#")[0];
    var grupo = state.codqr.split("#")[1];
    var rubro = state.codqr.split("#")[2];
    var item = state.codqr.split("#")[3];
    const result = await stkitemsleecodgrrbit(grupo, rubro, item);
    setDatosMuestra((datosmuestra) => ({
      ...datosmuestra,
      StkItemsCantidad: result[0].StkItemsCantidad,
      StkItemsCantDisp: result[0].StkItemsCantDisp,
      StkItemsFAct: result[0].StkItemsFAct,
      StkItemsMin: result[0].StkItemsMin,
      StkItemsMax: result[0].StkItemsMax,
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
        spacing={8}
        xs={6}
      >
        {/* Cantidad Disponible */}
        <Grid item xs={6}>
          <TextField
            size="small"
            variant="outlined"
            id="codqr"
            value={state.codqr}
            label='Código QR : '
            // className={classes.textField}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={restastock}>
            Confirmar
          </Button>
          <Grid item xs={6}>
            <TextField
              size="small"
              variant="outlined"
              id='cantidad'
              value={state.cantidad}
              label='Cantidad : '
              // className={classes.textField}
              onChange={handleChange}
            />

          </Grid>
        </Grid>


      </Grid>

      <FilaMuestraDatos open={open} handleClose={handleClose} datosm={datosmuestra} />
    </>
  );
}
