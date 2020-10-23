// import React, { Component} from 'react'
import React from "react";
import request from "superagent";
import IpServidor from '../../../../VariablesDeEntorno'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { confirmAlert } from "react";

// import { confirmAlert } from 'react-confirm-alert'
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { FormControl, DialogContentText } from '@material-ui/core';
// import { throws } from 'assert';
// import { AlertWarning } from  '@material-ui/svg-icons';

const TipoConfeccion = [
  {
    indice: 1,
    detalle: "Con Dobladillo"
  },
  {
    indice: 2,
    detalle: "Con Fajas"
  },
  {
    indice: 3,
    detalle: "Paño Unido"
  },
  {
    indice: 4,
    detalle: "Enrollable"
  }
];
class StkMovSalida extends React.Component {
  constructor() {
    super();
    this.state = {
      stkrubro: [],
      stkgrupo: [],
      stkitems: [],
      StkItemsCantidad: 0.0,
      StkItemsCantDisp: 0.0,
      StkItemsFAct: "",
      StkItemsMin: 0.0,
      StkItemsMax: 0.0,
      TConfec: 0,
      cantidad: 1.0,
      largo: 0.0,
      ancho: 0.0,
      faltante: 0.0,
      total: 0.0,
      datostraid: [],
      open: true,
      marcaver: false
    };
  }
  submit = () => {
    confirmAlert({
      title: "La Cantidad excede la Disponibilidad",
      message: "Confirma el Movimiento",
      buttons: [
        {
          label: "Si",
          onClick: () => alert("Click Yes")
        },
        {
          label: "No",
          onClick: () => alert("Click No")
        }
      ]
    });
  };

  // Lee Grupo inicio
  leestkgrupo = _ => {
    const url = IpServidor + "/stkgrupoleer";
    console.log("url ");
    console.log(url);
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkgrupo = JSON.parse(res.text);
        this.setState(() => {
          return { stkgrupo: stkgrupo };
        });
      });
    console.log("this.state.stkgrupo");
    console.log(this.state.stkgrupo);
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

    // this.marcagrupo()
  };

  stkitemsleecodgryrb = idStkRubro => {
    var idStkGrupo = this.state.StkItemsGrupo;
    const url = IpServidor + "/stkitemsleecodgryrb/?idStkGrupo=" + idStkGrupo + "&idStkRubro=" + idStkRubro;
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
    var idStkItems = this.state.StkItems;
    var idStkGrupo = this.state.StkItemsGrupo;
    var idStkRubro = this.state.StkItemsRubro;
    const url =
      IpServidor +
      "/stkitemsleecodgrrbit/?idStkItems=" +
      idStkItems +
      "&idStkGrupo=" +
      idStkGrupo +
      "&idStkRubro=" +
      idStkRubro;
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkitemse = JSON.parse(res.text);
        this.setState({ stkitemse: stkitemse });
        this.setState({
          StkItemsCantidad: this.state.stkitemse[0].StkItemsCantidad
        });
        this.setState({
          StkItemsCantDisp: this.state.stkitemse[0].StkItemsCantDisp
        });
        this.setState({ StkItemsFAct: this.state.stkitemse[0].StkItemsFAct });
        this.setState({ StkItemsMin: this.state.stkitemse[0].StkItemsMin });
        this.setState({ StkItemsMax: this.state.stkitemse[0].StkItemsMax });
        var recorte = this.state.StkItemsFAct.substr(0, 10);
        this.setState({ StkItemsFAct: recorte });
      });
  };

  componentWillMount() {
    this.leestkgrupo();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChangeGrupo = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkrubroleecodgrupo(this.state.StkItemsGrupo)
    );
  };
  handleChangeRubro = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkitemsleecodgryrb(this.state.StkItemsRubro)
    );
  };

  handleChangeItems = prop => event => {
    this.setState({ [prop]: event.target.value }, () =>
      this.stkitemsleecodgrrbit()
    );
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  verificadisp = _ => {
    var cant = Number(this.state.cantidad);
    var larg = Number(this.state.largo);
    var anch = Number(this.state.ancho);

    const url = IpServidor + "/stkverificadisp";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ cant: cant })
      .send({ larg: larg })
      .send({ anch: anch })
      .send({ StkItemsCantDisp: this.state.StkItemsCantDisp })
      .send({ TConfec: this.state.TConfec })
      .then(res => {
        const faltantev = JSON.parse(res.text);
        this.setState({ datostraid: faltantev });
        this.setState({ marcaver: true });
        this.setState({ faltante: this.state.datostraid[0] });
        this.setState({ total: this.state.datostraid[1] });
      });
  };
  // descargastock = _ => {
  //   alert('descarga stock')
  //   }
  descargastock = _ => {
    const url =
      IpServidor +
      "/stkitemsmoddisp/?StkItems=" +
      this.state.StkItems +
      "&StkItemsGrupo=" +
      this.state.StkItemsGrupo +
      "&StkItemsRubro=" +
      this.state.StkItemsRubro; //'http://localhost:3000/data'
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ total: Number(this.state.total) })
      .send({ StkItemsCantDisp: this.state.StkItemsCantDisp })
      .then(res => {
        // const total1 = JSON.parse(res.text)
        //this.setState({marcaver:true})
      });

    if (this.state.total > 0) {
      const url1 = IpServidor + "/stkmovvtaagregar";
      request
        .post(url1)
        .set("Content-Type", "application/json")
        .send({ StkMovVtaCantidad: this.state.total })
        .send({ StkMovVtaItem: this.state.StkItems })
        .send({ StkMovVtaGrupo: this.state.StkItemsGrupo })
        .send({ StkMovVtaRubro: this.state.StkItemsRubro })
        .then(function (res) {
          // res.body, res.headers, res.status
        });
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={6} sm={6} lg={6}></Grid>
            <DialogTitle id="form-dialog-title">
              Salidas de stock por Confección en Venta
            </DialogTitle>
            <Grid item xs={6} sm={6} lg={6}></Grid>
          </Grid>
          <DialogContent>
            <Grid container spacing={32}>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="StkItemsGrupo"
                  select
                  label="Grupo"
                  fullWidth
                  value={this.state.StkItemsGrupo}
                  onChange={this.handleChangeGrupo("StkItemsGrupo")}
                  SelectProps={{
                    native: true
                  }}
                >
                  <option></option>
                  {this.state.stkgrupo.map(option => (
                    <option key={option.idStkGrupo} value={option.idStkGrupo}>
                      {option.StkGrupoDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
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
              <Grid item xs={6} sm={6} lg={6}>
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
              {this.state.StkItemsCantDisp < this.state.StkItemsMin ? (
                <Grid item xs={6} sm={6} lg={6}>
                  <TextField
                    id="CantDisp"
                    label="Cantidad Disponible"
                    value={this.state.StkItemsCantDisp}
                    style={{ background: "#f92c19" }}
                    disabled
                  ></TextField>
                </Grid>
              ) : (
                  <Grid item xs={6} sm={6} lg={6}>
                    <TextField
                      id="CantDisp"
                      label="Cantidad Disponible"
                      value={this.state.StkItemsCantDisp}
                      style={{ background: "#00e676" }}
                      disabled
                    ></TextField>
                  </Grid>
                )}
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="MinStock"
                  label="Mínimo Stock"
                  value={this.state.StkItemsMin}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="MaxStock"
                  label="Máximo Stock"
                  value={this.state.StkItemsMax}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  type="date"
                  id="FechaAct"
                  label="Fecha Actualización"
                  value={this.state.StkItemsFAct}
                  disabled
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="TConfec"
                  select
                  label="Tipo Confección"
                  fullWidth
                  value={this.state.indice}
                  onChange={this.handleChange("TConfec")}
                  SelectProps={{
                    native: true
                  }}
                  autoFocus={true}
                >
                  <option></option>
                  {TipoConfeccion.map(option => (
                    <option key={option.indice} value={option.indice}>
                      {option.detalle}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
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
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="largo"
                  label="Largo"
                  type="number"
                  fullWidth
                  value={this.state.largo}
                  onChange={this.handleChange("largo")}
                  autoFocus={true}
                ></TextField>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="ancho"
                  label="Ancho"
                  type="number"
                  fullWidth
                  value={this.state.ancho}
                  onChange={this.handleChange("ancho")}
                  autoFocus={true}
                ></TextField>
              </Grid>
              <DialogActions>
                {/* <Button variant="contained" color="primary"  onClick={this.submit}>Confirma</Button> */}
                [
                {!this.state.marcaver ? (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.verificadisp}
                    >
                      Confirmar
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.handleClose}
                    >
                      Cancelar
                    </Button>
                  </div>
                ) : (
                    [
                      this.state.faltante > 0 ? (
                        <div>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              ATENCION NO ALCANZA EL STOCK
                          </DialogContentText>
                            {/* <label color="secondary"> ATENCION NO ALCANZA EL STOCK </label> */}
                            <DialogActions>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.descargastock}
                              >
                                Verificado
                            </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleClose}
                              >
                                Cancelar
                            </Button>
                            </DialogActions>
                          </DialogContent>
                        </div>
                      ) : (
                          <div>
                            <label>DESCARGO EXITOSAMENTE</label>
                            {this.descargastock()}
                            {/* {this.handleClose()} */}
                          </div>
                        )
                    ]
                  )}
                ]
              </DialogActions>
            </Grid>
          </DialogContent>
        </Dialog>
        <DialogActions></DialogActions>
      </div>
    );
  }
}

export default StkMovSalida;
