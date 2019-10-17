import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
// import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from '@material-ui/core/Grid';
// import NativeSelect from '@material-ui/core/NativeSelect';
import CodigoError from '../../../lib/CodigoError'
// import Select from '@material-ui/core/Select';

// import AgregarMonedas from './StkMonedasAgregar'

class StkItemsModificar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idStkItems: this.props.idStkItems ,
      StkItemsGrupo: this.props.StkItemsGrupo ,
      StkItemsRubro: this.props.StkItemsRubro,
      StkGrupoDesc: this.props.StkGrupoDesc ,
      StkRubroDesc: this.props.StkRubroDesc,
      StkItemsDesc: this.props.StkItemsDesc,
      StkItemsCantidad: this.props.StkItemsCantidad ,
      StkItemsCantDisp: this.props.StkItemsCantDisp ,
      // StkItemsCantDisp: 0,
      StkItemsFAct: "",
      StkItemsMin: this.props.StkItemsMin,
      StkItemsMax:this.props.StkItemsMax,
      // StkItemsObserv:this.props.StkItemsObserv,
      stkrubro:[],
      stkgrupo:[],
      // idStkTipoProveed: StkItemsMin
      // StkTipoProveedDescStkItemsMin
      // proveedores: [],
      // idStkMonedas: "",
      open: true,
    };
    // this.updateField = thisStkItemsMin
    // this.submitItem = thStkItemsMin
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
 
  handleChange = prop => event => {
  
    this.setState({[prop]: event.target.value})
   
  };

  handleChangeGrupo = prop => event => {
   
    this.setState({[prop]: event.target.value},()=> this.stkrubroleecodgrupo(this.state.StkItemsGrupo))
 
  };
  
  // Create

  add = _ => {
    const url = IpServidor + '/stkitemsmodificar/?id1='+this.state.idStkItems+'&id2=' + this.state.StkItemsGrupo + '&id3=' + this.state.StkItemsRubro
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ StkItemsDesc: this.state.StkItemsDesc})
      .send({ StkItemsCantidad: this.state.StkItemsCantidad})
      .send({ StkItemsCantDisp: this.state.StkItemsCantDisp})
      .send({ StkItemsMin: this.state.StkItemsMin})
      .send({ StkItemsMax: this.state.StkItemsMax})
      .set("X-API-Key", "foobar")
      .then(function(res) {})
      .catch((err) => CodigoError(err))
  };

// Lee tipo Grupo inicio 
  leestkgrupo = _ => {
    const url = IpServidor + "/stkgrupoleer";
    request
    .get(url)
    .set('Content-Type', 'application/json')
    .then(res=> {
      const stkgrupo = JSON.parse(res.text);
      this.setState(()=>{ return {stkgrupo: stkgrupo}});
      })
    }




stkrubroleecodgrupo = (id) => {
  // const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
  const url = IpServidor + "/stkrubroleecodgrupo/"+id;
  request
  .get(url)
  .set('Content-Type', 'application/json')
      .then(res=> {
        const stkrubro = JSON.parse(res.text);
        this.setState(()=>{ return {stkrubro: stkrubro}});

        console.log('dentro de leestkrubro')
        console.log(this.state.stkrubro)
      })
  
  // this.marcagrupo()
  }



// Lee tipo Rubro Fin


  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  }

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // submitItem(e) {
  //   e.preventDefault();
  //   this.add();
  //   // aca pongo mensaje de error
  //   this.props.read()
  //   // alert("ERROR")
  //   this.props.click();
  // }

  submitItem = (e) => {
    e.preventDefault();
    this.add();
    // aca pongo mensaje de error
    // this.props.read()
    this.props.leeStkItemsDetalles()
    // alert("ERROR")
    this.props.clickmodificar();
  }

  componentWillMount(){
    // this.proveedoresleer()
    this.leestkgrupo()
    // this.leestkrubro()
    // this.unmedleer()
    // this.leetmon()
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
  }
  
  componentDidMount() {
    // this.stkrubroleecodgrupo(this.state.StkItemsGrupo)
  }

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
            <DialogTitle id="form-dialog-title">MODIFICAR ITEM</DialogTitle>
          <Grid item xs={4} sm={4} lg={4}></Grid>
        </Grid>
          <DialogContent>
        
        <Grid container  spacing={24}>

{/* Grupo INICIO*/}
              <Grid item  xs={6} sm={6} lg={6}>
              <p>{this.state.StkGrupoDesc}</p>
              {/* <TextField
                id="StkItemsGrupo"
                select={true}
                fullWidth={true}
                label="Grupo"
                autoFocus={true}
                InputLabelProps={{ shrink: true }}
                value={this.state.StkGrupoDesc}
                onChange={this.handleChange("StkItemsGrupo")}
                onChange={this.handleChangeGrupo("StkItemsGrupo")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsRubro").focus();
                }}
              > */}
                 
                 {/* {this.state.stkgrupo.map(option => (  
                  <MenuItem
                  id="tipogrupo"
                  key={option.idStkGrupo}
                  value={option.idStkGrupo}
                  >
                      {option.StkGrupoDesc} 
                  </MenuItem>))} 
              </TextField> */}
              </Grid>
{/* Grupo FIN */}


{/* Rubro INICIO */}
            
<Grid item  xs={6} sm={6} lg={6}>
              <p>{this.state.StkRubroDesc}</p>
              {/* <TextField
                disabled
                id="StkItemsRubro"
                // select={true}
                label="Rubro"
                fullWidth={true}
                InputLabelProps={{ shrink: true }} 
                value={this.state.StkRubroDesc}
                // onChange={this.handleChange("StkItemsRubro")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsDesc").focus();
                }}
              > */}
{/*                  
                 {this.state.stkrubro.map(option => (  
                  <MenuItem
                  id="tiporubro"
                  key={option.idStkRubro}
                  value={option.idStkRubro}
                  onClick={()=>console.log("Hizo Click")}
                  >
                      {option.StkRubroDesc} 
                  </MenuItem>))}  */}
              {/* </TextField> */}
              </Grid>
{/* Rubro FIN */}
    
{/* Descripción INICIO */}
  <Grid item  xs={12} sm={12} lg={12}>
  <TextField
              id="StkItemsDesc"
              label="descripcion"
              autoFocus={true}
              value={this.state.StkItemsDesc}
              onChange={this.handleChange("StkItemsDesc")}
              margin="dense"
              fullWidth
              variant="standard"
              // autoFocus={true}
              onKeyPress={event => {
                if (event.key === "Enter")
                  document.getElementById("StkItemsCantidad").focus();
              }}
            />
            </Grid>
{/* Descripción Fin */}
            <Grid item  xs={3} sm={3} lg={3}>
              <TextField
                id="StkItemsCantidad"
                label="Cantidad"
                type="number"
                value={this.state.StkItemsCantidad}
                onChange={this.handleChange("StkItemsCantidad")}
                margin="dense"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsCantDisp").focus();
                }}
              />
              </Grid>
              <Grid item  xs={3} sm={3} lg={3}>
              <TextField
                id="StkItemsCantDisp"
                label="Cantidad Disponible"
                type="number"
                value={this.state.StkItemsCantDisp}
                onChange={this.handleChange("StkItemsCantDisp")}
                margin="dense"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsMin").focus();
                }}
              />
              </Grid>

              <Grid item  xs={3} sm={3} lg={3}>
<TextField
                id="StkItemsMin"
                label="Stock Minimo"
                type="number"
                value={this.state.StkItemsMin}
                onChange={this.handleChange("StkItemsMin")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsMax").focus();
                }}
              />
              </Grid>
              <Grid item  xs={3} sm={3} lg={3}>
              <TextField
                id="StkItemsMax"
                label="Stock Maximo"
                type="number"
                value={this.state.StkItemsMax}
                onChange={this.handleChange("StkItemsMax")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("Grabar").focus();
                }}
              />
              </Grid>
              {/* <Grid item  xs={12} sm={12} lg={12}>
              <TextField
                id="StkItemsObserv"
                label="Observaciones"
                value={this.state.StkItemsObserv}
                fullWidth={true}
                onChange={this.handleChange("StkItemsObserv")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("Grabar").focus();
                }}
              />
              </Grid> */}
         
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              id="Grabar"
              variant="contained"
              color="primary"
              onClick={this.submitItem}
            >
              MODIFICAR
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.clickmodificar}
              // onClick={()=>{return alert("cancelo modificar")}}
            >
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StkItemsModificar;
