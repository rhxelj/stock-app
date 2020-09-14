/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ImprimirPantalla from "./ImprimirPantalla-old";
import { Dialog, TablePagination } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

export default function SelecCampos(props) {
  const [checked, setChecked] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [properties, setProperties] = React.useState(false);
  const { datos } = props;

  console.log("datos desde monedas");
  console.log(datos);

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

  function mapeo() {
    var campoVisible = [];
    checked.map((valor) => {
      console.log("Contenido de Valor Dentro del map ");
      console.log(valor);
      const encabezado = {
        // displayName: valor.Header,
        // field: valor.accessor,
        title: valor.title,
        field: valor.field,
      };
      campoVisible.push(encabezado);
      return null; //agregado para que no tire un warning
    });
    console.log("Contenido de campoVisible Dentro del map ");
    console.log(campoVisible);
    setProperties(campoVisible);
  }

  // *********

  function Imp(datos, properties) {
    mapeo();
    console.log("datos");
    console.log(datos);
    console.log("properties");
    console.log(properties);
    // ImprimirPantalla(datos, properties);
  }

  return (
    <>
      <Dialog
        // open={true}
        // onClose={this.handleClose}
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Elija los Campos a IMPRIMIR
        </DialogTitle>
        {/* <List className={classes.root}> */}
        <List>
          {/* {columnas.map(value => { */}
          {props.columns.map((value, index) => {
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
            onClick={Imp}
            // onClick={() => {
            //   // mapeo();
            //   Imp;
            //   // setOpen(true);
            // }}
          >
            Imprimir
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => props.setOpen({ imprimie: false })}
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
    </>
  );
}
