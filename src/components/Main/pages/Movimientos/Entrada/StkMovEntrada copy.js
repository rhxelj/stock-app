import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
// import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";
import StkGenImpQR from "../../Impresion/StkGenImpQR";
import ubicacion from "./UbicacionGeografica";

const useStyles = makeStyles(theme => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    // background: "lightblue",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  //*  cuerpo: { padding: theme.spacing(5) },
  cuerpo: { padding: "10px" },
  cajas: {
    marginLeft: "4px",
    marginRight: "4px"
    // width: auto
  },
  textField_60: {
    width: 60
  },
  textField_80: {
    width: 80
  },
  textField_150: {
    width: 150
  },
  textField_370: {
    width: 370
  }
}));

var initial_state = {
  idStkGrupo: 0,
  dialogo_imprimir: false,
  stkrubro: [],
  stkgrupo: [],
  stkitems: [],
  stkenvaseubg: [],
  ubicacionf: [],
  stkrubroele: [],
  // StkItemsGrupo: 0,
  StkItemsCantidad: 0.0,
  StkItemsCantDisp: 0.0,
  StkItemsFAct: "",
  StkItemsMin: 0.0,
  StkItemsMax: 0.0,
  StkRubroAncho: 0.0,
  StkRubroPresDes: "",
  StkRubroPres: 0.0,
  StkRubroUM: 0.0,
  cantidad: 1.0,
  largo: 0.0,
  ancho: 0.0,
  faltante: 0.0,
  total: 0.0,
  datostraid: [],
  open: true,
  toggle_imprimir: false,
  marcagenqr: false,
  imp_conf: false,
  marcaagregado: false,
  StkEnvaseUb: "",
  StkEnvaseObserv: "",
  StkEnvasePartida: "",
  toggle_state: {
    entrada: true,
    dialogo: false, //TODO antiguamente dialogo borrar una vez que funcione
    imprimir: false
  }
};

var StkMovEntrada = props => {
  var [state, setState] = useState(initial_state);

  // Lee Grupo
  const leestkgrupo = _ => {
    const url = IpServidor + "/stkgrupoleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        setState({ ...state, stkgrupo: stkgrupo });
      });
  };

  //lee rubro por código de grupo
  const stkrubroleecodgrupo = id => {
    const url = IpServidor + "/stkrubroleecodgrupo/" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubro = JSON.parse(res.text);
        setState({ ...state, stkrubro: stkrubro });
      });
  };

  //lee ubicacion física según la ubicación geografica
  const stkubfisicaleerUbG = id => {
    const url = IpServidor + "/stkubfisicaleerUbG/?id=" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const ubicacionf = JSON.parse(res.text);
        setState({ ...state, ubicacionf: ubicacionf });
      });
  };

  const stkrubroleecodrbygr = () => {
    const url =
      IpServidor +
      "/stkrubroleecodrbygr/?id1=" +
      state.StkItemsRubro +
      "&id2=" +
      state.StkItemsGrupo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubroele = JSON.parse(res.text);
        setState({ ...state, stkrubroele: stkrubroele });
        setState({
          ...state,
          StkRubroAncho: stkrubroele[0].StkRubroAncho, // ! revisar esto
          StkRubroPresDes: stkrubroele[0].StkRubroPresDes,
          StkRubroPres: stkrubroele[0].StkRubroPres,
          StkRubroUM: stkrubroele[0].StkRubroUM

          // StkRubroAncho: state.stkrubroele[0].StkRubroAncho,
          // StkRubroPresDes: state.stkrubroele[0].StkRubroPresDes,
          // StkRubroPres: state.stkrubroele[0].StkRubroPres,
          // StkRubroUM: state.stkrubroele[0].StkRubroUM
        });
      });
  };

  const stkitemsleecodgryrb = id3 => {
    var id2 = state.StkItemsGrupo;
    const url = IpServidor + "/stkitemsleecodgryrb/?id2=" + id2 + "&id3=" + id3;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkitems = JSON.parse(res.text);
        setState({ ...state, stkitems: stkitems });
      });
  };

  const stkitemsleecodgrrbit = () => {
    var id1 = state.StkItems;
    var id2 = state.StkItemsGrupo;
    var id3 = state.StkItemsRubro;
    const url =
      IpServidor +
      "/stkitemsleecodgrrbit/?id1=" +
      id1 +
      "&id2=" +
      id2 +
      "&id3=" +
      id3;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkitemse = JSON.parse(res.text);
        setState({ ...state, stkitemse: stkitemse });
        setState({
          ...state,
          StkItemsCantidad: state.stkitemse[0].StkItemsCantidad,
          StkItemsCantDisp: state.stkitemse[0].StkItemsCantDisp,
          StkItemsFAct: state.stkitemse[0].StkItemsFAct,
          StkItemsMin: state.stkitemse[0].StkItemsMin,
          StkItemsMax: state.stkitemse[0].StkItemsMax
        });
        var recorte = state.StkItemsFAct.substr(0, 10);
        setState({ ...state, StkItemsFAct: recorte });
      });
  };

  const limpioPantalla = () => {
    setState(
      initial_state //TODO revisar esto no me pone en cero todo averiguar como poner en cero
      //   {
      //   stkrubro: [],
      //   // stkgrupo: [],
      //   stkitems: [],
      //   stkItems: [],
      //   stkenvaseubg: [],
      //   ubicacionf: [],
      //   // ubicacion:[],
      //   stkrubroele: [],
      //   StkItemsCantidad: 0.0,
      //   StkItemsCantDisp: 0.0,
      //   StkItemsFAct: "",
      //   StkItemsMin: 0.0,
      //   StkItemsMax: 0.0,
      //   StkRubroAncho: 0.0,
      //   StkRubroPresDes: "",
      //   StkRubroPres: 0.0,
      //   StkRubroUM: 0.0,
      //   cantidad: 1.0,
      //   largo: 0.0,
      //   ancho: 0.0,
      //   faltante: 0.0,
      //   total: 0.0,
      //   datostraid: [],
      //   open: true,
      //   marcagenqr: false,
      //   imp_conf: false,
      //   marcaagregado: false,
      //   StkEnvaseUb: "",
      //   StkEnvaseObserv: "",
      //   StkEnvasePartida: "",
      //   indiceub: [],
      //   StkItemsGrupo: [],
      //   StkItemsRubro: "",
      //   StkItems: [],
      //   StkEnvaseUbF: [],
      //   StkEnvaseUbG: []
      // }
    );
    leestkgrupo();
  };

  useEffect(() => {
    console.log(
      "dentro de useEffect contenido de state.idStkGrupo ",
      state.idStkGrupo
    );
    stkrubroleecodgrupo(state.idStkGrupo);
  }, [state.idStkGrupo]);

  useEffect(() => {
    leestkgrupo();
    console.log("leyo leestokgrupo");
  }, []);

  // function componentWillMount() {
  //   leestkgrupo();
  // }

  // function componentWillUnmount() {}

  // function componentDidMount() {}

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - INICIO
  //***********************************************************//

  // const handleChange = prop => event => {
  //   setState({ ...state, [prop]: event.target.value });
  // };

  const handleChangeGrupo = prop => event => {
    console.log("Evente en change grupo ", event.target.id);
    setState({ ...state, [prop]: event.target.value });
    // setState({ ...state, idStkGrupo: parseInt(event.target.value) });
    // stkrubroleecodgrupo(idStkGrupo);
    // stkrubroleecodgrupo(event.target.value);
  };

  const handleChange = event => {
    console.log("Entro en handlechange de ", event.target.id);
    const id = event.target.id;
    setState({ ...state, id: event.target.value });
    console.log("TCL: componentDidMount -> id", id);
    console.log(
      "TCL: componentDidMount -> event.target.value",
      event.target.value
    );
  };

  const handleChangeRubro = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkrubroleecodrbygr();
    setState({ ...state, [prop]: event.target.value });
    stkitemsleecodgryrb(state.StkItemsRubro);
  };

  const handleChangeItems = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkitemsleecodgrrbit();
  };

  const handleChangeUbicacion = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkubfisicaleerUbG(state.StkEnvaseUbG);
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  const handleClose = () => {
    // this.setState({ open: false });
    // this.toggleImprimir()
    limpioPantalla();
    toggleEntradaDatos();
  };

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - FIN
  //***********************************************************//

  // TODO inicio : Revisar tambien estos toggles creo que se pueden reducir a uno solo

  const toggleState = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    alert(`Cambio el estado de ${[prop]}`);
  };

  // Manejo de Pantalla - INICIO
  const toggleEntradaDatos = () => {
    // console.log("valor de toggle_entrada : "+this.state.toggle_state.entrada)
    setState({
      ...state,
      toggle_state: {
        // entrada:!prevState.toggle_state.entrada,
        entrada: state.toggle_state.entrada,
        dialogo: !state.toggle_state.dialogo,
        imprimir: state.toggle_state.imprimir
      }
    }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  };

  const toggleImprimir = () => {
    setState(...state, {
      toggle_state: {
        entrada: !state.toggle_state.entrada,
        dialogo: !state.toggle_state.dialogo,
        imprimir: !state.toggle_state.imprimir
      }
    }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  };

  // TODO Fin: Hasta aca

  const cancelaImpresion = () => {
    setState(...state, {
      toggle_state: {
        entrada: true,
        dialogo: false,
        imprimir: false
      }
    }); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
    limpioPantalla();
  };
  // Manejo de Pantalla - FIN

  const MarcaGenQr = () => {
    setState(...state, {
      marcagenqr: !state.marcagenqr
    });
  };

  const ImpConf = () => {
    setState(...state, {
      imp_conf: !state.imp_conf,
      dialogo_imprimir: !state.dialogo_imprimir
    });
    // this.toggleImprimir()
    toggleEntradaDatos();
  };
  //aca

  const agregastock = _ => {
    const url =
      IpServidor +
      "/stkitemsmodstock/?id1=" +
      state.StkItems +
      "&id2=" +
      state.StkItemsGrupo +
      "&id3=" +
      state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cantidad: state.cantidad })
      .send({ StkRubroPres: state.StkRubroPres })
      .send({ StkItemsCantDisp: state.StkItemsCantDisp })
      .send({ StkItemsCantidad: state.StkItemsCantidad })
      .catch(err => {
        if (err.status === 414) {
          alert("Falta información para modificar Items  ");
        } else {
          console.log("Error nro en StkMovEntrada 1:  " + err.status);
        }
      });

    const url1 =
      IpServidor +
      "/stkenvaseagregar/?id1=" +
      state.StkItems +
      "&id2=" +
      state.StkItemsGrupo +
      "&id3=" +
      state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url1)
      .set("Content-Type", "application/json")
      // .send({total: Number(this.state.total)})
      .send({ cantidad: state.cantidad })
      .send({ StkRubroPres: state.StkRubroPres })
      .send({ StkEnvasePartida: state.StkEnvasePartida })
      .send({ StkEnvaseUbG: state.StkEnvaseUbG })
      .send({ StkEnvaseUbF: state.StkEnvaseUbF })
      .send({ StkEnvaseObserv: state.StkEnvaseObserv })
      .then(res => {
        // const total1 = JSON.parse(res.text)
        setState({ ...state, marcaagregado: true });
      })
      .catch(err => {
        if (err.status === 413) {
          alert("Falta información para agregar Envase  ");
        } else {
          console.log("Error nro en StkMovEntrada 2 :  " + err.status);
        }
      });
    // this.toggleImprimir()
    toggleEntradaDatos();
  };

  const classes = useStyles();
  return (
    <div>
      {/* {state.toggle_state.entrada && ( // toggle_imprimir = FALSE */}
      {/* // <Dialog open={true} maxWidth="xs" fullWidth={true}> */}
      <Dialog open={true} maxWidth="xs" fullWidth={true}>
        <Grid
          container
          className={classes.root}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <DialogTitle id="form-dialog-title">Entradas de stock</DialogTitle>
        </Grid>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              {/* <Grid item xs={12} sm={12} lg={12}> */}
              <Grid container spacing={2} justify="space-around">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="FechaAct"
                  label="Fecha Actualización"
                  value={state.StkItemsFAct}
                  disabled
                  className={classes.textField}
                />
              </Grid>

              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="CantDisp"
                  label="Cantidad Disponible"
                  value={state.StkItemsCantDisp}
                  style={
                    state.StkItemsCantDisp < state.StkItemsMin
                      ? { background: "#f92c19" }
                      : { background: "#00e676" }
                  }
                  disabled
                  className={classes.textField}
                />
                {/* </Grid> */}

                {/* <Grid item xs={3} sm={3} lg={3}> */}
                <TextField
                  id="Cantidad"
                  label="Cantidad "
                  value={state.StkItemsCantidad}
                  style={
                    state.StkItemsCantidad < state.StkItemsMin
                      ? { background: "#f92c19" }
                      : { background: "#00e676" }
                  }
                  className={classes.textField}
                  disabled
                />
              </Grid>
              {/* </Grid> */}
              {/* <Grid container justify="space-between"> */}
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="MinStock"
                  label="Mínimo Stock"
                  value={state.StkItemsMin}
                  disabled
                  className={classes.textField}
                />
                {/* </Grid> */}
                {/* <Grid item xs={2} sm={2} lg={2}> */}
                <TextField
                  id="MaxStock"
                  label="Máximo Stock"
                  value={state.StkItemsMax}
                  disabled
                  className={classes.textField}
                />
              </Grid>
            </Grid>
            {/* Primera linea Fin */}

            <Grid
              container
              // direction="row"
              justify="space-between"
              // alignItems="center"
            >
              {/* <Grid item xs> */}
              <TextField
                // className={classes.cajas}
                // id="Grupo"
                id="idStkGrupo"
                select
                label="Grupo"
                fullWidth
                // value={state.StkItemsGrupo}
                // value={state.idStkGrupo}
                // value={state.StkGrupoDesc}
                // onChange={handleChangeGrupo("idStkGrupo")}
                onChange={handleChange}
                SelectProps={{ native: true }}
                className={classes.textField_370}
              >
                <option></option>
                {state.stkgrupo.map(option => (
                  <option key={option.idStkGrupo} value={option.idStkGrupo}>
                    {option.StkGrupoDesc}
                  </option>
                ))}
              </TextField>

              <TextField
                // className={classes.cajas}
                id="Rubro"
                select
                label="Rubro"
                fullWidth
                value={state.idStkRubro}
                onChange={() => handleChangeRubro("idStkRubro")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
                className={classes.textField_150}
              >
                <option></option>
                {state.stkrubro.map(option => (
                  <option key={option.idStkRubro} value={option.idStkRubro}>
                    {option.StkRubroDesc}
                  </option>
                ))}
              </TextField>

              <TextField
                id="Items"
                select
                label="Items"
                fullWidth
                value={state.StkItems}
                onChange={() => handleChangeItems("StkItems")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
                className={classes.textField_150}
              >
                <option></option>
                {state.stkitems.map(option => (
                  <option key={option.idStkItems} value={option.idStkItems}>
                    {option.StkItemsDesc}
                  </option>
                ))}
              </TextField>
              {/* </Grid> */}
            </Grid>
            {/* Segunda linea FIN */}
            {/* Cantidad/ StkRubroPresDes / StkRubroPres / StkRubroUM */}
            <Grid container spacing={2} justify="flex-start">
              <Grid item xs={3}>
                <TextField
                  id="cantidad"
                  label="Cantidad"
                  type="number"
                  fullWidth
                  value={state.cantidad}
                  onChange={() => handleChange("cantidad")}
                  autoFocus={true}
                  // className={classes.textField_60}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label=" "
                  id="StkRubroPres"
                  type="Number"
                  // fullWidth
                  value={state.StkRubroPres}
                  onChange={() => handleChange("StkRubroPres")}
                  autoFocus={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">de: </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label=" "
                  fullWidth
                  value={state.StkRubroUM}
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">X</InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  id="StkRubroAncho"
                  label="Ancho"
                  type="number"
                  fullWidth
                  value={state.StkRubroAncho}
                  onChange={() => handleChange("StkRubroAncho")}
                  autoFocus={true}
                  // className={classes.textField_60}
                />
              </Grid>
              {/* Partida Ubicación-Geografica Ubicación-Fisica */}
              {/* <Grid item xs> */}
            </Grid>
            <Grid container>
              <TextField
                id="StkEnvasePartida"
                type="text"
                label="Partida"
                fullWidth
                value={state.StkEnvasePartida}
                onChange={() => handleChange("StkEnvasePartida")}
                // className={classes.textField_150}
              ></TextField>
              {/* </Grid> */}
            </Grid>

            <Grid item xs>
              <TextField
                id="StkEnvaseUbG"
                select
                label="Ubicación Geografica"
                fullWidth
                // value={this.state.indiceub}
                value={state.StkEnvaseUbG}
                onChange={() => handleChangeUbicacion("StkEnvaseUbG")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
                className={classes.textField_150}
                InputLabelProps={{ shrink: true }}
              >
                <option default></option>

                {/* {this.state.ubicacion.map(option => (   */}
                {ubicacion.map(option => (
                  <option key={option.indiceub} value={option.indiceub}>
                    {option.detalleub}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs>
              <TextField
                id="StkEnvaseUbF"
                select
                label="Ubicación Física"
                fullWidth
                value={state.StkEnvaseUbF}
                onChange={() => handleChange("StkEnvaseUbF")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
                className={classes.textField_150}
              >
                <option></option>
                {state.ubicacionf.map(option => (
                  <option
                    key={option.idStkUbFisica}
                    value={option.idStkUbFisica}
                  >
                    {option.idStkUbFisica}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={2} sm={12} lg={12}>
              <TextField
                id="StkEnvaseObserv"
                type="text"
                label="Observación"
                fullWidth
                value={state.StkEnvaseObserv}
                onChange={() => handleChange("StkEnvaseObserv")}
                className={classes.textField}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-start">
            <IconButton onClick={limpioPantalla}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Button variant="contained" color="primary" onClick={agregastock}>
            Confirmar
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={limpioPantalla}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      {/* )} descomentar */}

      {/* IMPRESION */}
      {/* ********* */}

      {/* {this.state.toggle_imprimir && */}
      <Dialog
        open={state.toggle_state.dialogo}
        // aria-labelledby="form-dialog-title"
        // onClose={this.toggleImprimir}

        // open={this.state.toggle_im<Button variant="contained" color="primary" onClick = {this.ImpConf}  >primir}  // toggle_imprimir = TRUE

        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">Desea Imprimir ?</DialogTitle>
        <DialogActions>
          {/* <Button variant="contained" color="primary" onClick = {this.ImpConf}  > */}
          <Button variant="contained" color="primary" onClick={toggleImprimir}>
            Imprimir
          </Button>
          {/* <Button variant="contained" color="secondary" onClick={this.toggleImprimir}> */}
          {/* <Button variant="contained"x color="secondary" onClick={() => alert("Aprete boton cancelar")}> */}
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      {/* } */}

      {/* {this.state.imp_conf && <StkGenImpQR ubicaG = {this.state.StkEnvaseUbG} />} */}

      {state.toggle_state.imprimir && (
        <StkGenImpQR
          ubicaG={state.StkEnvaseUbG}
          cancelaImpresion={cancelaImpresion}
        />
      )}
    </div>
  );
};
export default StkMovEntrada;
