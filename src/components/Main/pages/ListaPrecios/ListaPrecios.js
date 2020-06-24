import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { leelistaprecios } from './LeeListaPrecios';
import { localization } from '../../../lib/material-table/localization'

import { tableIcons } from '../../../lib/material-table/tableIcons'
import TablaMuestraStock from "./TablaMuestraStock";
import Button from '@material-ui/core/Button';
import WavesIcon from '@material-ui/icons/Waves';



const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export default function ListaPrecios() {
  const classes = useStyles();

  const [paramitems, setParamItems] = useState({
    idGrupo: 0,
    idRubro: 0
  })
  // const [state, setState] = useState(initial_state);

  const [open, setOpen] = React.useState(false);

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
        title: "Público",
        align: "center",
        field: "PPub",
        type: 'currency',
      },
      {
        title: "Mayorista",
        field: "PMay",
        type: 'currency',
        // },
        // {
        //   title: "P-U Mayorista",
        //   field: "PMayPU",
        //   type : 'currency',
        // },
        // {
        //   title: "P-U-R Mayorista",
        //   field: "PMayPUR",
        //   type : 'currency'

      }

    ],


    data: [],
  })

  async function leerlistaprecios() {
    const result = await leelistaprecios();
    setLista({ ...lista, data: result });
  }

  useEffect(() => {
    leerlistaprecios();
  }, []);


  const openApp = (event, StkRubroCodGrp, idStkRubro) => {
    setParamItems({ paramitems, idGrupo: StkRubroCodGrp, idRubro: idStkRubro })
    handleClickOpen()
  }
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
            onClick: (event, rowData) => openApp(event, rowData.StkRubroCodGrp, rowData.idStkRubro)
          }

        ]}
        options={{
          grouping: true,
        }}

        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{ padding: '0px 10px' }}>

                <Button color="primary" style={{ marginRight: 5 }}>Presupuesto</Button>
              </div>
            </div>
          ),
        }}
      />
      <TablaMuestraStock open={open} handleClose={handleClose} Grupo={paramitems.idGrupo} Rubro={paramitems.idRubro} />
    </Paper>
  )
}


