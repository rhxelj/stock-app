import React, { Component } from "react";
import request from "superagent";

import IpServidor from "../../VariablesDeEntorno";

// Material UI START
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Material UI   END
import CodigoError from "../../../../lib/CodigoError";

class StkUnMedModificar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: IpServidor + "/stkunmedagregar",
      idStkUnMed: props.idStkUnMed,
      StkUnMedDesc: props.StkUnMedDesc,
      open: true // Material UI
    };
    this.updateField = this.updateField.bind(this);
    this.submitUnMed = this.submitUnMed.bind(this);
  }

  // // Agregar
  // add = _=> {
  //     // const url = IpServidor +'/agregarstkunmed'
  //     request
  //     .post(this.state.url)
  //     .set('Content-Type', 'application/json')
  //     .send({ idStkUnMed: this.state.idStkUnMed})
  //     .send({ StkUnMedDesc: this.state.StkUnMedDesc})
  //     .set('X-API-Key', 'foobar')
  //     .then(function(res) {
  //     // res.body, res.headers, res.status
  //         //     console.log('res.status  ' + res.status);
  //         //     console.log('esta aca');
  //         //     alert('Agrego correctamente');
  //     })

  //     .catch(err => {
  //         if (err.status === 409)
  //                 {
  //                 alert('Código de Moneda EXISTENTE  ')
  //                 }
  //                 else
  //                 {
  //                 if (err.status === 410)
  //                         {
  //                         alert('Código de Moneda no puede tener más de 4 dígitos ')
  //                         }
  //            else { console.log('Error nro :  ' + err.status)}
  //                     }
  //         })
  // }

  //Update
  stkunmedmodificar = () => {
    const url = IpServidor + "/stkunmedmodificar/" + this.state.idStkUnMed;

    request
      .post(url)
      .set("Content-Type", "application/json")

      //    .send({ idtipomonedas: this.state.idtipomonedas})
      .send({ idStkUnMed: this.state.idStkUnMed })
      .send({ StkUnMedDesc: this.state.StkUnMedDesc })
      .set("X-API-Key", "foobar")
      .then(function(res) {
        // res.body, res.headers, res.status
      })
      .catch(err => CodigoError(err));

    //this.getproveedores();
  };

  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  }

  submitUnMed(e) {
    e.preventDefault();
    this.stkunmedmodificar();
    this.props.read();
    this.props.toggleModificar();
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Dialog
          //   open={this.state.open}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Modificar Unidad de Medida
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los Datos y presione enter para cambiar de campo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="idStkUnMed"
              label="Código"
              type="text"
              fullWidth
              placeholder="Código"
              value={this.state.idStkUnMed}
              onChange={this.updateField}
              onKeyPress={event => {
                if (event.key === "Enter")
                  document.getElementById("StkUnMedDesc").focus();
              }}
            />
            <TextField
              margin="dense"
              id="StkUnMedDesc"
              label="Descripción"
              type="text"
              fullWidth
              placeholder="Descripción"
              value={this.state.StkUnMedDesc}
              onChange={this.updateField}
              onKeyPress={event => {
                if (event.key === "Enter")
                  document.getElementById("button--submit").focus();
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              id="button--submit"
              onClick={this.submitUnMed}
              color="primary"
              variant="contained"
            >
              Modificar
            </Button>
            <Button
              onClick={this.props.toggleModificar}
              color="secondary"
              variant="contained"
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StkUnMedModificar;
