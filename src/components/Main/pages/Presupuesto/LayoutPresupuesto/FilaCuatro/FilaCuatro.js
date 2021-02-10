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

import { clientesleerdescmayigual } from "../../../Clientes/ClientesLeerDesc";
import { clientesleercodmayor } from "../../../Clientes/ClientesLeerCodMayor";
import { PresupGrabar } from "../../PresupGrabar";
import ClienteNuevo from "./ClienteNuevo";
import { ClientesAgregar } from "../../../Clientes/ClientesAgregar";
import { PresupImprime } from "../PresupImprime"
import { PresupDetPieSelec } from '../../PresupDetPie/PresupDetPieSelec'
import Clientes from '../../../Clientes/Clientes.jsx'

export default function FilaCuatro(props) {
  // Esto es para poder consumir los datos del CONTEXTAPI
  const { state, setState } = useContext(PresupPantContext);


  const { open, handleClose } = props;
  const [marcacliente, setMarcaCliente] = React.useState(false);
  const [idClienteEleg, setidClienteEleg] = React.useState(0);
  const [nomClienteEleg, setnomClienteEleg] = React.useState('');

  const handleChange = (event) => {
    const id = event.target.id;
    if (id != 'nomClientes') {
      setState({ ...state, [id]: event.target.value });
      setnomClienteEleg(event.target.value)
      setidClienteEleg(0)
    }

  };

  async function clientesleerdescrip() {
    const result = await clientesleerdescmayigual(state.ClientesDesc);
    setidClienteEleg(result[0].idClientes)
    setnomClienteEleg(result[0].ClientesDesc)
    setState({ ...state, clientes: result });
  }

  useEffect(() => {
    clientesleerdescrip();
  }, [open, marcacliente]);

  function nuevocliente() {
    setMarcaCliente(true);
  }

  async function grabarpresupuesto() {
    var idClienteElegE, nomClienteElegE;
    var descrip = state.DescripPresup
    if (state.idClientes != 0) {
      idClienteElegE = state.idClientes
      nomClienteElegE = state.nomCliente
    }
    else {
      idClienteElegE = idClienteEleg
      nomClienteElegE = nomClienteEleg
    }
    //  PresupGrabar(props, state.nomCliente, state.idClientes);
    const nroPresupuesto1 = await PresupGrabar(props, nomClienteElegE, idClienteElegE);
    setState({ ...state, NroPresupuesto: nroPresupuesto1 });
    PresupDetPieSelec()
    PresupImprime(props.datos, idClienteElegE, nomClienteElegE, props.suma, nroPresupuesto1, descrip)
    //  cancelar();
  }
  function grabarCliente() {
    ClientesAgregar(state);
    setMarcaCliente(false);
  }

  function cancelar() {
    setMarcaCliente(false); //todo : verificar si esto funciona luego borrar comentario

    //  handleClose();
  }
  // function grabar() {

  //   grabarpresupuesto();
  //   cancelar();
  // }



  const textdata = [
    {
      id: "idClientes",
      value: state.idClientes,
      mapeo: (
        <>
          {/* <option></option> */}
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

        {/* <DialogTitle id="simple-dialog-title">Cliente Presupuesto</DialogTitle> */}
        <label>Cliente Presupuesto</label>

        <TextField
          inputProps={{ maxLength: 40 }}
          size="small"
          variant="outlined"
          id="nomCliente"
          type="text"
          label="Nombre Cliente"
          fullWidth
          margin="dense"
          value={state.nomCliente}
          onChange={handleChange}
          className={classes.textField}
        />
        <label>Cliente Existente</label>

        {!marcacliente ? (
          textdata.map((data) => (
            <TextField
              id={data.id}
              key={data.id}
              // size="small"
              select
              // label={data.label}
              // label='Cliente existente'
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
            <ClienteNuevo
              handleChange={handleChange}
              setMarcaCliente={setMarcaCliente}
              marcacliente={marcacliente}
              cancelar={cancelar}
              grabarCliente={grabarCliente}

            />
          )}


        <DialogActions>
          <Button
            onClick={() => nuevocliente()}
            color="primary"
            style={{ marginRight: 20 }}
          >
            Cliente Nuevo
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={grabarpresupuesto} color="primary" autoFocus>
            Grabar
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
}
