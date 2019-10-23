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
      // idStkGrupo:'',      // borrar 
      // StkGrupoDesc:'',    // borrar
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

  //esto es para que en el select me muestre el item elegido
  handleChange = prop => event => {
    // this.setState(()=>{return{ [prop]: event.target.value }});
    // this.setState({value: event.target.value}, function () {
    //   console.log(this.state.value) })
    this.llama()
    
    this.setState({[prop]: event.target.value}, function () {
      console.log('contenido de ' +[prop] +" "+ this.state.StkRubroCodGrp) })
  };

  llama = _ => console.log('Codigo de grupo dentro de handleChange : '+this.state.StkRubroCodGrp)
  
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
              
              // console.log("contenodo de grupo por separado",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)
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
          console.log("contenodo de grupo por separado fuera del callback ",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)
          this.setState((state) =>({StkGrupoContRubro:state.StkGrupoContRubro+1}))
          this.setState({idStkRubro:this.state.StkGrupoContRubro},console.log("idStkRubro : ",this.state.idStkRubro))
          console.log("contenodo de grupo por separado fpuera de set state ",this.state.idStkGrupo,this.state.StkGrupoDesc,this.state.StkGrupoAbr,this.state.StkGrupoContRubro)

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
ActualizaGrupo = () => {

  request                  
    .post(IpServidor + '/stkgrupomodificar/'+this.state.idStkGrupo) //pongo el idStkGrupo
       .set('Content-Type', 'application/json')
          .send({ StkGrupoDesc: this.state.StkGrupoDesc})
          .send({ StkGrupoAbr: this.state.StkGrupoAbr})        
          .send({ StkGrupoContRubro: this.state.StkGrupoContRubro}) // Esto va a ser Cero inicialmente.
       .then(function(res) { // res.body, res.headers, res.status
        })
        .catch((err) => CodigoError(err))
      } 

 //***************************/ 
  
  
  // Create

  modificaGrupo = ()  => {
    const url= IpServidor + '/stkgrupomodificar/?id='+ this.state.idStkGrupo
    console.log('url ' ,url)
    console.log('this.state.StkGrupoDesc ',this.state.StkGrupoDesc)
    console.log('this.state.StkGrupoAbr ',this.state.StkGrupoAbr)
    console.log('this.state.StkGrupoContRubro ',this.state.StkGrupoContRubro)
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ StkGrupoDesc: this.state.StkGrupoDesc})
      .send({ StkGrupoAbr: this.state.StkGrupoAbr})        
      .send({ StkGrupoContRubro: this.state.StkGrupoContRubro }) // Esto va a ser Cero inicialmente.
      .set("X-API-Key", "foobar")
      .then(function(res) {});
      
    };

// // Lee tipo Grupo inicio 
//   leestkgrupo = _ => {
//     // const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
//     const url = IpServidor + "/stkgrupoleer";
//     request
//     .get(url)
//     .set('Content-Type', 'application/json')
//         .then(res=> {
        
//           const stkgrupo = JSON.parse(res.text);
//           console.log(`stkgrupo :`)
//     console.log(stkgrupo)
//         this.setState(()=>{ return {stkgrupo: stkgrupo}});
        
//         })
//     console.log(`dentro de leestkgrupo `)
//     console.log(`this.state.stkgrupo :`)
//     console.log(this.state.stkgrupo)
    
    // this.marcagrupo()
    // }
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

// // Leo tipo Unidad de medidas Inicio
// unmedleer = _ => {
//   const url = IpServidor +'/stkunmedleer'
//   request
//   .get(url)
//   .set('Content-Type', 'application/json')
//       .then(res=> {
//       const unmed = JSON.parse(res.text)
//       this.setState({unmed: unmed})
//       })
// }
// Leo tipo Unidad de medidas Fin

// leetmon = _ => {
//     const url = IpServidor + "/stkmonedasleer";
//     request
//       .get(url)
//       .set("Content-Type", "application/json")
//       .then(res => {
//         const stkmonedas = JSON.parse(res.text);
//         this.setState({ stkmonedas: stkmonedas });
//       });
//   };

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
  }

  render() {
    
    return (
      <div>
        {/* <h1>ModPrecio</h1> */}
        <IconButton 
                    // className=" red accent-4" 
                    // onClick={()=>this.toggle()}
                    >
                    <CreateIcon />
                </IconButton>
        {/* <Dialog
          open={true}
          // open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modificar Grupo</DialogTitle>
          <DialogContent>
           
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
              onClick={this.submitGrupo}
            >
              Grabar
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
        </Dialog> */}
      </div>
    );
  }
}

export default ModPrecios;
