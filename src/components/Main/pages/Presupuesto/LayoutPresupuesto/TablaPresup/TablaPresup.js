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
import Imprimir from '../../../Impresion/Imprimir/Imprimir'
import { red, blue, green } from '@material-ui/core/colors';

import InputAdornment from "@material-ui/core/InputAdornment";

import { presupcalculador } from "../../PresupCalculador";

import WavesIcon from "@material-ui/icons/Waves";

import printJS from "print-js";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import SelecCampos from "../../../Impresion/SelecCampos";
import { initial_state } from "../../Initial_State";

export default function TablaPresup(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });

  const [datosrenglon, setDatosRenglon] = useState([]);
  const columns = state.columns;
  const data = props.data;
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
              tableLayout: "fixed",
            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // const dataDelete = props.data;
                    const dataDelete = [props.data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setPresup([...dataDelete]);
                    resolve();
                  }, 1000);
                })


              // onRowDelete: oldData =>
              // new Promise((resolve, reject) => {
              //     setTimeout(() => {
              //         const dataDelete = [...datosanexo];
              //         const index = oldData.tableData.id;
              //         dataDelete.splice(index, 1);
              //         setDatosAnexo([...dataDelete]);

              //         resolve();
              //     }, 1000);
              // })
            }}
            actions={[
              {
                icon: () => <tableIcons.AddShoppingCart style={{ color: red[500] }} />,
                tooltip: "Suma",
                isFreeAction: true,
                onClick: (event) => sumar(),
              },
              {
                icon: () => <tableIcons.Save style={{ color: blue[500] }} />,
                tooltip: "Graba",
                isFreeAction: true,
                onClick: (event) => graba(),
              },
              {
                icon: () => <tableIcons.Print style={{ color: green[500] }} />,
                tooltip: "Imprimir",
                isFreeAction: true,
                onClick: (event) => setImprimirTF({ imprimir: true }),
              },
            ]}
            // actions={[
            //   {
            //     icon: () => <tableIcons.Print />,
            //     tooltip: "Imprimir",
            //     isFreeAction: true,
            //     onClick: (event) => setImprimirTF({ imprimir: true }),
            //   },
            // ]}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  {/* <div style={{ padding: "0px 10px" }}>
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
                    </Button> */}
                    {/* <Button
                      onClick={() => imprime()}
                      color="primary"
                      style={{ marginRight: 20 }}
                    >
                      Imprime
                    </Button> */}
                    {/* <TextField */}
                  <CurrencyTextField
                    id="Suma"
                    label="Total presupuesto : "
                    value={suma}
                  //    type="currency" */}
                  />

                  {/* </TextField> */}
                  {/* </div> */}
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
      <Imprimir
        columns={columns}
        datos={data}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
        gridStyle={"background:'red'"}
      />
    </>
  );
}

