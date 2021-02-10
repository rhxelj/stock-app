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
import Clientes from '../../../Clientes/Clientes.jsx'
import useStyles from "../styles";
import { clientesleerdesc } from "../../../Clientes/ClientesLeerDesc";
import { PresupGrabar } from "../../PresupGrabar";

export default function ClienteNuevo(props) {
  const [data, setData] = useState([]);
  const campos = [
    { key: 0, campo: "ClientesDesc", display: "Descripcion", grid: 12 },
    { key: 1, campo: "ClientesCalle", display: "Calle", grid: 12 },
    { key: 2, campo: "ClientesNroCalle", display: "Nro.", grid: 4 },
    { key: 3, campo: "ClientesPiso", display: "Piso", grid: 4 },
    { key: 4, campo: "ClientesDto", display: "Departamento", grid: 4 },
    { key: 5, campo: "ClientesCodPos", display: "Código Postal", grid: 4 },
    { key: 6, campo: "ClientesLoc", display: "Localidad", grid: 4 },
    { key: 7, campo: "ClientesPcia", display: "Provincia", grid: 4 },
    { key: 8, campo: "ClientesTel", display: "Teléfono", grid: 6 },
    { key: 9, campo: "ClientesMail", display: "e-Mail", grid: 6 },
    { key: 10, campo: "ClientesIVA", display: "IVA", grid: 6 },
    { key: 11, campo: "ClientesCUIT", display: "CUIT", grid: 6 },
    { key: 12, campo: "ClientesTipo", display: "Tipo", grid: 12 },
  ];


  return (
    <>
      <Container fixed>


        <Dialog
          open={props.marcacliente}
          onClose={props.cancelar}
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

              <Grid key={campo.key} item xs={campo.grid} >
                <TextField
                  fullWidth
                  variant="outlined"
                  id={campo.campo}
                  label={campo.display}
                  onChange={props.handleChange}
                />
              </Grid>
            ))}
          </Grid>
          <DialogActions>
            <Button onClick={props.cancelar} color="secondary">
              Cancelar
            </Button>
            <Button
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
