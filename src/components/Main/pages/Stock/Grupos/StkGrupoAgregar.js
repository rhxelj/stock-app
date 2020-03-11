import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import "react-table/react-table.css";
// import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
// import Select from '@material-ui/core/Select';

// import AgregarMonedas from './StkMonedasAgregar'
import CodigoError from "../../../../lib/CodigoError";

class StkGrupoAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // url: IpServidor + '/stkgrupoagregar',
      idStkRubro: 0,
      StkRubroCodGrp: "",
      StkRubroDesc: "",
      StkRubroAbr: "",
      StkRubroProv: "",
      StkRubroAncho: "",
      StkRubroPres: "",
      StkRubroUM: "",
      StkRubroCosto: "",
      StkRubroTM: "",
      // stkgrupo:{},
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
    this.updateField = this.updateField.bind(this);
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
    // this.setState(()=>{return{ [prop]: event.target.value }});
    // this.setState({value: event.target.value}, function () {
    //   console.log(this.state.value) })
    this.llama();

    this.setState({ [prop]: event.target.value }, function() {
      console.log("contenido de " + [prop] + " " + this.state.StkRubroCodGrp);
    });
  };

  llama = _ =>
    console.log(
      "Codigo de grupo dentro de handleChange : " + this.state.StkRubroCodGrp
    );

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
                StkGrupoAbr,
                StkGrupoContRubro: idStkGrupo,
                StkGrupoDesc
              }, // como esta en un arreglo lo paso a un solo objeto
              () => {}
            );

            this.setState(state => ({
              StkGrupoContRubro: state.StkGrupoContRubro + 1
            }));
            this.setState({ idStkRubro: this.state.StkGrupoContRubro });

            // this.setState({state =>{ return {grupoitem[0].StkGrupoContRubro : state.grupoitem[0].StkGrupoContRubro + 1,}}},()=>{console.log("nuevocodigo : " + this.state.nuevocodigo)})

            // })
          });
      }
    );
  };

  //****************************/
  //Update
  ActualizaGrupo = () => {
    request
      .post(IpServidor + "/stkgrupomodificar/" + this.state.idStkGrupo) //pongo el idStkGrupo
      .set("Content-Type", "application/json")
      .send({ StkGrupoDesc: this.state.StkGrupoDesc })
      .send({ StkGrupoAbr: this.state.StkGrupoAbr })
      .send({ StkGrupoContRubro: this.state.StkGrupoContRubro }) // Esto va a ser Cero inicialmente.
      .then(function(res) {})
      .catch(err => CodigoError(err));
  };

  //***************************/

  // Create

  add = _ => {
    const url = IpServidor + "/stkgrupoagregar";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ StkGrupoDesc: this.state.StkGrupoDesc })
      .send({ StkGrupoAbr: this.state.StkGrupoAbr })
      .send({ StkGrupoContRubro: 0 }) // Esto va a ser Cero inicialmente.
      .set("X-API-Key", "foobar")
      .then(function(res) {
        const respuesta = JSON.parse(res.text);
        if (respuesta.affectedRows !== 0) alert("EXITO");
        else alert("No modifico");
      })
      .catch(err => CodigoError(err));
  };

  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
  }

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitGrupo = e => {
    e.preventDefault();
    this.add();
    this.props.read();
    this.props.toggleAgregar();
  };

  render() {
    return (
      <div>
        <Dialog
          open={true}
          // open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Agregar Grupo</DialogTitle>
          <DialogContent>
            <div></div>

            <div>
              <TextField
                id="StkGrupoDesc"
                label="Descripción"
                value={this.state.StkGrupoDesc}
                onChange={this.handleChange("StkGrupoDesc")}
                margin="normal"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkGrupoAbr").focus();
                }}
              />
            </div>
            <div>
              <TextField
                id="StkGrupoAbr"
                label="Abreviatura"
                value={this.state.StkGrupoAbr}
                onChange={this.handleChange("StkGrupoAbr")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("Grabar ").focus();
                }}
              />
            </div>
            <div></div>
            <div></div>
            <div></div>
          </DialogContent>
          <DialogActions>
            <Button
              id="Grabar"
              variant="contained"
              color="primary"
              onClick={this.submitGrupo}
            >
              Grabar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.toggleAgregar}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StkGrupoAgregar;
