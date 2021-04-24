import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import MaterialTable, { MTableToolbar } from "material-table";

import { tableIcons } from "../../../../../lib/material-table/tableIcons";
import { localization } from "../../../../../lib/material-table/localization";
import FilaCuatro from "../FilaCuatro/FilaCuatro";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import { PresupPreview } from "../PresupPreview"
//npm install pdf-viewer-reactjs


import {
  blue,
  green,
  purple,
  teal,
} from "@material-ui/core/colors";
import FilaAnexo from "../FilaConf/FilaAnexo/FilaAnexo";

// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";

export default function TablaPresup(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state } = useContext(PresupPantContext);
  const { datosrenglon, setDatosRenglon } = useContext(PresupPantContext);
  // const [setImprimirTF] = useState({ imprimir: false });
  const [anexos, setAnexos] = useState({ anexos: false });
  const [ppreview, setPPreview] = useState({ ppreview: false });
  const columns = state.columns;

  const [suma, setSuma] = useState(0);
  const [open, setOpen] = useState(false);
  // const [presup, setPresup] = useState({
  //   columnas: state.columns,
  // });

  // const [file, setFile] = useState('/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/basics.pdf');
  // const [numPages, setNumPages] = useState(null);
  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }
  // function onFileChange(event) {
  //   // function onFileChange() {
  //   console.log('event   ', event)
  //   console.log('event.target.files[0]   ', event.target.files[0])
  //   setFile(event.target.files[0]);
  //   //   setFile('/home/sandra/Documentos/OLSAFrecuentes/PresupSistema/basics.pdf')
  // }

  function sumar() {
    var totalpresup = 0,
      i = 0;
    while (i < datosrenglon.length) {

      totalpresup = totalpresup * 1 + datosrenglon[i].ImpItem * 1;
      i++;
    }
    setSuma(totalpresup);
  }


  function graba() {
    handleClickOpen();
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  // const Imprimir = () => {
  //   setImprimirTF(true);
  // };

  // const NoImprimir = () => {
  //   setImprimirTF(false);

  // };

  return (
    <>

      <Grid container item direction="column" spacing={3} xs={12}>
        <Grid item xs>
          <MaterialTable
            icons={tableIcons}
            title=""
            columns={columns}
            data={datosrenglon}
            localization={localization}
            options={{
              search: false,
              exportAllData: true,
              exportButton: true,
              //  selection: true
            }}
            editable={{
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    const dataDelete = [...datosrenglon];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setDatosRenglon([...dataDelete]);
                    resolve();
                  }, 1000);
                }),

            }}
            actions={[
              {
                icon: () => (
                  <tableIcons.AddShoppingCart style={{ color: teal[500] }} />
                ),
                tooltip: "Suma",
                isFreeAction: true,
                onClick: () => sumar(),
              },
              {
                icon: () => <tableIcons.Save style={{ color: blue[500] }} />,
                tooltip: "Graba",
                isFreeAction: true,
                onClick: () => graba(),
              },
              {
                icon: () => <tableIcons.Print style={{ color: green[500] }} />,
                tooltip: "Imprimir",
                isFreeAction: true,
                onClick: () => setPPreview({ ppreview: true })
              },


              {
                icon: () => (
                  <tableIcons.Attachment style={{ color: purple[700] }} />
                ),
                tooltip: "Anexos",
                isFreeAction: true,
                onClick: () => setAnexos({ anexos: true }),
              },

              // {
              //   tooltip: 'Remove All Selected Users',
              //   icon: 'delete',
              //   onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
              // }
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
      <FilaCuatro
        open={open}
        datos={datosrenglon}
        maymin={props.maymin}
        suma={suma}
        handleClose={handleClose}
      />

      <FilaAnexo open={anexos.anexos} setOpen={setAnexos} />
      <PresupPreview open={ppreview.ppreview} setOpen={setPPreview}></PresupPreview>

    </>
  );
}
