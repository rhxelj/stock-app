import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from './VariablesDeEntorno'
import 'react-table/react-table.css'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

  
class StkRubroModificar extends Component {
    constructor(props){
        super(props)
        this.state = {
            estado:true,
            idProveedores: this.props.idProveedores,
            ProveedoresDesc : this.props.ProveedoresDesc,
            ProveedoresCUIT : this.props.ProveedoresCUIT,
            ProveedoresCalle : this.props.ProveedoresCalle,
            ProveedoresNroCalle : this.props.ProveedoresNroCalle,
            ProveedoresPiso : this.props.ProveedoresPiso,
            ProveedoresDto : this.props.ProveedoresDto,
            ProveedoresCodPos : this.props.ProveedoresCodPos,
            ProveedoresLoc : this.props.ProveedoresLoc,
            ProveedoresPcia : this.props.ProveedoresPcia,
            ProveedoresTel : this.props.ProveedoresTel,
            ProveedoresContacto : this.props.ProveedoresContacto,
            ProveedoresMail : this.props.ProveedoresMail,
            ProveedoresWeb : this.props.ProveedoresWeb,
            ProveedoresCodMon : this.props.ProveedoresCodMon,
            ProveedoresTipo : this.props.ProveedoresTipo,
            tipoprov:[],
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion: 0,
            stkmonedas:[],
            open: true,

        }
        this.updateField = this.updateField.bind(this)
        this.submitProveedor = this.submitProveedor.bind(this)
        this.handleChange = this.handleChange.bind(this)


        console.log("this.props.provdesc ",this.props.ProveedoresDesc)
        console.log("this.props.provcontacto ",this.props.ProveedoresContacto)
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



//         handleChange = field => {
//             this.setState({[field.target.id]: field.target.value, })
//         // console.log("contenido de PROP : "+ prop +" valor "+event.target.value)
//         // console.log("contenido de state "+JSON.stringify(this.state.proveedores))
// };


// handleChange(event){
//     console.log('valor de event id  '+event.target.id)
//     this.setState({[event.target.id]: event.target.value, })
//     // console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
// }

handleChange = prop => event => {
    console.log("dentro de handlechange, Valors de event.target.value : "+event.target.value)
    this.setState({ [prop]: event.target.value });
  };


//Read
read = _ => {
    // const url = IpServidor + '/proveedoresleercod/'; //'http://192.168.2.102:4000/indexprov'
    const id = this.state.idProveedores
    const url = IpServidor + '/proveedoresleercod/'+id
    console.log('en read : '+id)
    request
    .get(url)
    .set('Content-Type', 'application/json')
        .then(res=> {
            const proveedores = JSON.parse(res.text)
            this.setState({proveedores: proveedores[0]})
            console.log(" estoy en read contenido de state.proveedores : "+JSON.stringify(this.state.proveedores))
            console.log(" estoy en read contenido de state.proveedores : "+this.state.proveedores.ProveedoresCodPos)
            this.setState(prevState => ({estado: !prevState.estado}))      
        })
}




//Update
ActualizaRubro = () => {

request                  
  .post(IpServidor + '/proveedoresmodificar/'+this.state.idProveedores)
     .set('Content-Type', 'application/json')
        .send({ idStkRubro: this.state.idStkRubro})
        .send({ StkGrupoDesc: this.state.StkGrupoDesc})
        .send({ StkRubroDesc: this.state.StkRubroDesc})        
        .send({ StkRubroAbr: this.state.StkRubroAbr})
        .send({ ProveedoresDesc: this.state.ProveedoresDesc})
        .send({ StkRubroPres: this.state.StkRubroPres})
        .send({ StkRubroUM: this.state.StkRubroUM})
        .send({ StkRubroCosto: this.state.StkRubroCosto})
        .send({ StkRubroTM: this.state.StkRubroTM})
    
     .set('X-API-Key', 'foobar')
     .then(function(res) { // res.body, res.headers, res.status
      });
    }
    leetprov = _ => {
        const url = IpServidor + '/stktipoproveedleer'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const tipoprov = JSON.parse(res.text)
            this.setState({tipoprov: tipoprov})
            })
            
    } 

    leetmon = _ => {
        const url = IpServidor + '/stkmonedasleer'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
                const stkmonedas = JSON.parse(res.text)
                this.setState({stkmonedas: stkmonedas})
            })
            
    } 

   
    updateField(field){
        this.setState({[field.target.id]: field.target.value, })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

	toggleList = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

    submitProveedor(e){
        e.preventDefault()
        this.ActualizaRubro()
        
        this.props.clickmodificar()
        this.props.read()

    }


    componentDidMount(){
        // this.read()
        this.leetprov()
        this.leetmon()
    
    }
   

    render(){

        return( 
            <div>
                {this.state.estado
                ?
                <Dialog
          open={true}
          // open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Aregar Rubro</DialogTitle>
          <DialogContent>
            {/* <TextField
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
            /> */}
            <div>

              <TextField
                id="idStkGrupo"
                select={true}
                label="Grupo"
                value={this.state.StkRubroCodGrp}
                // onChange={this.handleChange("StkRubroCodGrp")}
                onChange={this.leeXcodgrupo("StkRubroCodGrp","OTRO VALOR AGREGADO POR MI")}
              >
                 {this.state.stkgrupo.map(option => (  
                  <MenuItem 
                  id="tipogrupo"
                  key={option.idStkGrupo}
                  value={option.idStkGrupo}
                  onClick={()=>console.log("Hizo Click")}
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
                select={true}
                label="Proveedor"
                value={this.state.StkRubroProv}
                onChange={this.handleChange("StkRubroProv")}
              >
                 {this.state.proveedores.map(option => (  
                  <MenuItem 
                  id="tipoproveedor"
                  key={option.idProveedores}
                  value={option.idProveedores}
                  >
                      {option.ProveedoresDesc} 
                   </MenuItem>))} 
                                
                ))}
              </TextField>


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
                <TextField
                id="StkRubroUM"
                select={true}
                label="Unidad de Medida"
                value={this.state.StkRubroUM}
                onChange={this.handleChange("StkRubroUM")}
              >
                 {this.state.unmed.map(option => (  
                  <MenuItem 
                  id="unidaddemedida"
                  key={option.idStkUnMed}
                  value={option.idStkUnMed}
                  >
                      {option.StkUnMedDesc} 
                   </MenuItem>))} 
                                
                ))}
              </TextField>

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
                <TextField
                id="StkRubroTM"
                select={true}
                label="Moneda"
                value={this.state.StkRubroTM}
                onChange={this.handleChange("StkRubroTM")}
              >
                 {this.state.stkmonedas.map(option => (  
                  <MenuItem 
                  id="unidaddemedida"
                  key={option.idStkMonedas}
                  value={option.idStkMonedas}
                  >
                      {option.StkMonedasDescripcion} 
                   </MenuItem>))} 
                                
                ))}
              </TextField>


            </div>
            <div>
              
            </div>
            <div>
              
            </div>
            <div>
              
            </div>
          </DialogContent>
                <DialogActions>
                
                <Button variant="contained" color="primary"  onClick={this.submitProveedor}>
                    Modificar
                </Button>
                <Button variant="contained" color="secondary" onClick={this.props.clickmodificar}>
                    Cancelar
                </Button>
                </DialogActions>
                </Dialog>
                :
                <div></div>
                }
            </div>
         )
    }
}


              
             
export default StkRubroModificar


