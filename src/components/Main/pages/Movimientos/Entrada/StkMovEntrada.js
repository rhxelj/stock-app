import React, { Fragment, useState, useEffect } from "react";
import request from "superagent";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Grid,
  Button,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import IpServidor from "../../VariablesDeEntorno";
import StkGenImpQR from "../../Impresion/StkGenImpQR";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  },
  cuerpo: { padding: "10px" },
  cajas: {
    marginLeft: "4px",
    marginRight: "4px"
    // width: auto
  }
});

var StkMovEntrada = props => {
  const [state, setState] = useState({
    ubicacion: [
      {
        indiceub: "PAR",
        detalleub: "PARQUE"
      },
      {
        indiceub: "RUT",
        detalleub: "RUTA"
      },
      {
        indiceub: "GB",
        detalleub: "GRUNBEING"
      }
    ],
    dialogo_imprimir: false,
    stkrubro: [],
    stkgrupo: [],
    stkitems: [],
    stkenvaseubg: [],
    ubicacionf: [],
    stkrubroele: [],
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
      dialogo: false,
      imprimir: false
    }
  });
  // const useStyles = makeStyles({
  //   root: {
  //     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  //     border: 0,
  //     borderRadius: 3,
  //     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  //     color: "white",
  //     height: 48,
  //     padding: "0 30px"
  //   }
  // });

  // Lee Grupo inicio
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
        console.log("TCL: stkrubro", stkrubro);
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

  const stkrubroleecodgryrb = () => {
    const url =
      IpServidor +
      "/stkrubroleecodgryrb/?id1=" +
      state.StkItemsRubro +
      "&id2=" +
      state.StkItemsGrupo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubroele = JSON.parse(res.text);
        console.log("TCL: stkrubroleecodgryrb -> stkrubroele", stkrubroele);
        setState({ ...state, stkrubroele: stkrubroele });
        console.log(
          "TCL: stkrubroleecodgryrb -> state.stkrubroele",
          state.stkrubroele
        );
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
    setState({
      stkrubro: [],
      stkgrupo: [],
      stkitems: [],
      stkItems: [],
      stkenvaseubg: [],
      ubicacionf: [],
      // ubicacion:[],
      stkrubroele: [],
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
      marcagenqr: false,
      imp_conf: false,
      marcaagregado: false,
      StkEnvaseUb: "",
      StkEnvaseObserv: "",
      StkEnvasePartida: "",
      indiceub: [],
      StkItemsGrupo: [],
      StkItemsRubro: "",
      StkItems: [],
      StkEnvaseUbF: [],
      StkEnvaseUbG: []
    });
    leestkgrupo();
  };
  useEffect(() => {
    leestkgrupo();
  }, []);
  function componentWillMount() {
    leestkgrupo();
  }

  function componentWillUnmount() {}

  function componentDidMount() {}

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - INICIO
  //***********************************************************//
  const handleChange = prop => event => {
    setState({ ...state, [prop]: event.target.value });
  };

  const handleChangeGrupo = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    console.log(
      "TCL: componentDidMount -> event.target.value",
      event.target.value
    );
    stkrubroleecodgrupo(state.StkItemsGrupo);
    console.log(
      "TCL: componentDidMount -> state.StkItemsGrupo",
      state.StkItemsGrupo
    );
  };

  const handleChangeUbicacion = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkubfisicaleerUbG(state.StkEnvaseUbG);
  };

  const handleChangeRubro = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkrubroleecodgryrb();
    setState({ ...state, [prop]: event.target.value });
    stkitemsleecodgryrb(state.StkItemsRubro);
  };

  const handleChangeItems = prop => event => {
    setState({ ...state, [prop]: event.target.value });
    stkitemsleecodgrrbit();
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
        // entrada: !prevState.toggle_state.entrada,
        // dialogo: !prevState.toggle_state.dialogo,
        // imprimir:!prevState.toggle_state.imprimir,
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

  // render() {
  const ubicacion = [
    {
      indiceub: "PAR",
      detalleub: "PARQUE"
    },
    {
      indiceub: "RUT",
      detalleub: "RUTA"
    },
    {
      indiceub: "GB",
      detalleub: "GRUNBEING"
    }
  ];
  const classes = useStyles();
  return (
    // console.log("toggle_state.entrada :" + this.state.toggle_state.entrada);
    // console.log("toggle_state.dialogo :" + this.state.toggle_state.dialogo);
    // console.log("toggle_state.imprimir :" + this.state.toggle_state.imprimir);

    <div>
      {/* {!this.state.toggle_imprimir && // toggle_imprimir = FALSE */}
      {state.toggle_state.entrada && ( // toggle_imprimir = FALSE
        <Fragment>
          <Grid container>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <Grid item xs={4} sm={4} lg={4}>
              <h1 className={classes.root}>Entradas de stock</h1>
            </Grid>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <Grid className={classes.cuerpo} container spacing={32}>
            <Grid item xs={3} sm={3} lg={3}>
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
              ></TextField>
            </Grid>

            <Grid item xs={3} sm={3} lg={3}>
              <TextField
                id="Cantidad"
                label="Cantidad "
                value={state.StkItemsCantidad}
                style={
                  state.StkItemsCantidad < state.StkItemsMin
                    ? { background: "#f92c19" }
                    : { background: "#00e676" }
                }
                disabled
              ></TextField>
            </Grid>

            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                id="MinStock"
                label="Mínimo Stock"
                value={state.StkItemsMin}
                disabled
              ></TextField>
            </Grid>
            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                id="MaxStock"
                label="Máximo Stock"
                value={state.StkItemsMax}
                disabled
              ></TextField>
            </Grid>
            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                InputLabelProps={{ shrink: true }}
                type="date"
                id="FechaAct"
                label="Fecha Actualización"
                value={state.StkItemsFAct}
                disabled
              ></TextField>
            </Grid>

            {/* <DialogContent> */}
            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                className={classes.cajas}
                id="StkItemsGrupo"
                select
                label="Grupo"
                fullWidth
                value={state.StkItemsGrupo}
                onChange={handleChangeGrupo("StkItemsGrupo")}
                SelectProps={{ native: true }}
              >
                <option></option>
                {state.stkgrupo.map(option => (
                  <option key={option.idStkGrupo} value={option.idStkGrupo}>
                    {option.StkGrupoDesc}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                className={classes.cajas}
                id="StkItemsRubro"
                select
                label="Rubro"
                fullWidth
                value={state.StkItemsRubro}
                onChange={handleChangeRubro("StkItemsRubro")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
              >
                <option></option>
                {state.stkrubro.map(option => (
                  <option key={option.idStkRubro} value={option.idStkRubro}>
                    {option.StkRubroDesc}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                id="StkItems"
                select
                label="Items"
                fullWidth
                value={state.StkItems}
                onChange={handleChangeItems("StkItems")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
              >
                <option></option>
                {state.stkitems.map(option => (
                  <option key={option.idStkItems} value={option.idStkItems}>
                    {option.StkItemsDesc}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Cantidad/ StkRubroPresDes / StkRubroPres / StkRubroUM */}
            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                id="cantidad"
                label="Cantidad"
                type="number"
                fullWidth
                value={state.cantidad}
                onChange={handleChange("cantidad")}
                autoFocus={true}
              ></TextField>
            </Grid>

            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                label=" "
                type="text"
                fullWidth
                value={state.StkRubroPresDes}
                disabled
              ></TextField>
            </Grid>

            {/* <Grid item  xs={2} sm={2} lg={2}> */}
            {/* <h1>de : </h1> */}
            <br></br>
            {/* <Typography variant="h6" component="h6">
                de :
              </Typography>
            </Grid> */}

            {/* <Grid item xs={1} sm={1} lg={1}>
              <Typography variant="h6" component="h6"></Typography>
            </Grid> */}
            <Grid item xs={4} sm={4} lg={4}>
              <br></br>
              <Typography variant="h6" component="h6">
                de :
                <TextField
                  label=""
                  id="StkRubroPres"
                  type="Number"
                  // fullWidth
                  value={state.StkRubroPres}
                  onChange={handleChange("StkRubroPres")}
                  autoFocus={true}
                ></TextField>
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} lg={2}>
              {/* <label>{this.state.StkRubroUM} x </label> */}

              <TextField
                label="X"
                fullWidth
                value={state.StkRubroUM}
                type="number"
              ></TextField>
            </Grid>

            <Grid item xs={2} sm={2} lg={2}>
              <TextField
                id="StkRubroAncho"
                label="Ancho"
                type="number"
                fullWidth
                value={state.StkRubroAncho}
                onChange={handleChange("StkRubroAncho")}
                autoFocus={true}
              ></TextField>
            </Grid>

            {/* Partida Ubicación-Geografica Ubicación-Fisica */}
            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                id="StkEnvasePartida"
                type="text"
                label="Partida"
                fullWidth
                value={state.StkEnvasePartida}
                onChange={handleChange("StkEnvasePartida")}
              ></TextField>
            </Grid>

            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                id="StkEnvaseUbG"
                select
                label="Ubicación Geografica"
                fullWidth
                // value={this.state.indiceub}
                value={state.StkEnvaseUbG}
                onChange={handleChangeUbicacion("StkEnvaseUbG")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
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
            <Grid item xs={4} sm={4} lg={4}>
              <TextField
                id="StkEnvaseUbF"
                select
                label="Ubicación Física"
                fullWidth
                value={state.StkEnvaseUbF}
                onChange={handleChange("StkEnvaseUbF")}
                SelectProps={{
                  native: true
                }}
                autoFocus={true}
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
                onChange={handleChange("StkEnvaseObserv")}
              ></TextField>
            </Grid>
          </Grid>
          {/* </DialogContent>
            <DialogActions> */}
          <Grid>
            <br></br>
            <br></br>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
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
          </Grid>
        </Fragment>
      )}

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
