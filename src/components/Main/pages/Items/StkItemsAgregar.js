import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../VariablesDeEntorno";
import "react-table/react-table.css";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import CodigoError from '../../../lib/CodigoError'

class StkItemsAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StkItemsGrupo:0 ,
      StkItemsRubro: 0,
      StkItemsDesc: "",
      StkItemsCantidad: 0,
      StkItemsFAct: "",
      StkItemsMin: 0,
      StkItemsMax:0,
      stkrubro:[],
      stkgrupo:[],
      open: true,
      // leeStkItemsDetalles: this.props.leeStkItemsDetalles,
    };
    this.updateField = this.updateField.bind(this);
    // this.submitItem = this.submitItem.bind(this);
    
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
    const url = IpServidor + '/stkitemsagregar/?id2=' + this.state.StkItemsGrupo + '&id3=' + this.state.StkItemsRubro

    request
      .post(url)
      // .put(url)
      .set("Content-Type", "application/json")
      .send({ StkItemsDesc: this.state.StkItemsDesc})
      .send({ StkItemsCantidad: this.state.StkItemsCantidad})
      .send({ StkItemsMin: this.state.StkItemsMin})
      .send({ StkItemsMax: this.state.StkItemsMax})
      // .send({ StkItemsObserv: this.state.StkItemsObserv})            
      // .set("X-API-Key", "foobar")
      .then(function(res) {})
      .catch((err) => CodigoError(err))
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
        this.setState(()=>{ return {stkgrupo: stkgrupo}});
        
        })
   
    }
// Lee tipo Grupo Fin

// Lee tipo Rubro inicio 

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

  submitItem = (e) => {
    e.preventDefault();
    this.add(); 
    // aca pongo mensaje de error
    // alert("aca grabo!!!")
    this.props.leeStkItemsDetalles()
    // this.leeStkItemsDetalles()
    // window.location.reload() //esto hace que rrecargue la pagina no se por que no anda con la funcion que le estoy pasando ( this.props.leeStkItemsDetalles())
    this.props.toggleAgregar();
  }
 
  componentWillMount(){
    this.leestkgrupo()
  }

  componentDidMount() {
   
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
            <DialogTitle id="form-dialog-title">Aregar Item</DialogTitle>
          <Grid item xs={4} sm={4} lg={4}></Grid>
        </Grid>
          <DialogContent>
        
        <Grid container  spacing={24}>

{/* Grupo INICIO*/}
              <Grid item  xs={6} sm={6} lg={6}>
              <TextField
                SelectProps={{
                  native: true,
                }}
                id="StkItemsGrupo"
                select={true}
                fullWidth={true}
                label="Grupo"
                autoFocus={true}
                InputLabelProps={{ shrink: true }}
                value={this.state.StkItemsGrupo}
                // onChange={this.handleChange("StkItemsGrupo")}
                onChange={this.handleChangeGrupo("StkItemsGrupo")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsRubro").focus();
                }}
              >
                 <option></option>
                 {this.state.stkgrupo.map(option => (  
                  
                  <option
                  id="tipogrupo"
                  key={option.idStkGrupo}
                  value={option.idStkGrupo}
                  >
                      {option.StkGrupoDesc} 
                  </option>))} 
              </TextField>
              </Grid>
{/* Grupo FIN */}


{/* Rubro INICIO */}
            
<Grid item  xs={6} sm={6} lg={6}>
              <TextField
                SelectProps={{
                  native: true,
                }}
                id="StkItemsRubro"
                select={true}
                label="Rubro"
                fullWidth={true}
                InputLabelProps={{ shrink: true }} 
                value={this.state.StkItemsRubro}
                onChange={this.handleChange("StkItemsRubro")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsDesc").focus();
                }}
              >
                 <option></option>
                 {this.state.stkrubro.map(option => (  
                  // <MenuItem
                  <option
                  id="tiporubro"
                  key={option.idStkRubro}
                  value={option.idStkRubro}
                  onClick={()=>console.log("Hizo Click")}
                  >
                      {option.StkRubroDesc} 
                  {/* </MenuItem>))}  */}
                  </option>))} 
              </TextField>
              </Grid>
{/* Rubro FIN */}

{/* Descripción INICIO */}
  <Grid item  xs={12} sm={12} lg={12}>
  <TextField
              id="StkItemsDesc"
              label="descripcion"
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
            <Grid item  xs={4} sm={4} lg={4}>
              <TextField
                id="StkItemsCantidad"
                label="Cantidad"
                type="number"
                value={this.state.StkItemsCantidad}
                onChange={this.handleChange("StkItemsCantidad")}
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsMin").focus();
                }}
              />
              </Grid>
              <Grid item  xs={4} sm={4} lg={4}>
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
              <Grid item  xs={4} sm={4} lg={4}>
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
              </Grid>
          */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              id="Grabar"
              variant="contained"
              color="primary"
              onClick={this.submitItem}
            >
              Grabar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.toggleAgregar}
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

export default StkItemsAgregar;
