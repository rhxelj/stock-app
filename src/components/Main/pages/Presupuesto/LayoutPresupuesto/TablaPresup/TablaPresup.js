import React, { Fragment, useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import { TextField, Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

import { presupcalculador } from "../../PresupCalculador";

import WavesIcon from "@material-ui/icons/Waves";

import printJS from "print-js";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import SelecCampos from "../../../Impresion/SelecCampos";
import { initial_state } from "../../Initial_State";
import PresupuestoUnid from "../../PresupuestoUnid";

export default function TablaPresup(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);


  const [datosrenglon, setDatosRenglon] = useState([]);

  const [suma, setSuma] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [presup, setPresup] = useState({
    columnas: state.columns,
    // data: []
  });

  function sumar() {
    var totalpresup = 0,
      i = 0;
    while (i < props.data.length) {
      totalpresup = totalpresup + props.data[i].ImpItem;
      i++;
    }
    setSuma(totalpresup);
  }

  function graba() {
    console.log("VINO A GRABAR  ", props.data);
    console.log(props.maymin);
    console.log(suma);
    handleClickOpen();
  }

  function imprime() {
    console.log("Mando a Imprimir presupueto");
    console.log(props.columnas);
    console.log(props.data);

    // printJS({
    //   maxWidth: 800,
    //   properties: props.columnas,
    //   scanStyles: false,
    //   printable: props.data,
    //   type: "json",
    //   // onPrintDialogClose:this.props.toggleImprimir()
    // });
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container item direction="column" spacing={3} xs={12}>
        <Grid item xs>
          <MaterialTable
            icons={tableIcons}
            title="Presupuesto"
            columns={presup.columnas}
            data={props.data}
            localization={localization}
            options={{
              search: false,
            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = props.data;
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setPresup([...dataDelete]);
                    resolve();
                  }, 1000);
                }),
            }}

            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{ padding: "0px 10px" }}>
                    <Button
                      onClick={() => sumar()}
                      color="primary"
                      style={{ marginRight: 5 }}
                    >
                      Suma
                    </Button>
                    <Button
                      onClick={() => graba()}
                      color="primary"
                      style={{ marginRight: 20 }}
                    >
                      Graba
                    </Button>
                    <Button
                      onClick={() => imprime()}
                      color="primary"
                      style={{ marginRight: 20 }}
                    >
                      Imprime
                    </Button>
                    {/* <TextField */}
                    <CurrencyTextField
                      id="Suma"
                      label="Total presupuesto : "
                      value={suma}
                      type="currency"
                    />

                    {/* </TextField> */}
                  </div>
                </div>
              ),
            }}

          // // actions={[
          //   {
          //     icon: () => <WavesIcon/>,

          //     onClick: (event, rowData) => onRowadd(event, rowData )
          //   }

          // ]}

          // onRowAdd: newData =>
          //       new Promise((resolve, reject) => {
          //         setTimeout(() => {
          //           {
          //             const data = this.state.data;
          //             data.push(newData);
          //             this.setState({ data }, () => resolve());
          //           }
          //           resolve()
          //         }, 1000)
          />
        </Grid>
      </Grid>
      <FilaCuatro
        open={open}
        datos={props.data}
        maymin={props.maymin}
        suma={suma}
        handleClose={handleClose}
      />
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
