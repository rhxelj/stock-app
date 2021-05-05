import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ImprimirPantalla from "../Impresion/ImprimirPantalla";
import { Dialog, TablePagination } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { checkout } from "superagent";

export default function SelecCampos(props) {
  // const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState(false);

  // props.headerTabla.pop() //Saco el campo borrar

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  // La siguiente función la uso para hacer el mapeo correcto de los encabezados a mostrar*********

  const mapeo = () => {
    var campoVisible = [];
    checked.map((valor) => {
      const encabezado = {
        title: valor.Header,
        field: valor.accessor,

      };
      campoVisible.push(encabezado);
      return null; //agregado para que no tire un warning
    });
    setProperties(campoVisible);
  };

  // *********

  return (
    <div>
      <Dialog
        open={true}
        // onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Elija los Campos a IMPRIMIR !!!!!!!
        </DialogTitle>
        {/* <List className={classes.root}> */}
        <List>
          {/* {columnas.map(value => { */}
          {props.headerTabla.map((value, index) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                // key={value.Header}
                key={value.title}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                {/* <ListItemText id={labelId} primary={`${value.Header}`} /> */}
                <ListItemText id={labelId} primary={`${value.title}`} />
                {/* <ListItemText id={labelId} primary={`${value.accessor }`} /> */}
              </ListItem>
            );
          })}
        </List>
        {/* Aca llamo a ImprimirPantalla y le paso datos y columnas */}
        {/* <ImprimirPantalla elegidos={checked} datos={props.datos} /> */}

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            // onClick={()=> setOpen(true)}
            onClick={() => {
              mapeo();
              setOpen(true);
            }}
          >
            Imprimir
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => props.toggleImprimir()}
          >
            Cancelar
          </Button>
        </DialogActions>
        {/* </Dialog> */}
      </Dialog>

      {/* {toggle.imprimir && */}
      {open && (
        <ImprimirPantalla
          datos={props.datos}
          properties={properties}
          toggleImprimir={props.toggleImprimir}
        // properties={checked}
        />
      )}
    </div>
  );
}
