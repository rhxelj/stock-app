import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from '../../../../lib/material-table/tableIcons'
import { localization } from "../../../../lib/material-table/localization";
// import FilaCuatro from "../FilaCuatro/FilaCuatro";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Imprimir from '../../Impresion/Imprimir/Imprimir'
import { red, blue, green, blueGrey, purple, teal } from '@material-ui/core/colors';
import FilaAnexo from '../ArmaPresup/FilaAnexo/FilaAnexo'
// import FilaUno from '../FilaUno'
// import FilaDos from '../FilaDos'
// import FilaUnoIzq from '../FilaUno/FilaUnoIzq'
import TipoConfeccion from '../ArmaPresup/Confeccion/TipoConfeccion'
import MayMin from '../ArmaPresup/Confeccion/MayMin'
import DatosPresupuesto from '../ArmaPresup/DialogoBarra/DatosPresupuesto'
import printJS from "print-js";

// Context
import { useContext } from "react";
import { PresupuestosContext } from '../Presupuestos'
export default function TablaPresup(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupuestosContext);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
  const [anexos, setAnexos] = useState({ anexos: false });
  const [minmay, setMinmay] = useState({ minmay: true });
  const [datospresupuesto, setDatosPresupuesto] = useState({ datospresupuesto: true });
  const columns = state.columns
  const data = props.data
  const [suma, setSuma] = useState(0);
  const [open, setOpen] = useState(false);
  const [presup, setPresup] = useState({
    columnas: state.columns,
  });

  const [presupd, setPresupd] = useState({
    data: props.data
  });


  console.log(' state.columns   ', state.columns)
  console.log('props.data   ', state.datosrenglon)
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
    // console.log(presup.columnas);
    console.log(props.data);
    console.log(presup.columnas)
    // printJS({
    //   maxWidth: 800,
    //   properties: state.columns,
    //   scanStyles: false,
    //   printable: props.data,
    //   type: "json",
    //   header: '<h3 class="custom-h3">Orlando Lonas</h3>',
    //   // onPrintDialogClose: () => props.handleClose(),
    // });
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
  console.log('handleClickOpen ')
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container item direction="column" spacing={3} xs={12}>
        {console.log('Grid ')}

        <Grid item xs>
          <MaterialTable
            icons={tableIcons}
            title=""
            //   columns={presup.columnas}
            columns={columns}
            data={data}
            // data={data}
            localization={localization}
            options={{
              search: false,
            }}
            editable={{
              onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    // const dataDelete = props.data;
                    const dataDelete = [...data];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setPresupd([...dataDelete]);
                    // setState({...state, renglonfinal: dataDelete });
                    // setPresup([presup.columnas, dataDelete]);
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
                icon: () => <tableIcons.AddShoppingCart style={{ color: teal[500] }} />,
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
                // onClick: (event) => setImprimirTF({ imprimir: true }),
                onClick: (event) => imprime(),
              },
              {
                icon: () => <tableIcons.Attachment style={{ color: purple[700] }} />,
                tooltip: "Anexos",
                isFreeAction: true,
                onClick: (event) => setAnexos({ anexos: true }),
              },
              // {
              //   icon: () => <tableIcons.Save style={{ color: blue[500] }} />,
              //   tooltip: "Tipo cliente",
              //   isFreeAction: true,
              //   onClick: (event) => setMinmay({ minmay: true })
              // },
            ]}

            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />

                  <CurrencyTextField
                    id="Suma"
                    label="Total presupuesto : "
                    value={suma}

                  />

                </div>

              ),
            }}


          />
        </Grid>
      </Grid>
      {/* <FilaCuatro
        open={open}
        datos={props.data}
        maymin={props.maymin}
        suma={suma}
        handleClose={handleClose}
      /> */}
      <Imprimir
        columns={presup.columnas}
        //  datos={data}
        datos={presup.data}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
      />

      <FilaAnexo
        open={anexos.anexos}
        setOpen={setAnexos}
      />
      <DatosPresupuesto
        open={datospresupuesto.datospresupuesto}
        setOpen={setDatosPresupuesto}

      />


    </>
  );
}

