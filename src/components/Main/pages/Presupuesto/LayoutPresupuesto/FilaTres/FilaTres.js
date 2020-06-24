import React, { Fragment, useState, useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "../styles";
import MaterialTable, { MTableToolbar } from 'material-table';
import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import { TextField, Button } from "@material-ui/core";

import FilaCuatro from '../FilaCuatro/FilaCuatro'

import { presupcalculador } from '../../PresupCalculador'

import WavesIcon from '@material-ui/icons/Waves';

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { initial_state } from "../../Initial_State";
import PresupuestoUnid from "../../PresupuestoUnid";

export default function FilaTres(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);


  const [open, setOpen] = React.useState(false);
  const [presup, setPresup] = useState({
    columnas: state.columns
    // data: []
  })


  function suma() {
    var totalpresup = 0, i = 0
    console.log('VINO A Sumar  ', props.data)
    console.log('VINO A Sumar  ', props.data[0].ImpItem)
    console.log(props.data.length)
    while (i < props.data.length) {
      console.log(' i   ', i)
      totalpresup = totalpresup + props.data[i].ImpItem
      i++
    }
    console.log('totalpresup   ', totalpresup)
  }

  function graba() {

    console.log('VINO A GRABAR  ', props.data)
    console.log(props.maymin)
    handleClickOpen()
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
            //data={presup.data}
            localization={localization}
            options={{
              search: false
            }}

            editable={{
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = props.data;
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setPresup([...dataDelete])

                    //   setPresup([...dataDelete]);

                    resolve()
                  }, 1000)
                }),

            }}
            components={{
              Toolbar: props => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{ padding: '0px 10px' }}>

                    <Button onClick={() => suma()} color="primary" style={{ marginRight: 5 }}>Suma</Button>
                    <Button onClick={() => graba()} color="primary" style={{ marginRight: 20 }}>Graba</Button>
                    <Button onClick={() => graba()} color="primary" style={{ marginRight: 20 }}>Imprime</Button>

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
      <FilaCuatro open={open} handleClose={handleClose} />
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
