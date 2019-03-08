import React, { Component } from "react";
import request from "superagent";
import IpServidor from "./VariablesDeEntorno";
import "react-table/react-table.css";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";

// import AgregarMonedas from './StkMonedasAgregar'

class ProveedoresAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      provdesc: "",
      provtipo: 1,
      provcuit: "",
      provcalle: "",
      provnrocalle: 0,
      provpiso: "",
      provdto: "",
      provcodpostal: "",
      provlocalidad: "",
      provprovincia: "",
      provtelefono: "",
      provcontacto: "",
      provmail: "",
      provpagweb: "",
      provcodmon: "",
      idStkTipoProveed: 0,
      StkTipoProveedDesc: "",
      tipoprov: [],
      idStkMonedas: "",
      StkMonedasDescripcion: "",
      StkMonedasCotizacion: 0,
      stkmonedas: [],
      open: true
    };
    this.updateField = this.updateField.bind(this);
    this.submitProveedor = this.submitProveedor.bind(this);
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

  // Create
  addProveedor = _ => {
    const url = IpServidor + "/proveedoresagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ provdesc: this.state.provdesc })
      .send({ provtipo: this.state.provtipo })
      .send({ provcuit: this.state.provcuit })
      .send({ provcalle: this.state.provcalle })
      .send({ provnrocalle: this.state.provnrocalle })
      .send({ provpiso: this.state.provpiso })
      .send({ provdto: this.state.provdto })
      .send({ provcodpostal: this.state.provcodpostal })
      .send({ provlocalidad: this.state.provlocalidad })
      .send({ provprovincia: this.state.provprovincia })
      .send({ provtelefono: this.state.provtelefono })
      .send({ provcontacto: this.state.provcontacto })
      .send({ provmail: this.state.provmail })
      .send({ provpagweb: this.state.provpagweb })
      .send({ provcodmon: this.state.provcodmon })
      .set("X-API-Key", "foobar")
      .then(function(res) {});
  };

  leetprov = _ => {
    const url = IpServidor + "/stktipoproveedleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const tipoprov = JSON.parse(res.text);
        this.setState({ tipoprov: tipoprov });
        console.log("dentro de leetprov : ")
        console.log(this.state.tipoprov)
      });
  };

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

  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  }

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitProveedor(e) {
    e.preventDefault();
    this.addProveedor();
    //      this.props.read()
    this.props.click();
  }

  componentDidMount() {
    this.leetprov();
    this.leetmon();
  }

  render() {
    return (
      <div>
        <Dialog
          open={true}
          // open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ABMC Proveedores</DialogTitle>
          <DialogContent>
            <TextField
              id="provdesc"
              label="Descripción"
              value={this.state.provdesc}
              onChange={this.handleChange("provdesc")}
              margin="dense"
              fullWidth
              variant="standard"
              autoFocus={true}
              onKeyPress={event => {
                if (event.key === "Enter")
                  document.getElementById("provtipo").focus();
              }}
            />
            <div>
              <TextField
                id="provtipo"
                select={true}
                label="Tipo"
                value={this.state.provtipo}
                onChange={this.handleChange("provtipo")}
              >
                {this.state.tipoprov.map(option => (
                  <MenuItem
                    id="provtiposelect"
                    key={option.idStkTipoProveed}
                    value={option.idStkTipoProveed}
                  >
                    {option.StkTipoProveedDesc}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                id="provcuit"
                label="C.U.I.T."
                value={this.state.provcuit}
                onChange={this.handleChange("provcuit")}
                margin="normal"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provcalle").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="provcalle"
                label="Calle"
                value={this.state.provcalle}
                onChange={this.handleChange("provcalle")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provnrocalle").focus();
                }}
              />
              <TextField
                id="provnrocalle"
                label="Nro"
                value={this.state.provnrocalle}
                onChange={this.handleChange("provnrocalle")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provpiso").focus();
                }}
              />
              <TextField
                id="provpiso"
                label="Piso"
                value={this.state.provpiso}
                onChange={this.handleChange("provpiso")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provdto").focus();
                }}
              />
              <TextField
                id="provdto"
                label="Dto"
                value={this.state.provdto}
                onChange={this.handleChange("provdto")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provcodpostal").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="provcodpostal"
                label="Cód.Postal"
                value={this.state.provcodpostal}
                onChange={this.handleChange("provcodpostal")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provlocalidad").focus();
                }}
              />
              <TextField
                id="provlocalidad"
                label="Localidad"
                value={this.state.provlocalidad}
                onChange={this.handleChange("provlocalidad")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provprovincia").focus();
                }}
              />
              <TextField
                id="provprovincia"
                label="Provincia"
                value={this.state.provprovincia}
                onChange={this.handleChange("provprovincia")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provtelefono").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="provtelefono"
                label="Teléfono"
                value={this.state.provtelefono}
                onChange={this.handleChange("provtelefono")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provcontacto").focus();
                }}
              />
              <TextField
                id="provcontacto"
                label="Contacto"
                value={this.state.provcontacto}
                onChange={this.handleChange("provcontacto")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provmail").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="provmail"
                label="Mail"
                value={this.state.provmail}
                onChange={this.handleChange("provmail")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provpagweb").focus();
                }}
              />
              <TextField
                id="provpagweb"
                label="Pág.web"
                value={this.state.provpagweb}
                onChange={this.handleChange("provpagweb")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("provcodmon").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="provcodmon"
                select={true}
                label="Tipo Moneda"
                value={this.state.provcodmon}
                onChange={this.handleChange("provcodmon")}
                onKeyPress={event => {
                  // event.preventDefault();
                  if (event.key === "F2")
                  alert("anda")
                }}
              >
                {this.state.stkmonedas.map(option => (
                  <MenuItem
                    key={option.idStkMonedas}
                    value={option.idStkMonedas}
                  >
                    {option.StkMonedasDescripcion}
                  </MenuItem>
                ))}
               
              </TextField>
              
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitProveedor}
            >
              Grabar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.click}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ProveedoresAgregar;
