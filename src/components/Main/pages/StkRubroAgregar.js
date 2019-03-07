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
import Select from '@material-ui/core/Select';

import AgregarMonedas from './StkMonedasAgregar'

class StkRubroAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: IpServidor + '/stkrubroagregar',
      idStkRubro: "",
      StkRubroCodGrp: "",
      StkRubroDesc: "",
      StkRubroAbr: "",
      StkRubroProv: "",
      StkRubroAncho: "",
      StkRubroPres: "",
      StkRubroUM:"",
      StkRubroCosto:"",
      StkRubroTM:"",
      // stkgrupo:{},
      stkgrupo:[],
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
  add = _ => {
    request
      .post(this.state.url)
      .set("Content-Type", "application/json")
      .send({ idStkRubro: this.state.idStkRubro })
      .send({ StkRubroCodGrp: this.state.StkRubroCodGrp })
      .send({ StkRubroDesc: this.state.StkRubroDesc })
      .send({ StkRubroAbr: this.state.StkRubroAbr })
      .send({ StkRubroProv: this.state.StkRubroProv })
      .send({ StkRubroAncho: this.state.StkRubroAncho })
      .send({ StkRubroPres: this.state.StkRubroPres })
      .send({ StkRubroUM: this.state.StkRubroUM })
      .send({ StkRubroCosto: this.state.StkRubroCosto })
      .send({ StkRubroTM: this.state.StkRubroTM })
      .set("X-API-Key", "foobar")
      .then(function(res) {});
  };

// Lee tipo Grupo inicio 
  leestkgrupo = _ => {
    // const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
    const url = IpServidor + "/stkgrupoleer";
    request
    .get(url)
    .set('Content-Type', 'application/json')
        .then(res=> {
        
          const stkgrupo = JSON.parse(res.text);
          console.log(`stkgrupo :`)
    console.log(stkgrupo)
        this.setState(()=>{ return {stkgrupo: stkgrupo}});
        
        })
    console.log(`dentro de leestkgrupo `)
    console.log(`this.state.stkgrupo :`)
    console.log(this.state.stkgrupo)
    
    // this.marcagrupo()
    }
// Lee tipo Grupo Fin

  leetprov = _ => {
    const url = IpServidor + "/stktipoproveedleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const tipoprov = JSON.parse(res.text);
        this.setState({ tipoprov: tipoprov });
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
    this.add();
    //      this.props.read()
    this.props.click();
  }

  componentDidMount() {
    // this.leetprov();
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
    // this.leetmon();
    console.log("componentdidmount !!!!")
    console.log(this.state.stkgrupo)
    // this.leestkgrupo()
  }

  componentWillMount(){
    console.log("componentWILLmount !!!!")
    // this.leetprov();
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
    // this.leetmon();
    
    this.leestkgrupo()
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
          <DialogTitle id="form-dialog-title">Aregar Rubro</DialogTitle>
          <DialogContent>
            <TextField
              id="idStkRubro"
              label="Rubro"
              value={this.state.idStkRubro}
              onChange={this.handleChange("idStkRubro")}
              margin="dense"
              fullWidth
              variant="standard"
              autoFocus={true}
              onKeyPress={event => {
                if (event.key === "Enter")
                  document.getElementById("StkRubroCodGrp").focus();
              }}
            />
            <div>

              <TextField
                id="idStkGrupo"
                select={true}
                label="Grupo"
                value={this.state.idStkGrupo}
                onChange={this.handleChange("idStkGrupo")}
              >
                 {this.state.stkgrupo.map(option => (  
                  <MenuItem 
                  id="tipogrupo"
                  key={option.idStkGrupo}
                  value={option.idStkGrupo}
                  >
                      {option.StkGrupoDesc} 
                   </MenuItem>))} 
                                
                ))}
              </TextField>


            </div>
           
            <div>
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
            </div>
            <div>
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
              <TextField
                id="StkRubroProv"
                label="Proveedor"
                value={this.state.StkRubroProv}
                onChange={this.handleChange("StkRubroProv")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkRubroAncho").focus();
                }}
              />
              <TextField
                id="StkRubroAncho"
                label="Ancho"
                value={this.state.StkRubroAncho}
                onChange={this.handleChange("StkRubroAncho")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkRubroPres").focus();
                }}
              />
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
            </div>
            <div>
              <TextField
                id="StkRubroUM"
                label="Unidad de Medida"
                value={this.state.StkRubroUM}
                onChange={this.handleChange("StkRubroUM")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkRubroCosto").focus();
                }}
              />
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
              <TextField
                id="StkRubroTM"
                label="Moneda"
                value={this.state.StkRubroTM}
                onChange={this.handleChange("StkRubroTM")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("Grabar").focus();
                }}
              />
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              id="Grabar"
              variant="contained"
              color="primary"
              // onClick={this.submitProveedor}
              onClick={()=>{return alert("GRABO RUBRO")}}
            >
              Grabar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.click}
              // onClick={()=>{return alert("GRABO RUBRO")}}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StkRubroAgregar;
