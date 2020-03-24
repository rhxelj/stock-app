import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from "@material-ui/core";

import CodigoError from "../../../../lib/CodigoError";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";

class StkRubroModificar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idStkRubro: this.props.idStkRubro,
      StkRubroCodGrp: this.props.StkRubroCodGrp, //verificar si esta bien
      StkRubroDesc: this.props.StkRubroDesc,
      StkRubroAbr: this.props.StkRubroAbr,
      StkRubroProv: this.props.StkRubroProv,
      StkRubroAncho: this.props.StkRubroAncho,
      StkRubroPres: this.props.StkRubroPres,
      StkRubroPresDes: this.props.StkRubroPresDes,
      StkRubroUM: this.props.StkRubroUM,
      StkRubroCosto: this.props.StkRubroCosto,
      StkRubroTM: this.props.StkRubroTM,
      stkgrupo: [],
      idStkTipoProveed: 0,
      StkTipoProveedDesc: "",
      proveedores: [],
      idStkMonedas: "",
      StkMonedasDescripcion: "",
      StkMonedasCotizacion: 0,
      stkmonedas: [],
      unmed: [],
      nuevocodigo: 0,
      open: true,
      idStkGrupo: "", // borrar
      StkGrupoDesc: "", // borrar
      StkGrupoAbr: "", // borrar
      StkGrupoContRubro: 0 // borrar
    };
    // this.updateField = this.updateField.bind(this);
    // this.submitProveedor = this.submitProveedor.bind(this);
  }

  //Material Ui Dialog start
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  //Material Ui Dialog start

  //esto es para que en el select me muestre el item elegido
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  leeXcodgrupo = prop => event => {
    console.log("prop : " + prop); //control se puede Borrar esta linea
    this.setState(
      { [prop]: event.target.value },
      //aca leo grupo X Código
      function() {
        const url =
          IpServidor + "/stkgrupoleercod/" + this.state.StkRubroCodGrp;
        // console.log("la url es : "+url)                                   //control se puede Borrar esta linea
        request
          .get(url)
          .set("Content-Type", "application/json")
          .then(res => {
            // const grupoitem = JSON.parse(res.text)
            // this.setState({grupoitem:grupoitem[0]}, // como esta en un arreglo lo paso a un solo objeto
            var grupoitem = JSON.parse(res.text);
            var {
              idStkGrupo,
              StkGrupoDesc,
              StkGrupoAbr,
              StkGrupoContRubro
            } = grupoitem[0];
            this.setState(
              {
                idStkGrupo,
                StkGrupoDesc,
                StkGrupoAbr,
                StkGrupoContRubro: idStkGrupo,
                StkGrupoDesc,
                StkGrupoAbr,
                StkGrupoContRubro
              }, // como esta en un arreglo lo paso a un solo objeto
              () => {
                console.log(
                  "contenodo de grupo por separado",
                  this.state.idStkGrupo,
                  this.state.StkGrupoDesc,
                  this.state.StkGrupoAbr,
                  this.state.StkGrupoContRubro
                );
              }
            );
          });
      }
    );
  };

  // Create

  ModificaRubro = _ => {
    const url =
      IpServidor +
      "/stkrubromodificar/?idStkRubro=" +
      this.state.idStkRubro +
      "&StkRubroCodGrp=" +
      this.state.StkRubroCodGrp;
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({
        StkRubroDesc: this.state.StkRubroDesc,
        StkRubroAbr: this.state.StkRubroAbr,
        StkRubroProv: this.state.StkRubroProv,
        StkRubroAncho: this.state.StkRubroAncho,
        StkRubroPres: this.state.StkRubroPres,
        StkRubroPresDes: this.state.StkRubroPresDes,
        StkRubroUM: this.state.StkRubroUM,
        StkRubroCosto: this.state.StkRubroCosto,
        StkRubroTM: this.state.StkRubroTM
      })
      .then(function(res) {})
      .catch(err => CodigoError(err));
  };

  // Lee tipo Grupo inicio
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
  // Lee tipo Grupo Fin

  // Leo tipo Proveedor Inicio
  proveedoresleer = _ => {
    const url = IpServidor + "/proveedoresleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const proveedores = JSON.parse(res.text);
        this.setState({ proveedores: proveedores });
      });
  };
  // Leo tipo Proveedor Fin

  // Leo tipo Unidad de medidas Inicio
  unmedleer = _ => {
    const url = IpServidor + "/stkunmedleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const unmed = JSON.parse(res.text);
        this.setState({ unmed: unmed });
      });
  };
  // Leo tipo Unidad de medidas Fin

  leetmon = _ => {
    const url = IpServidor + "/stkmonedasleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const stkmonedas = JSON.parse(res.text);
        this.setState({ stkmonedas: stkmonedas });
      });
  };

  updateField = field => {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  };

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitProveedor = e => {
    e.preventDefault();
    this.ModificaRubro();
    this.props.read();
    this.props.toggleModificar();
  };

  componentDidMount() {
    this.leestkgrupo();
    this.proveedoresleer();
    this.unmedleer();
    this.leetmon();
  }

  // componentWillMount() {
  //   this.proveedoresleer();
  //   this.leestkgrupo();
  //   this.unmedleer();
  //   this.leetmon();
  //   console.log(
  //     "dentro de componentWillMount Valor de idStkRubro : ",
  //     this.state.idStkRubro
  //   );
  //   console.log(this.state.StkRubroPresDes);
  //   // console.log('tipo proveedor dentro de DIDMOUNT ')
  //   // console.log(this.state.tipoprov)
  // }

  render() {
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Grid container>
            <Grid item xs={4} sm={4} lg={4}></Grid>
            <DialogTitle id="form-dialog-title">Modificar Rubro</DialogTitle>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <DialogContent>
            {/* GRUPO INICIO*/}
            <Grid container spacing={1}>
              <Grid item xs={8} sm={8} lg={8}>
                <TextField
                  id="idStkGrupo"
                  // select={true}
                  select
                  label="Grupo"
                  SelectProps={{
                    native: true
                  }}
                  value={this.state.StkRubroCodGrp}
                >
                  {this.state.stkgrupo.map(option => (
                    <option
                      id="tipogrupo"
                      key={option.idStkGrupo}
                      value={option.idStkGrupo}
                      onClick={() => console.log("Hizo Click")}
                    >
                      {option.StkGrupoDesc}
                    </option>
                  ))}
                  ))}
                </TextField>
              </Grid>

              {/* GRUPO FIN*/}

              {/* DESCRIPCION-Abrebiatura INICIO*/}
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="StkRubroDesc"
                  label="Descripción"
                  value={this.state.StkRubroDesc}
                  onChange={this.handleChange("StkRubroDesc")}
                  margin="normal"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroAbr").focus();
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <TextField
                  id="StkRubroAbr"
                  label="Abreviatura"
                  value={this.state.StkRubroAbr}
                  onChange={this.handleChange("StkRubroAbr")}
                  margin="dense"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroProv").focus();
                  }}
                />
              </Grid>
              {/* DESCRIPCION-Abrebiatura FIN*/}
              <Grid item xs={8} sm={8} lg={8}>
                <TextField
                  id="StkRubroProv"
                  select={true}
                  label="Proveedor"
                  SelectProps={{
                    native: true
                  }}
                  value={this.state.StkRubroProv}
                  onChange={this.handleChange("StkRubroProv")}
                >
                  {this.state.proveedores.map(option => (
                    <option
                      id="proveedor"
                      key={option.idProveedores}
                      value={option.idProveedores}
                    >
                      {option.ProveedoresDesc}
                    </option>
                  ))}
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} lg={4}></Grid>

              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroAncho"
                  label="Ancho"
                  value={this.state.StkRubroAncho}
                  onChange={this.handleChange("StkRubroAncho")}
                  margin="dense"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroPresDes").focus();
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroPresDes"
                  label="Presentacion Descripcion"
                  value={this.state.StkRubroPresDes}
                  onChange={this.handleChange("StkRubroPresDes")}
                  margin="dense"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroPres").focus();
                  }}
                />
              </Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroPres"
                  label="Presentacion"
                  value={this.state.StkRubroPres}
                  onChange={this.handleChange("StkRubroPres")}
                  margin="dense"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroUM").focus();
                  }}
                />
              </Grid>

              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroUM"
                  select={true}
                  label="Unidad de Medida"
                  value={this.state.StkRubroUM}
                  onChange={this.handleChange("StkRubroUM")}
                >
                  {this.state.unmed.map(option => (
                    <option
                      id="unidaddemedida"
                      key={option.idStkUnMed}
                      value={option.idStkUnMed}
                    >
                      {option.StkUnMedDesc}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroCosto"
                  label="Costo"
                  value={this.state.StkRubroCosto}
                  onChange={this.handleChange("StkRubroCosto")}
                  margin="dense"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroTM").focus();
                  }}
                />
              </Grid>

              <Grid item xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroTM"
                  select={true}
                  label="Moneda"
                  value={this.state.StkRubroTM}
                  onChange={this.handleChange("StkRubroTM")}
                >
                  {this.state.stkmonedas.map(option => (
                    <option
                      id="tipomoneda"
                      key={option.idStkMonedas}
                      value={option.idStkMonedas}
                    >
                      {option.StkMonedasDescripcion}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              id="ModificaRubro"
              variant="contained"
              color="primary"
              onClick={this.submitProveedor}
            >
              Modifica Rubro
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.toggleModificar}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StkRubroModificar;
