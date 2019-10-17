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
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import CodigoError from '../../../lib/CodigoError'
// import DialogContentText from '@material-ui/core/DialogContentText';

class StkRubroModificar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: IpServidor + '/stkrubromodificar',
      idStkRubro: this.props.idStkRubro,
      StkRubroCodGrp: this.props.StkRubroCodGrp, //verificar si esta bien
      StkRubroDesc: this.props.StkRubroDesc,
      StkRubroAbr: this.props.StkRubroAbr,
      StkRubroProv: this.props.StkRubroProv,
      StkRubroAncho: this.props.StkRubroAncho,
      StkRubroPres: this.props.StkRubroPres,
      StkRubroPresDes: this.props.StkRubroPresDes,
      StkRubroUM: this.props.StkRubroUM,
      StkRubroCosto: this.props.StkRubroCosto,
      StkRubroTM: this.props.StkRubroTM,
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
      nuevocodigo:0,
      open: true,
      idStkGrupo:'',      // borrar 
      StkGrupoDesc:'',    // borrar
      StkGrupoAbr:'',     // borrar
      StkGrupoContRubro:0 // borrar
    };
    this.updateField = this.updateField.bind(this);
    this.submitProveedor = this.submitProveedor.bind(this);
    console.log('presdes en estado : ')
    console.log('presdes en estado : ',this.state.StkRubroPresDes)
    console.log('presdes en estado : ',this.state.StkRubroPres)
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
  };
  
  leeXcodgrupo = prop => event => {
    console.log("prop : " + prop)                                         //control se puede Borrar esta linea 
    this.setState({[prop]: event.target.value}, 
      //aca leo grupo X Código
      function () {
        const url = IpServidor +'/stkgrupoleercod/'+ this.state.StkRubroCodGrp
        // console.log("la url es : "+url)                                   //control se puede Borrar esta linea
        request
        .get(url)
        .set('Content-Type', 'application/json')
        .then(res=> {
          // const grupoitem = JSON.parse(res.text)
          // this.setState({grupoitem:grupoitem[0]}, // como esta en un arreglo lo paso a un solo objeto
          var grupoitem = JSON.parse(res.text)
          var {idStkGrupo,StkGrupoDesc,StkGrupoAbr,StkGrupoContRubro} = grupoitem[0]
          this.setState({idStkGrupo,StkGrupoDesc,StkGrupoAbr,StkGrupoContRubro:idStkGrupo,StkGrupoDesc,StkGrupoAbr,StkGrupoContRubro}, // como esta en un arreglo lo paso a un solo objeto  
            ()=>{
              
              console.log("contenodo de grupo por separado",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)
              // console.log("contenido de grupoitem ")
              // console.log(this.state.grupoitem)
              // console.log("Tipo de grupoitem ")
              // console.log(typeof(this.state.grupoitem))
              // console.log("contenido de StkGrupoContRubro ")
              // console.log(this.state.grupoitem.StkGrupoContRubro)
              // this.setState({grupoitem :state.grupoitem.StkGrupoContRubro+1,},()=>console.log("contenido de contrubro"+this.state.grupoitem.StkGrupoContRubro))
            // function() {
            //   this.setState(state =>{return{ grupoitem.StkGrupoContRubro : state.grupoitem.StkGrupoContRubro+1}},()=>{
            //     console.log("contenido de grupoitem : ")
            //     console.log(this.state.grupoitem)})

              // console.log("Contador : " + grupoitem[0].StkGrupoContRubro)
              // console.log("Contador : " + this.state.grupoitem[0].StkGrupoContRubro)
              // var nuevocodigo = this.state.grupoitem[0].StkGrupoContRubro + 1 // le sumo uno para formar el nuevo código
              
              // this.setState({nuevocodigo : this.state.grupoitem[0].StkGrupoContRubro + 1},()=>{console.log("nuevocodigo : " + this.state.nuevocodigo)
            // console.log("Grupo contrubro ")
            // console.log(this.state.grupoitem.StkGrupoContRubro)
            }
          )
          // console.log("contenodo de grupo por separado fuera del callback ",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)
          // this.setState((state) =>({StkGrupoContRubro:state.StkGrupoContRubro+1}))
          // this.setState({idStkRubro:this.state.StkGrupoContRubro},console.log("idStkRubro : ",this.state.idStkRubro))
          // console.log("contenodo de grupo por separado fpuera de set state ",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)

              // this.setState({state =>{ return {grupoitem[0].StkGrupoContRubro : state.grupoitem[0].StkGrupoContRubro + 1,}}},()=>{console.log("nuevocodigo : " + this.state.nuevocodigo)})
              
              // console.log("nuevocodigo : " + nuevocodigo)                 //control se puede Borrar esta linea
              console.log("fuera de setState nuevocodigo : " + this.state.nuevocodigo) //control se puede Borrar esta linea

            // })
          }
        )
      }
    )
  }
  
  
 //****************************/ 
 //Update
// ActualizaGrupo = () => {

//   request                  
//     .post(IpServidor + '/stkgrupomodificar/'+this.state.idStkGrupo) //pongo el idStkGrupo
//        .set('Content-Type', 'application/json')
//           // .send({ idStkGrupo: this.state.idStkGrupo})
//           .send({ StkGrupoDesc: this.state.StkGrupoDesc})
//           .send({ StkGrupoAbr: this.state.StkGrupoAbr})        
//           .send({ StkGrupoContRubro: this.state.StkGrupoContRubro})
          
//       //  .set('X-API-Key', 'foobar')
//        .then(function(res) { // res.body, res.headers, res.status
//         });
//       } 


// necesito 

// var idStkRubro = req.query.id;
// var StkRubroCodGrp = req.query.id2;

 //***************************/ 
  
  
  
  
  
  // Create

  ModificaRubro = _ => {
    // console.log("dentro de ModificaRubro valor de Proveedores "+ this.state.StkRubroProv)
    
    // **********************   aca llamo a la fucnion ActualizaGrupo *************************
    // this.ActualizaGrupo()
console.log("this.state.StkRubroCodGrp : ",this.state.StkRubroCodGrp)

    // const url = 'http://localhost:4000/stkrubromodificar/?id='+this.state.idStkRubro+'&id2='+this.state.StkRubroCodGrp ; //'http://localhost:3000/data'
    const url = IpServidor + '/stkrubromodificar/?id=' + this.state.idStkRubro + '&id2=' + this.state.StkRubroCodGrp
    request
      .post(url)
      .set("Content-Type", "application/json")
      // .send({ idStkRubro: this.state.idStkRubro })
      // .send({ StkRubroCodGrp: this.state.StkRubroCodGrp })
      .send({ StkRubroDesc: this.state.StkRubroDesc })
      .send({ StkRubroAbr: this.state.StkRubroAbr })
      .send({ StkRubroProv: this.state.StkRubroProv })
      .send({ StkRubroAncho: this.state.StkRubroAncho })
      .send({ StkRubroPres: this.state.StkRubroPres })
      .send({ StkRubroPresDes: this.state.StkRubroPresDes })
      .send({ StkRubroUM: this.state.StkRubroUM })
      .send({ StkRubroCosto: this.state.StkRubroCosto })
      .send({ StkRubroTM: this.state.StkRubroTM })
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
          // console.log(`stkgrupo :`) 
          // console.log(stkgrupo)
        this.setState(()=>{ return {stkgrupo: stkgrupo}});
        
        })
    console.log(`dentro de leestkgrupo `)
    console.log(`this.state.stkgrupo :`)
    console.log(this.state.stkgrupo)
    
    // this.marcagrupo()
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

  submitProveedor(e) {
    e.preventDefault();
    this.ModificaRubro();
    this.props.read()
    this.props.toggleModificar();
  }

  componentDidMount() {
    // this.proveedoresleer();
    // console.log('tipo proveedor dentro de DIDMOUNT ')
    // console.log(this.state.tipoprov)
    // this.leetmon();
    console.log("componentdidmount !!!!")
    console.log(this.state.StkRubroPresDes)
    // this.leestkgrupo()
  }

  componentWillMount(){
    this.proveedoresleer()
    this.leestkgrupo()
    this.unmedleer()
    this.leetmon()
    console.log("dentro de componentWillMount Valor de idStkRubro : ",this.state.idStkRubro)
    console.log(this.state.StkRubroPresDes)
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
          <DialogTitle id="form-dialog-title">Modificar Rubro</DialogTitle>
          <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <DialogContent>
           
          {/* GRUPO INICIO*/}
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8} lg={8}>
                <TextField
                  id="idStkGrupo"
                  // select={true}
                  select
                  label="Grupo"
                  SelectProps={{
                    native: true
                  }}
                  value={this.state.StkRubroCodGrp}
                  // onChange={this.handleChange("StkRubroCodGrp")}
                  // onChange={this.leeXcodgrupo("StkRubroCodGrp","OTRO VALOR AGREGADO POR MI")}
                >
                  {this.state.stkgrupo.map(option => (  
                      <option 
                      id="tipogrupo"
                      key={option.idStkGrupo}
                      value={option.idStkGrupo}
                      onClick={()=>console.log("Hizo Click")}
                      >
                          {option.StkGrupoDesc} 
                      </option>))} 
                                  
                  ))}
                </TextField>
              </Grid>
      
            {/* GRUPO FIN*/}
            
            {/* DESCRIPCION-Abrebiatura INICIO*/}          
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
                margin="dense"
                variant="standard"
                onKeyPress={event => {
                  if (event.key === "Enter")
                  document.getElementById("StkRubroProv").focus();
                }}
                />
                </Grid>
             {/* DESCRIPCION-Abrebiatura FIN*/}
             <Grid item xs={8} sm={8} lg={8}>
              <TextField
                id="StkRubroProv"
                select={true}
                label="Proveedor"
                SelectProps={{
                  native: true
                }}
                value={this.state.StkRubroProv}
                onChange={this.handleChange("StkRubroProv")}
              >
                 {this.state.proveedores.map(option => (  
                  <option 
                  id="proveedor"
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
                    document.getElementById("StkRubroPresDes").focus();
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
                variant="standard"
                InputLabelProps={{ shrink: true }}
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
                onKeyPress={event => {
                  if (event.key === "Enter")
                  document.getElementById("StkRubroUM").focus();
                }}
              />
               </Grid> 
            {/* <div> */}
              {/* <TextField
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
              /> */}
               <Grid item  xs={4} sm={4} lg={4}>
                <TextField
                id="StkRubroUM"
                select={true}
                label="Unidad de Medida"
                value={this.state.StkRubroUM}
                onChange={this.handleChange("StkRubroUM")}
              >
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
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkRubroTM").focus();
                }}
              />
              </Grid>
              {/* <TextField
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
              /> */}
               <Grid item  xs={4} sm={4} lg={4}>
                <TextField
                id="StkRubroTM"
                select={true}
                label="Moneda"
                value={this.state.StkRubroTM}
                onChange={this.handleChange("StkRubroTM")}
              >
                 {this.state.stkmonedas.map(option => (  
                  <option 
                  id="tipomoneda"
                  key={option.idStkMonedas}
                  value={option.idStkMonedas}
                  >
                      {option.StkMonedasDescripcion} 
                   </option>))} 
                                
                ))}
              </TextField>
              </Grid>

            {/* </div> */}
            {/* <div>
              
            </div> */}
            {/* <div>
              
            </div> */}
            {/* <div>
              
            </div> */}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              id="ModificaRubro"
              variant="contained"
              color="primary"
              onClick={this.submitProveedor}
            >
              Modifica Rubro
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.toggleModificar}
              // onClick={()=>{return alert("GRABO RUBRO")}}
            >
              Cancelar
            </Button>
          </DialogActions>
          {/* </Grid> */}
        </Dialog>
      </div>
    );
  }
}

export default StkRubroModificar;
