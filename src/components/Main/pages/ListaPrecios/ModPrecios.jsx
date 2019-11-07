import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import Grid from '@material-ui/core/Grid';




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
      
      idProveedores: 0,
      idStkGrupo: 0,
      importemod: 0,        
      porcentmod: 0,
      
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



  ModPrecio = () => {
    console.log("contenido a enviar :")
    console.log(this.state.idProveedores,this.state.idStkGrupo,this.state.Importe,this.state.Porcentage)
    const url = IpServidor + '/modprecios/'
    request                  
      .post(url)
         .set('Content-Type', 'application/json')
            .send({ 
              idProveedores: this.state.idProveedores,
              idStkGrupo: this.state.idStkGrupo,
              importemod: this.state.Importe,
              porcentmod: this.state.Porcentage
            })
            // .send({ idStkGrupo: this.state.idStkGrupo})
            // .send({ importemod: this.state.Importe})        
            // .send({ porcentmod: this.state.Porcentage})
         .then(function(res) { 
          const respuesta = JSON.parse(res.text)
          if (respuesta.affectedRows !=0)
             alert("EXITO")
          else 
            alert("No modifico")
          // console.log(respuesta.affectedRows) 
          // text: "{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}"
          
          // res.body, res.headers, res.status
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
                this.ModPrecio()
              }else 
                alert(`InCorrecto Importe = ${Importe} Porcentage = ${Porcentage}`)
            }else
              alert("Icorrecto Solo un valor puede ser 0 id grupo o id proveedor")
      }


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






      </div>
    );
  }
}

export default ModPrecios;
