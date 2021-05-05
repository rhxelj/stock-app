import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { leelistaprecios } from "./LeeListaPrecios";
import { localization } from "../../../lib/material-table/localization";

import { tableIcons } from "../../../lib/material-table/tableIcons";
import TablaMuestraStock from "./TablaMuestraStock";
import WavesIcon from "@material-ui/icons/Waves";
import AutorenewIcon from '@material-ui/icons/Autorenew';

import Imprimir from "../Impresion/Imprimir/Imprimir";
import { HeaderTitle } from '../../../lib/HeaderTitle'
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});



export default function ListaPrecios() {
  HeaderTitle("Lista de Precios");
  const classes = useStyles();
  const [paramitems, setParamItems] = useState({
    idGrupo: 0,
    idRubro: 0,
  });
  // const [state, setState] = useState(initial_state);

  const [open, setOpen] = React.useState(false);
  const [imprimirTF, setImprimirTF] = useState({ imprimir: false });
  const [lista, setLista] = useState({
    columns: [
      {
        title: "Grupo",
        field: "GrupoDesc",
      },
      {
        title: "Descripción",
        field: "StkRubroDesc",
      },
      {
        title: "Ancho",
        field: "StkRubroAncho",
        type: 'numeric',
      },
      {
        title: "Presentación",
        field: "StkRubroPres",
        type: 'numeric',
      },
      {
        title: "Público",
        // align: "center",
        // align: "right",
        field: "PPub",
        width: 50,
        type: "currency",
        // render: (rowData) => <span>$ {rowData.PPub}</span>, //Agregado para poder poner las columnas en linea con los datos
      },
      {
        title: "Mayorista",
        field: "PMay",
        type: "currency",
        width: 50,
      },
      {
        title: "Fecha",
        field: "StkRubroFecha",
      },

    ],

    data: [],
  });

  async function leerlistaprecios() {
    const result = await leelistaprecios();
    setLista({ ...lista, data: result });
  }

  // useEffect(() => {
  //   leerlistaprecios();
  // }, []);
  useEffect(() => {
    leerlistaprecios();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openApp = (event, StkRubroCodGrp, idStkRubro) => {
    setParamItems({ paramitems, idGrupo: StkRubroCodGrp, idRubro: idStkRubro });
    handleClickOpen();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <MaterialTable
        icons={tableIcons}
        title="Lista de Precios"
        columns={lista.columns}
        data={lista.data}
        localization={localization}
        actions={[
          {
            icon: () => <WavesIcon />,
            onClick: (event, rowData) =>
              openApp(event, rowData.StkRubroCodGrp, rowData.idStkRubro),
          },
          {
            icon: () => <AutorenewIcon />,
            tooltip: "Refrescar",
            isFreeAction: true,
            onClick: () => leerlistaprecios(),
          },
          {
            icon: () => <tableIcons.Print />,
            tooltip: "Imprimir",
            isFreeAction: true,
            onClick: () => setImprimirTF({ imprimir: true }),
          },
        ]}
        options={{
          exportAllData: true,
          exportButton: true,
          grouping: true,
        }}
        components={{
          Toolbar: (props) => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: "0px 10px" }}>
                {/* <Button color="primary" style={{ marginRight: 5 }}>
                  Presupuesto
                </Button> */}
              </div>
            </div>
          ),
        }}
      />
      <Imprimir
        columns={lista.columns}
        datos={lista.data}
        open={imprimirTF.imprimir}
        setOpen={setImprimirTF}
      />
      <TablaMuestraStock
        open={open}
        handleClose={handleClose}
        Grupo={paramitems.idGrupo}
        Rubro={paramitems.idRubro}
      />
    </Paper>
  );
}
