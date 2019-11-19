import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
// import CreateIcon from '@material-ui/icons/Create';
// import IconButton from '@material-ui/core/IconButton';

// import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogActions from "@material-ui/core/DialogActions";

// import MenuItem from "@material-ui/core/MenuItem";
// import DialogContentText from '@material-ui/core/DialogContentText';
// import Select from '@material-ui/core/Select';
// import AgregarMonedas from './StkMonedasAgregar'
import CodigoError from '../../../lib/CodigoError'
// import { makeStyles } from '@material-ui/core/styles';
import Mensajes from '../../../lib/Mensajes'



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
      Porcentage:0, 
      rta:"",   // borrar
      
      idProveedores: 0,
      // idStkGrupo: 0,
      importemod: 0,        
      porcentmod: 0,
      toggle:{
        // agregar: false,
        // busqueda: false,
        // modificar: false,
        mensaje: false,
    },
      
    }
    // this.updateField = this.updateField.bind(this);
    // this.submitProveedor = this.submitProveedor.bind(this);
  }

  //Material Ui Dialog start
  handleClickOpen = () => {
    // this.setState({ open: true });
    this.setState({ toggle:{mensaje: true} });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  //Material Ui Dialog start

  ModPrecio = () => {
    const url = IpServidor + '/modprecios/'
    // console.log("valor de toggle.mensaje antes de llamar a request: ")
    // console.log(this.state.toggle.mensaje)
    // this.toggle("mensaje")
    request                  
      .post(url)
         .set('Content-Type', 'application/json')
            .send({ 
              idProveedores: this.state.idProveedores,
              idStkGrupo: this.state.idStkGrupo,
              importemod: this.state.Importe,
              porcentmod: this.state.Porcentage
            })
         .then( res => { 
            const respuesta = JSON.parse(res.text)
            const rta = respuesta.affectedRows !==0
            console.log(`rta ` , rta)
            if (rta){
              // if (respuesta.affectedRows !==0){
              console.log("cambio efectuado ")
              // alert("Modificado Correctamente")
              this.toggle("mensaje")
              
            }
            else 
              alert("No Se Pudo Modificar")
            
          })
          .catch((err) => CodigoError(err))
        }
        submitModPrecio(state){
            var idProveedores = parseInt(state.idProveedores , 10)
            var idStkGrupo = parseInt(state.idStkGrupo , 10)
            
            var Importe = parseInt (state.Importe , 10)
            var Porcentage = parseInt (state.Porcentage , 10)
            
            if(( idProveedores && !idStkGrupo ) || ( !idProveedores && idStkGrupo )){
              if( ( Importe && !Porcentage ) || ( !Importe && Porcentage ) ) {
                // alert(`Correcto Importe = ${Importe} Porcentage = ${Porcentage}`)
                // this.toggle("modprecio")
                this.ModPrecio()
              }else 
                alert(`InCorrecto Importe = ${Importe} Porcentage = ${Porcentage}`)
            }else
                
              alert("Icorrecto Solo un valor puede ser 0 id grupo o id proveedor")
            }
            
  // updateField(field) {
  //   this.setState({
  //     [field.target.id]: field.target.value
  //   });
  //   console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  // }
  
  toggle = (arg) =>{            
    console.log("entro en toggle")
    this.setState(prevState => ({
        toggle:{[arg]: !prevState.toggle[arg]}
    })) // estado inicial "FALSE" muestra la tabla de "..." en "TRUE" llama al componente <ComponenteParticular>
  }
            
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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

  rubroleer = _ => {
    const url = IpServidor + '/stkrubroleer'

    request
        .get(url)
        .set('Content-Type', 'application/json')
        .then(res => {
            const rubro = JSON.parse(res.text)
            this.setState({ rubro: rubro }
                , () => {
                console.log(`Rubro :`)
                console.log(this.state.rubro)
            })
        })
}
  // submitGrupo= (e) => {
  //   e.preventDefault();
  //   this.modificaGrupo();
  //   this.props.read()
  //   this.props.toggleModificar();
  // }

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
      <button onClick={()=>this.toggle("mensaje")}>CLICK</button>
      {this.state.toggle.mensaje && <Mensajes props={"HOLA"}><h1>DIALOGO</h1></Mensajes>} 
        <Paper>
        <Grid container>
            <Grid item xs={4} sm={4} lg={4}></Grid>
              <DialogTitle id="form-dialog-title">Modificar Precio</DialogTitle>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
        
        {/* <h1>ModPrecio</h1>
        <br></br>
        <br></br>
        <h2>Estos son los datos que tienen que estar en este componente</h2>
        <br></br>
        <br></br> */}
        <Grid container   spacing={24}>
        {/* <p>[Codigo de Proveedores | 0 ]</p> */}
          
          {/* {this.state.proveedores.map(proveedor => {
           return(<p>{proveedor.ProveedoresDesc}</p>)
          })
          } */}
          <Grid item  xs={1} sm={1} lg={1}></Grid>
          <Grid item  xs={3} sm={3} lg={3}>
            <TextField
              id="idProveedores" 
              select={true}
              label= 'Proveedor'
              SelectProps={{native:true}}
              onChange = {this.handleChange('idProveedores')}
              >
                <option value="0"></option>
                {this.state.proveedores.map(proveedor => (
                    <option
                        key={proveedor.idProveedor}
                        value={proveedor.idProveedores}
                    >
                        {/* {proveedor.idProveedores}  */}
                        {proveedor.ProveedoresDesc}
                    </option>
                ))}
            </TextField>
          </Grid>
        {/* <p>[ Codigo de Grupo | 0 ]</p> */}
        <Grid item  xs={3} sm={3} lg={3}>
          <TextField
              id="idStkGrupo" 
              select
              label= 'Grupo'
              SelectProps={{native:true}}
              onChange = {this.handleChange('idStkGrupo')}
              >
                <option value="0"></option>
                {this.state.grupos.map(grupo => (
                    <option
                        // key={grupo.idStkGrupo}
                        value={grupo.idStkGrupo}
                    >
                        {/* {grupo.idStkGrupo}  */}
                        {grupo.StkGrupoDesc}
                    </option>
                ))}
          </TextField>
          </Grid>

        {/* <p>[ Importe = 0 || Importe != 0 ]</p> */}
        <Grid item  xs={2} sm={2} lg={2}>
          <TextField
                margin="dense"
                id="Importe"
                label="Importe"
                type="number"
                fullWidth
                placeholder="Importe"
                value={this.state.Importe} 
                onChange={this.handleChange('Importe')}
                // onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
        </Grid>
        {/* <p>[ % | 0 ]</p> */}

        <Grid item  xs={2} sm={2} lg={2}>
          <TextField
                margin="dense"
                id="Porcentage"
                label="Porcentage"
                type="number"
                fullWidth
                placeholder="Porcentage"
                value={this.state.Porcentage} 
                onChange={this.handleChange('Porcentage')}
                // onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
        </Grid>
        <Grid item  xs={1} sm={1} lg={1}></Grid>
            {/* Nota para Rogelio falta llamar al backend que hizo sandra y mandar los cuatro datos que recabo de aca.         */}

            <Button
              color="primary"
              onClick={()=>this.submitModPrecio(this.state)}
            >
              Enviar
            </Button>      
       
            {/* <DialogActions>
            <Button 
              id="button--submit" 
              onClick={this.submitMoneda} 
              color="primary"
            >
              Modificar
            </Button>
            <Button onClick={this.props.toggle} color="secondary">
              Cancelar
            </Button>

          </DialogActions> */}
            </Grid>

            </Paper>

            {/* <Dialog
              open={this.state.toggle.mensaje}
              // onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <Mensajes/>
            </Dialog> */}


      </div>
    );
  }
}

export default ModPrecios;
