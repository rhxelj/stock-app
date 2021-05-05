import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ImprimirPantalla from "./ImprimirPantalla";
import { Dialog } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

export default function SelecCampos(props) {
  const [checked, setChecked] = React.useState([]);
  const [properties, setProperties] = React.useState();
  const { datos, gridStyle } = props;
  const [checkOff, setCheckoff] = React.useState(true);
  // var checkOff = false;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log("checked => ", checked);
  };

  // La siguiente función la uso para hacer el mapeo correcto de los encabezados a mostrar*********
  function checkAll() {
    setCheckoff(!checkOff);
    if (checkOff) {
      var campoVisible = [];
      props.columns.map((valor) => {
        campoVisible.push(valor);
        return null; //agregado para que no tire un warning
      });
      setChecked(campoVisible);
    } else setChecked([]);
  }

  function mapeo() {
    var campoVisible = [];
    checked.map((valor) => {
      const encabezado = {
        displayName: valor.title,
        field: valor.field,
      };
      campoVisible.push(encabezado);
      return null; //agregado para que no tire un warning
    });
    setProperties(campoVisible);
  }

  function handleClose() {
    // setChecked("");
    // checkAll();
    props.setOpen({ imprimie: false });
  }

  useEffect(() => {
    if (properties != null) {
      ImprimirPantalla({ datos, properties, gridStyle, handleClose });
      handleClose();
    }
  }, [properties]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Dialog
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
          {props.columns.map((value) => {
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
          <Button variant="contained" color="primary" onClick={checkAll}>
            Seleccionar Todos
          </Button>
          <Button variant="contained" color="primary" onClick={mapeo}>
            Imprimir
          </Button>

          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
