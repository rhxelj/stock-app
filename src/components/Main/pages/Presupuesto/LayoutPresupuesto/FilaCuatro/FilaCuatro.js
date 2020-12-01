import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
// import DialogActions from "@material-ui/core/DialogActions";
import useStyles from "../styles";
// Context
import { useContext } from "react";
import { PresupPantContext } from "../../PresupPant";
import { clientesleerdesc } from "../../../Clientes/ClientesLeerDesc";
import { PresupGrabar } from "../../PresupGrabar";
import ClienteNuevo from "./ClienteNuevo";

export default function FilaCuatro(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);
  const { open, handleClose } = props;
  const [marcacliente, setMarcaCliente] = React.useState(false);

  const handleChange = (event) => {
    const id = event.target.id;
    setState({ ...state, [id]: event.target.value });
  };

  async function clientesleerdescrip() {
    const result = await clientesleerdesc();
    setState({ ...state, clientes: result });
  }
  useEffect(() => {
    clientesleerdescrip();
  }, [open]);

  function nuevocliente() {
    setMarcaCliente(true);
  }

  function grabarpresupuesto() {
    PresupGrabar(props, state.nomCliente, state.idClientes);
  }

  function cancelar() {
    setMarcaCliente(false);
    handleClose();
  }
  function grabar() {
    grabarpresupuesto();
    cancelar();
  }
  const textdata = [
    {
      id: "idClientes",
      label: "Cliente :",
      value: state.idClientes,
      mapeo: (
        <>
          <option></option>
          {state.clientes.map((option) => (
            <option key={option.idClientes} value={option.idClientes}>
              {option.ClientesDesc}
            </option>
          ))}
        </>
      ),
    },
  ];
  const classes = useStyles();
  return (
    <>
      <Dialog
        // fullWidth={true}
        // maxWidth="md"
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {!marcacliente ? (
          <DialogTitle id="simple-dialog-title">Elegir Cliente</DialogTitle>
        ) : (
          <DialogTitle id="simple-dialog-title">
            Agregar Nuevo Cliente
          </DialogTitle>
        )}
        {
          !marcacliente ? (
            textdata.map((data) => (
              <TextField
                id={data.id}
                key={data.id}
                // size="small"
                select
                label={data.label}
                fullWidth
                value={data.value}
                onChange={handleChange}
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {data.mapeo}
              </TextField>
            ))
          ) : (
            <ClienteNuevo></ClienteNuevo>
            // <TextField
            //   inputProps={{ maxlength: 45 }}
            //   // size="small"
            //   variant="outlined"
            //   id="nomCliente"
            //   label="Cliente :"
            //   className={classes.textField}
            //   placeholder="Ingresar Nuevo Cliente"
            //   onChange={handleChange}
            // />
          )
          // </TextField>
        }

        <DialogActions>
          <Button
            onClick={() => nuevocliente()}
            color="primary"
            style={{ marginRight: 20 }}
          >
            Cliente Nuevo
          </Button>
          {/* <Button onClick={handleClose} color="secondary"> */}
          <Button onClick={cancelar} color="secondary">
            Cancelar
          </Button>
          {/* <Button onClick={grabarpresupuesto} color="primary" autoFocus> */}
          <Button onClick={grabar} color="primary" autoFocus>
            Grabar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
