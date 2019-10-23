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
// import Select from '@material-ui/core/Select';

// import AgregarMonedas from './StkMonedasAgregar'
import CodigoError from '../../../lib/CodigoError'
import Grid from '@material-ui/core/Grid';

class StkRubroAgregar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // url: IpServidor + '/stkrubroagregar/',
      // idStkRubro: 0,
      StkRubroCodGrp: "",
      StkRubroDesc: "",
      StkRubroAbr: "",
      StkRubroProv: "",
      StkRubroAncho: 0.0,
      StkRubroPres: 0.0,
      StkRubroPresDes: "",
      StkRubroUM:"",
      StkRubroCosto:0.00,
      StkRubroTM:"",
      // stkgrupo:{},
      stkgrupo:[],
      idStkTipoProveed: 0,
      StkTipoProveedDesc: "",
      proveedores: [],
      idStkMonedas: "",
      StkMonedasDescripcion: "",
      StkMonedasCotizacion: 0,
      stkmonedas: [],
      unmed:[],
      open: true,
      NuevoCodRubro : 0,
      StkGrupoContRubro: [],
      // idStkGrupo:'',      // borrar 
      // StkGrupoDesc:'',    // borrar
      // StkGrupoAbr:'',     // borrar
      // StkGrupoContRubro:0 // borrar
    };
    this.updateField = this.updateField.bind(this);
    this.submitRubro = this.submitRubro.bind(this);
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
    this.setState({[prop]: event.target.value})
    // this.setState({[prop]: event.target.value}, function () {
      // console.log('contenido de ' +[prop] +" "+ this.state.StkRubroCodGrp) })
  }


 //***************************/ 
  
  
  
  
  
  // Create
  buscacodigo = _ => {
    var url=  IpServidor + '/stkrubroleeultnro/?id='+ this.state.StkRubroCodGrp
    request
        .get(url)
        .set('Content-Type', 'application/json')
        .then(res=> {
          const codigorubro = JSON.parse(res.text);
          this.setState({ codigorubro: codigorubro })
          this.add(codigorubro[0].CodRubroNuevo);
        })
     
        }
      

  add(nuevorubro)  {
    
    // **********************   aca llamo a la fucnion ActualizaGrupo *************************
    // this.ActualizaGrupo()
    
    var url=  IpServidor + '/stkrubroagregar/'
    request
      .post(url)
      .set("Content-Type", "application/json") // .send({ idStkRubro: this.state.idStkRubro }) este lo genero en el back-end
      .send({ idStkRubro: nuevorubro })
      .send({ StkRubroCodGrp: this.state.StkRubroCodGrp })
      .send({ StkRubroDesc: this.state.StkRubroDesc })
      .send({ StkRubroAbr: this.state.StkRubroAbr })
      .send({ StkRubroProv: this.state.StkRubroProv })
      .send({ StkRubroAncho: this.state.StkRubroAncho })
      .send({ StkRubroPresDes: this.state.StkRubroPresDes })
      .send({ StkRubroPres: this.state.StkRubroPres })
      .send({ StkRubroUM: this.state.StkRubroUM })
      .send({ StkRubroCosto: this.state.StkRubroCosto })
      .send({ StkRubroTM: this.state.StkRubroTM })
      // .set("X-API-Key", "foobar")
      .then(function(res) {})
      .catch((err) => CodigoError(err))
      console.log('err.status')
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
  const url = IpServidor +'/stkunmedleer'
  request
  .get(url)
  .set('Content-Type', 'application/json')
      .then(res=> {
      const unmed = JSON.parse(res.text)
      this.setState({unmed: unmed})
      })
}
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

  updateField(field) {
    this.setState({
      [field.target.id]: field.target.value
    });
    console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  }

  toggleList = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  submitRubro(e) {
    console.log('estoy en submit')
    e.preventDefault();
    this.buscacodigo();
    
    // this.add();
    this.props.read()
    this.props.toggleAgregar();
  }

  componentDidMount() {
    // this.proveedoresleer();
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
    // this.leetmon();
    // console.log("componentdidmount !!!!")
    // console.log(this.state.stkgrupo)
    // this.leestkgrupo()
  }

  componentWillMount(){
    this.proveedoresleer()
    this.leestkgrupo()
    this.unmedleer()
    this.leetmon()
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
    
    
    
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
              <DialogTitle id="form-dialog-title">Agregar Rubro</DialogTitle>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <DialogContent>
           
          {/* GRUPO INICIO*/}
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8} lg={8}>
                <TextField
                  id="idStkGrupo"
                  select
                  // fullWidth={true}
                  fullWidth
                  label="Grupo"
                  SelectProps={{
                    native: true
                  }}
                  value={this.state.StkRubroCodGrp}
                  onChange={this.handleChange("StkRubroCodGrp")}
                >
                  <option></option>
                  {this.state.stkgrupo.map(option => (  
                    <option 
                    id="tipogrupo"
                    key={option.idStkGrupo}
                    value={option.idStkGrupo}
                    >
                        {option.StkGrupoDesc} 
                    </option>
                    ))} 
                </TextField>
              </Grid>
      
          {/* GRUPO FIN*/}
          {/* DESCRIPCION INICIO*/}
        
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
                  margin="normal"
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroProv").focus();
                  }}
                />
              </Grid>

          {/* DESCRIPCION  FIN */}  
         
             <Grid item xs={8} sm={8} lg={8}>
              <TextField
                id="StkRubroProv"
                fullWidth={true}
                select={true}
                label="Proveedor"
                SelectProps={{
                  native: true
                }}
                value={this.state.StkRubroProv}
                onChange={this.handleChange("StkRubroProv")}
              >
                <option></option>
                 {this.state.proveedores.map(option => (  
                  <option  
                  id="tipoproveedor"
                  key={option.idProveedores}
                  value={option.idProveedores}
                  >
                      {option.ProveedoresDesc} 
                   </option>))} 
                                
                ))}
              </TextField>
              </Grid>
              <Grid item  xs={4} sm={4} lg={4}></Grid>

           <Grid item  xs={4} sm={4} lg={4}> 
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
            </Grid>
              <Grid item  xs={4} sm={4} lg={4}> 
              <TextField
                  id="StkRubroPresDes"
                  label="Presentacion Descripcion"
                  value={this.state.StkRubroPresDes}
                  onChange={this.handleChange("StkRubroPresDes")}
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroPres").focus();
                  }}
                /> 
                </Grid> 
                <Grid item  xs={4} sm={4} lg={4}> 
                <TextField
                  id="StkRubroPres"
                  label="Presentacion"
                  value={this.state.StkRubroPres}
                  onChange={this.handleChange("StkRubroPres")}
                  margin="dense"
                  variant="standard"
                  type = "number"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroUM").focus();
                  }}
                />
              </Grid> 
            
            
            
            {/* </div> */}
            
            {/* <div> */}
            <Grid item  xs={4} sm={4} lg={4}>
              <TextField
                id="StkRubroUM"
                select={true}
                fullWidth={true}
                margin="dense"
                SelectProps={{
                  native: true
                }}
                label="Unidad de Medida"
                value={this.state.StkRubroUM}
                onChange={this.handleChange("StkRubroUM")}
              >
                 <option></option>
                 {this.state.unmed.map(option => (  
                  <option 
                  id="unidaddemedida"
                  key={option.idStkUnMed}
                  value={option.idStkUnMed}
                  >
                      {option.StkUnMedDesc} 
                   </option>))} 
                                
                ))}
              </TextField>
            </Grid>
            
              <Grid item  xs={4} sm={4} lg={4}>
                <TextField
                  id="StkRubroCosto"
                  label="Costo"
                  value={this.state.StkRubroCosto}
                  onChange={this.handleChange("StkRubroCosto")}
                  margin="dense"
                  variant="standard"
                  type = "number"
                  onKeyPress={event => {
                    if (event.key === "Enter")
                      document.getElementById("StkRubroTM").focus();
                  }}
                />
              </Grid>
         
            <Grid item  xs={4} sm={4} lg={4}>
                <TextField
                id="StkRubroTM"
                select={true}
                label="Moneda"
                fullWidth={true}
                margin="dense"
                SelectProps={{
                  native: true
                }}
                value={this.state.StkRubroTM}
                onChange={this.handleChange("StkRubroTM")}
              >
                 <option></option>
                 {this.state.stkmonedas.map(option => (  
                  <option 
                  id="unidaddemedida"
                  key={option.idStkMonedas}
                  value={option.idStkMonedas}
                  >
                      {option.StkMonedasDescripcion} 
                   </option>))} 
                                
                ))}
              </TextField>
            </Grid>
            </Grid>
          </DialogContent>
            <Grid container>
            {/* <Grid item xs={6} sm={6}></Grid> */}
            {/* <Grid item xs={6} sm={6}> */}
            <Grid item xs={12} sm={12}>
                <DialogActions>
                  <Button
                    id="Grabar"
                    variant="contained"
                    color="primary"
                    onClick={this.submitRubro}
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
            </Grid>
          </Grid>
        </Dialog>
        
      </div>
    );
  }
}

export default StkRubroAgregar;
