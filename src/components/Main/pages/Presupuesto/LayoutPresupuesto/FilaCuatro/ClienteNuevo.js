import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
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

export default function ClienteNuevo(props) {
  const campos = [
    { campo: "ClientesDesc", display: "Descripcion", grid: 12 },
    { campo: "ClientesCalle", display: "Calle", grid: 12 },
    { campo: "ClientesNroCalle", display: "Nro.", grid: 4 },
    { campo: "ClientesPiso", display: "Piso", grid: 4 },
    { campo: "ClientesDto", display: "Departamento", grid: 4 },
    { campo: "ClientesCodPos", display: "Codigo Postal", grid: 4 },
    { campo: "ClientesLoc", display: "Localidad", grid: 4 },
    { campo: "ClientesPcia", display: "Provincia", grid: 4 },
    { campo: "ClientesTel", display: "Telefono", grid: 6 },
    { campo: "ClientesMail", display: "e-Mail", grid: 6 },
    { campo: "ClientesIVA", display: "IVA", grid: 6 },
    { campo: "ClientesCUIT", display: "CUIT", grid: 6 },
    { campo: "ClientesTipo", display: "Tipo", grid: 12 },
  ];

  return (
    <>
      <Container fixed>
        {/* <Dialog
          // fullWidth={true}
          // maxWidth="md"
          open={true}
          keepMounted
          // onClose={handleClose}
          // aria-labelledby="alert-dialog-slide-title"
          // aria-describedby="alert-dialog-slide-description"
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {campos.map((campo) => (
              <Grid item xs={campo.grid}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id={campo.campo}
                  label={campo.display}
                  //   className={classes.textField}
                  //   placeholder="Ingresar Nuevo Cliente"
                  onChange={props.handleChange}
                />
              </Grid>
            ))}
          </Grid>
        </Dialog> */}

        <Dialog
          // fullWidth={true}
          // maxWidth="md"
          open={props.marcacliente}
          // keepMounted
          onClose={props.cancelar}

          // aria-labelledby="alert-dialog-slide-title"
          // aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="simple-dialog-title">
            Agregar Nuevo Cliente
          </DialogTitle>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {campos.map((campo) => (
              <Grid item xs={campo.grid}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id={campo.campo}
                  label={campo.display}
                  //   className={classes.textField}
                  //   placeholder="Ingresar Nuevo Cliente"
                  onChange={props.handleChange}
                />
              </Grid>
            ))}
          </Grid>

          <DialogActions>
            <Button onClick={props.cancelar} color="secondary">
              {/* <Button onClick={() => alert("cancelar")} color="secondary"> */}
              Cancelar
            </Button>
            {/* <Button onClick={grabarpresupuesto} color="primary" autoFocus> */}
            {/* <Button onClick={grabar} color="primary" autoFocus> */}
            <Button
              // onClick={() => ClientesAgregar(props)}
              onClick={props.grabarCliente}
              color="primary"
              autoFocus
            >
              Grabar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
