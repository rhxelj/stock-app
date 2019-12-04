import React, { Fragment } from "react";
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

import IpServidor from "../../VariablesDeEntorno";
import StkGenImpQR from "../../Impresion/StkGenImpQR";

class StkMovEntrada extends React.Component {
  constructor() {
    super();
    this.state = {
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
      // TConfec: 0,
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
      // ubicacion : ''
      toggle_state: {
        entrada: true,
        dialogo: false,
        imprimir: false
      }
    };
  }

  // Lee Grupo inicio
  leestkgrupo = _ => {
    const url = IpServidor + "/stkgrupoleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        this.setState(() => {
          return { stkgrupo: stkgrupo };
        });
      });
  };

  //lee rubro por código de grupo
  stkrubroleecodgrupo = id => {
    const url = IpServidor + "/stkrubroleecodgrupo/" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubro = JSON.parse(res.text);
        this.setState(() => {
          return { stkrubro: stkrubro };
        });
      });
  };

  //lee ubicacion física según la ubicación geografica
  stkubfisicaleerUbG = id => {
    const url = IpServidor + "/stkubfisicaleerUbG/?id=" + id;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const ubicacionf = JSON.parse(res.text);
        this.setState(() => {
          return { ubicacionf: ubicacionf };
        });
      });
  };

  stkrubroleecodgryrb = () => {
    const url =
      IpServidor +
      "/stkrubroleecodgryrb/?id1=" +
      this.state.StkItemsRubro +
      "&id2=" +
      this.state.StkItemsGrupo;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkrubroele = JSON.parse(res.text);
        this.setState(() => {
          return { stkrubroele: stkrubroele };
        });
        this.setState({
          StkRubroAncho: this.state.stkrubroele[0].StkRubroAncho,
          StkRubroPresDes: this.state.stkrubroele[0].StkRubroPresDes,
          StkRubroPres: this.state.stkrubroele[0].StkRubroPres,
          StkRubroUM: this.state.stkrubroele[0].StkRubroUM
        });
      });
  };

  stkitemsleecodgryrb = id3 => {
    var id2 = this.state.StkItemsGrupo;
    const url = IpServidor + "/stkitemsleecodgryrb/?id2=" + id2 + "&id3=" + id3;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkitems = JSON.parse(res.text);
        this.setState(() => {
          return { stkitems: stkitems };
        });
      });
  };

  stkitemsleecodgrrbit = () => {
    var id1 = this.state.StkItems;
    var id2 = this.state.StkItemsGrupo;
    var id3 = this.state.StkItemsRubro;
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
        this.setState({ stkitemse: stkitemse });
        this.setState({
          StkItemsCantidad: this.state.stkitemse[0].StkItemsCantidad,
          StkItemsCantDisp: this.state.stkitemse[0].StkItemsCantDisp,
          StkItemsFAct: this.state.stkitemse[0].StkItemsFAct,
          StkItemsMin: this.state.stkitemse[0].StkItemsMin,
          StkItemsMax: this.state.stkitemse[0].StkItemsMax
        });
        var recorte = this.state.StkItemsFAct.substr(0, 10);
        this.setState({ StkItemsFAct: recorte });
      });
  };

  limpioPantalla = () => {
    // this.setState({indiceub : '',})
    // this.setState({toggle_imprimir: false,})
    this.setState(
      {
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
      },
      this.leestkgrupo()
    );
  };

  componentWillMount() {
    this.leestkgrupo();
  }

  componentWillUnmount() {}

  componentDidMount() {}

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - INICIO
  //***********************************************************//
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeGrupo = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkrubroleecodgrupo(this.state.StkItemsGrupo)
    );
  };

  handleChangeUbicacion = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkubfisicaleerUbG(this.state.StkEnvaseUbG)
    );
  };

  handleChangeRubro = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkrubroleecodgryrb()
    );
    this.setState({ [prop]: event.target.value }, () =>
      this.stkitemsleecodgryrb(this.state.StkItemsRubro)
    );
  };

  handleChangeItems = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkitemsleecodgrrbit()
    );
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    // this.setState({ open: false });
    // this.toggleImprimir()
    this.limpioPantalla();
    this.toggleEntradaDatos();
  };

  // Handles VARIOS REVISAR si se pueden "REDUCIR" - FIN
  //***********************************************************//

  // TODO inicio : Revisar tambien estos toggles creo que se pueden reducir a uno solo

  toggleState = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      alert(`Cambio el estado de ${[prop]}`)
    );
  };

  // Manejo de Pantalla - INICIO
  toggleEntradaDatos = () => {
    // console.log("valor de toggle_entrada : "+this.state.toggle_state.entrada)
    this.setState(prevState => ({
      toggle_state: {
        // entrada:!prevState.toggle_state.entrada,
        entrada: prevState.toggle_state.entrada,
        dialogo: !prevState.toggle_state.dialogo,
        imprimir: prevState.toggle_state.imprimir
      }
    })); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  };

  toggleImprimir = () => {
    this.setState(prevState => ({
      toggle_state: {
        entrada: !prevState.toggle_state.entrada,
        dialogo: !prevState.toggle_state.dialogo,
        imprimir: !prevState.toggle_state.imprimir
      }
    })); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
  };

  // TODO Fin: Hasta aca

  cancelaImpresion = () => {
    this.setState(prevState => ({
      toggle_state: {
        // entrada: !prevState.toggle_state.entrada,
        // dialogo: !prevState.toggle_state.dialogo,
        // imprimir:!prevState.toggle_state.imprimir,
        entrada: true,
        dialogo: false,
        imprimir: false
      }
    })); // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***
    this.limpioPantalla();
  };
  // Manejo de Pantalla - FIN

  MarcaGenQr = () => {
    this.setState(prevState => ({
      marcagenqr: !prevState.marcagenqr
    }));
  };

  ImpConf = () => {
    this.setState(prevState => ({
      imp_conf: !prevState.imp_conf,
      dialogo_imprimir: !prevState.dialogo_imprimir
    }));
    // this.toggleImprimir()
    this.toggleEntradaDatos();
  };
  //aca

  agregastock = _ => {
    const url =
      IpServidor +
      "/stkitemsmodstock/?id1=" +
      this.state.StkItems +
      "&id2=" +
      this.state.StkItemsGrupo +
      "&id3=" +
      this.state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cantidad: this.state.cantidad })
      .send({ StkRubroPres: this.state.StkRubroPres })
      .send({ StkItemsCantDisp: this.state.StkItemsCantDisp })
      .send({ StkItemsCantidad: this.state.StkItemsCantidad })
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
      this.state.StkItems +
      "&id2=" +
      this.state.StkItemsGrupo +
      "&id3=" +
      this.state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url1)
      .set("Content-Type", "application/json")
      // .send({total: Number(this.state.total)})
      .send({ cantidad: this.state.cantidad })
      .send({ StkRubroPres: this.state.StkRubroPres })
      .send({ StkEnvasePartida: this.state.StkEnvasePartida })
      .send({ StkEnvaseUbG: this.state.StkEnvaseUbG })
      .send({ StkEnvaseUbF: this.state.StkEnvaseUbF })
      .send({ StkEnvaseObserv: this.state.StkEnvaseObserv })
      .then(res => {
        // const total1 = JSON.parse(res.text)
        this.setState({ marcaagregado: true });
      })
      .catch(err => {
        if (err.status === 413) {
          alert("Falta información para agregar Envase  ");
        } else {
          console.log("Error nro en StkMovEntrada 2 :  " + err.status);
        }
      });
    // this.toggleImprimir()
    this.toggleEntradaDatos();
  };

  render() {
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

    // console.log("toggle_state.entrada :" + this.state.toggle_state.entrada);
    // console.log("toggle_state.dialogo :" + this.state.toggle_state.dialogo);
    // console.log("toggle_state.imprimir :" + this.state.toggle_state.imprimir);
    return (
      <div>
        {/* {!this.state.toggle_imprimir && // toggle_imprimir = FALSE */}
        {this.state.toggle_state.entrada && ( // toggle_imprimir = FALSE
          <Fragment>
            <Grid container>
              <Grid item xs={4} sm={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <h1 style={{ color: "Black" }}>Entradas de stock</h1>
              </Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>
            </Grid>
            <Grid container spacing={32}>
              <Grid item xs={3} sm={3} lg={3}>
                <TextField
                  id="CantDisp"
                  label="Cantidad Disponible"
                  value={this.state.StkItemsCantDisp}
                  style={
                    this.state.StkItemsCantDisp < this.state.StkItemsMin
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
                  value={this.state.StkItemsCantidad}
                  style={
                    this.state.StkItemsCantidad < this.state.StkItemsMin
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
                  value={this.state.StkItemsMin}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={2} sm={2} lg={2}>
                <TextField
                  id="MaxStock"
                  label="Máximo Stock"
                  value={this.state.StkItemsMax}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={2} sm={2} lg={2}>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="FechaAct"
                  label="Fecha Actualización"
                  value={this.state.StkItemsFAct}
                  disabled
                ></TextField>
              </Grid>

              {/* <DialogContent> */}
              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkItemsGrupo"
                  select
                  label="Grupo"
                  fullWidth
                  value={this.state.StkItemsGrupo}
                  onChange={this.handleChangeGrupo("StkItemsGrupo")}
                  SelectProps={{ native: true }}
                >
                  <option></option>
                  {this.state.stkgrupo.map(option => (
                    <option key={option.idStkGrupo} value={option.idStkGrupo}>
                      {option.StkGrupoDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkItemsRubro"
                  select
                  label="Rubro"
                  fullWidth
                  value={this.state.StkItemsRubro}
                  onChange={this.handleChangeRubro("StkItemsRubro")}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                >
                  <option></option>
                  {this.state.stkrubro.map(option => (
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
                  value={this.state.StkItems}
                  onChange={this.handleChangeItems("StkItems")}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                >
                  <option></option>
                  {this.state.stkitems.map(option => (
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
                  value={this.state.cantidad}
                  onChange={this.handleChange("cantidad")}
                  autoFocus={true}
                ></TextField>
              </Grid>

              <Grid item xs={2} sm={2} lg={2}>
                <TextField
                  label=" "
                  type="text"
                  fullWidth
                  value={this.state.StkRubroPresDes}
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

              <Grid item xs={1} sm={1} lg={1}>
                <Typography variant="h6" component="h6">
                  de :
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} lg={3}>
                <Typography variant="h6" component="h6">
                  <TextField
                    label=""
                    id="StkRubroPres"
                    type="Number"
                    // fullWidth
                    value={this.state.StkRubroPres}
                    onChange={this.handleChange("StkRubroPres")}
                    autoFocus={true}
                  ></TextField>
                </Typography>
              </Grid>

              <Grid item xs={2} sm={2} lg={2}>
                {/* <label>{this.state.StkRubroUM} x </label> */}

                <TextField
                  label="X"
                  fullWidth
                  value={this.state.StkRubroUM}
                  type="number"
                ></TextField>
              </Grid>

              <Grid item xs={2} sm={2} lg={2}>
                <TextField
                  id="StkRubroAncho"
                  label="Ancho"
                  type="number"
                  fullWidth
                  value={this.state.StkRubroAncho}
                  onChange={this.handleChange("StkRubroAncho")}
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
                  value={this.state.StkEnvasePartida}
                  onChange={this.handleChange("StkEnvasePartida")}
                ></TextField>
              </Grid>

              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkEnvaseUbG"
                  select
                  label="Ubicación Geografica"
                  fullWidth
                  // value={this.state.indiceub}
                  value={this.state.StkEnvaseUbG}
                  onChange={this.handleChangeUbicacion("StkEnvaseUbG")}
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
                  value={this.state.StkEnvaseUbF}
                  onChange={this.handleChange("StkEnvaseUbF")}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                >
                  <option></option>
                  {this.state.ubicacionf.map(option => (
                    <option
                      key={option.idStkUbFisica}
                      value={option.idStkUbFisica}
                    >
                      {option.idStkUbFisica}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={12} lg={12}>
                <TextField
                  id="StkEnvaseObserv"
                  type="text"
                  label="Observación"
                  fullWidth
                  value={this.state.StkEnvaseObserv}
                  onChange={this.handleChange("StkEnvaseObserv")}
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
              <Button
                variant="contained"
                color="primary"
                onClick={this.agregastock}
              >
                Confirmar
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={this.limpioPantalla}
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
          open={this.state.toggle_state.dialogo}
          // aria-labelledby="form-dialog-title"
          // onClose={this.toggleImprimir}

          // open={this.state.toggle_im<Button variant="contained" color="primary" onClick = {this.ImpConf}  >primir}  // toggle_imprimir = TRUE

          onClose={this.handleClose}
        >
          <DialogTitle id="form-dialog-title">Desea Imprimir ?</DialogTitle>
          <DialogActions>
            {/* <Button variant="contained" color="primary" onClick = {this.ImpConf}  > */}
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleImprimir}
            >
              Imprimir
            </Button>
            {/* <Button variant="contained" color="secondary" onClick={this.toggleImprimir}> */}
            {/* <Button variant="contained"x color="secondary" onClick={() => alert("Aprete boton cancelar")}> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClose}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        {/* } */}

        {/* {this.state.imp_conf && <StkGenImpQR ubicaG = {this.state.StkEnvaseUbG} />} */}
        {this.state.toggle_state.imprimir && (
          <StkGenImpQR
            ubicaG={this.state.StkEnvaseUbG}
            cancelaImpresion={this.cancelaImpresion}
          />
        )}
      </div>
    );
  }
}

export default StkMovEntrada;
