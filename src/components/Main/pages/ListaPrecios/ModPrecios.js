import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";

// import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";
// import Select from '@material-ui/core/Select';
import CodigoError from '../../../lib/CodigoError'
// import AgregarMonedas from './StkMonedasAgregar'
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

class ModPrecios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idStkGrupo : this.props.idStkGrupo,
      StkGrupoDesc: this.props.StkGrupoDesc,
      StkGrupoAbr: this.props.StkGrupoAbr,        
      StkGrupoContRubro:this.props.StkGrupoContRubro,
      stkgrupo:[],
      codigo_grupo:"Valor Inicial",
      idStkTipoProveed: 0,
      StkTipoProveedDesc: "",
      proveedores: [],
      grupos: [],
      idStkMonedas: "",
      StkMonedasDescripcion: "",
      StkMonedasCotizacion: 0,
      stkmonedas: [],
      unmed:[],
      nuevocodigo:0,
      open: true,
      Importe:0,      // borrar 
      Porcentage:0,    // borrar
      // StkGrupoAbr:'',     // borrar
      // StkGrupoContRubro:0 // borrar
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

  handleChange = prop => event => {
    console.log("dentro de handlechange, Valor de event.target.value : " + event.target.value)
    console.log("dentro de handlechange, Valor de [prop] : " + [prop])
    this.setState({ [prop]: event.target.value });
    // this.setState({
    //     proveedor:{...this.state.proveedor,[event.target.id]: event.target.value},
    //   })
    //   .then(()=>{return(console.log("Dentro de handlechange contenido de Proveedor:")
    //   console.log(this.state.proveedor))})

  };
  
// Leo proveedores y grupos

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

  gruposleer = _ => {
    const url = IpServidor + '/stkgrupoleer'; 
    request
    .get(url)
    .set('Content-Type', 'application/json')
    .then(res=> {
      const grupos = JSON.parse(res.text)
      this.setState({grupos: grupos})
    })
  }



  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  }

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitGrupo= (e) => {
    e.preventDefault();
    this.modificaGrupo();
    this.props.read()
    this.props.toggleModificar();
  }

  // componentWillMount(){
  //   // this.proveedoresleer()
  //   // this.leestkgrupo()
  //   this.unmedleer()
  //   this.leetmon()
  // }
 
  componentDidMount() {
  this.proveedoresleer()
  this.gruposleer()
  }

  render() {
    
    return (
      <div>
        <h1>ModPrecio</h1>
        <br></br>
        <br></br>
        <h2>Estos son los datos que tienen que estar en este componente</h2>
        <br></br>
        <br></br>
        <p>[Codigo de Proveedores | 0 ]</p>
          
          {/* {this.state.proveedores.map(proveedor => {
           return(<p>{proveedor.ProveedoresDesc}</p>)
          })
          } */}

          <TextField
            id="CodigoProveedor" 
            select={true}
            label= 'Proveedor'
            SelectProps={{native:true}}
            onChange = {this.handleChange('CodigoProveedor')}
            >
              {this.state.proveedores.map(proveedor => (
                  <option
                      key={proveedor.idProveedor}
                      value={proveedor.idProveedores}
                  >
                      {proveedor.idProveedores} 
                      {proveedor.ProveedoresDesc}
                  </option>
              ))}
          </TextField>

        <p>[ Codigo de Grupo | 0 ]</p>

          <TextField
              id="CodigoGrupo" 
              select
              label= 'Grupo'
              SelectProps={{native:true}}
              onChange = {this.handleChange('CodigoGrupo')}
              >
                {this.state.grupos.map(grupo => (
                    <option
                        // key={grupo.idStkGrupo}
                        value={grupo.idStkGrupo}
                    >
                        {grupo.idStkGrupo} {grupo.StkGrupoDesc}
                    </option>
                ))}
          </TextField>

        <p>[ Importe = 0 || Importe != 0 ]</p>

        <TextField
              margin="dense"
              id="Importe"
              label="Importe"
              type="number"
              fullWidth
              placeholder="Importe"
              value={this.state.importe} 
              onChange={this.handleChange('Importe')}
              // onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
        <p>[ % | 0 ]</p>

        <TextField
              margin="dense"
              id="Porcentage"
              label="Porcentage"
              type="number"
              fullWidth
              placeholder="Porcentage"
              value={this.state.porcentage} 
              onChange={this.handleChange('Porcentage')}
              // onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />

            {/* Nota para Rogelio falta llamar al backend que hizo sandra y mandar los cuatro datos que recabo de aca.         */}

            <Button
              onClick={ 
                ()=>{
                  var Importe = parseInt (this.state.Importe , 10)
                  var Porcentage = parseInt (this.state.Porcentage , 10)
                  
                if( ( Importe && !Porcentage ) || ( !Importe && Porcentage ) ) {
                  alert(`Correcto Importe = ${Importe} Porcentage = ${Porcentage}`)
                }else 
                  alert(`InCorrecto Importe = ${Importe} Porcentage = ${Porcentage}`)
                }
              }
            >
              Enviar
            </Button>      
       
      </div>
    );
  }
}

export default ModPrecios;
