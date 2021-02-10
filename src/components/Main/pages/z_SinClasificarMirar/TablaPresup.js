import React, { useEffect, useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Dialog } from "@material-ui/core";
import { leerubrosdesc } from './LeeRubrosDesc NO';
import Slide from '@material-ui/core/Slide';
import MaterialTable, { MTableToolbar } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { tableIcons } from '../../../lib/material-table/tableIcons'
import WavesIcon from '@material-ui/icons/Waves';
import { localization } from '../../../lib/material-table/localization'

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

export default function TablaPresup(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [lista, setLista] = useState({
    columns: [
      {
        title: "Cantidad",
        field: "cantidad",
      },
      {
        title: "Descripción",
        field: "descripcion",
      },
      {
        title: "Largo",
        field: "largo",
      },
      {
        title: "Ancho",
        field: "ancho",
      },
      {
        title: "$ Unidad",
        field: "impunidad",
        type: 'currency',
      },
      {
        title: "$ Item",
        field: "impitem",
        type: 'currency',
      }

    ],


    data: [],
  })






  return (
    <Paper className={classes.root}>
      <MaterialTable
        icons={tableIcons}
        title=""
        columns={lista.columns}
        data={lista.data}
        localization={localization}
        actions={[
          {
            icon: () => <WavesIcon />,
            //onClick: (event, rowData) => openApp(event, rowData.StkRubroCodGrp, rowData.idStkRubro )
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

                <Button color="primary" style={{ marginRight: 5 }}></Button>
              </div>
            </div>
          ),
        }}
      />
    </Paper>
  )
}

