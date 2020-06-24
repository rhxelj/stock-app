import React, { Fragment, useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import { TextField, Button, Dialog } from "@material-ui/core";
import useStyles from "../styles";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { initial_state } from "../../Initial_State";
import { clientesleerdesc } from '../../../Clientes/ClientesLeerDesc'


export default function FilaCuatro(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  const { open, handleClose } = props


  const [presup, setPresup] = useState({
    columnas: state.columns
    // data: []
  })


  const handleChange = event => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function clientesleerdescrip() {
    const result = await clientesleerdesc();
    setState({ ...state, clientes: result });
  }
  useEffect(() => {
    clientesleerdescrip()
  }, [open]);

  const textdata = [

    {
      id: "idClientes",
      label: "Cliente :",
      value: state.idClientes,
      mapeo: (
        <>
          <option></option>
          {state.clientes.map(option => (
            <option key={option.idClientes} value={option.idClientes}>
              {option.ClientesDesc}
              {console.log(option.idClientes)}
              {console.log(option.ClientesDesc)}
            </option>
          ))}
        </>
      )

    }
  ];
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {textdata.map(data => (
          <TextField
            id={data.id}
            size="small"
            select
            label={data.label}
            fullWidth
            value={data.value}
            onChange={handleChange}
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {data.mapeo}
          </TextField>
        ))}
        {/* <TextField
          inputProps={{ maxlength: 45 }}
          size="small"
          variant="outlined"
          id="Cliente"
          label="Cliente"
          defaultValue=''
          fullWidth
          value={state.ClientesDesc}
          onChange={handleChange}
          className={classes.textField}

        /> */}

      </Dialog>
    </>
  );
}




// function onRowadd(event, rowData) {

// var dcalculo = [
//   {
//     StkRubroAbr: state.StkRubroAbr,
//     minmay: state.PresupMnMy,
//     cantidad: state.PresupCantidad
//   },
// ];
// var datoscalculos = JSON.stringify(dcalculo);
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       {
//         const datosrenglon1 =  presupcalculador(datoscalculos);
//         setDatosRenglon(() => datosrenglon1);
//       //   setPresup({...presup, data :
//       //   {StkRubroDesc: "VORTEX 150",
//       //   ImpUnitario: "424.6465",
//       //   ImpItem: "424.6465",
//       //   StkRubroCosto: "197.51",
//       //   StkMonedasCotizacion: "1"}
//       // })
//       presup.data.push(      
//         {StkRubroDesc: "VORTEX 150",
//          ImpUnitario: 424.6465,
//          ImpItem: 424.6465,
//          StkRubroCosto: 197.51,
//          StkMonedasCotizacion: 1})
//          {console.log('presup.data  ', presup.data)}
//      //   (newData).then(() => presupcalculador(datoscalculos))
//         //agregarRubros(newData).then(() => stkrubroleemezcla());
//       }
//       resolve();
//     }, 600);
//   });
// }
