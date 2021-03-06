import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from '../../VariablesDeEntorno'
import 'react-table/react-table.css'
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CodigoError from '../../../../lib/CodigoError'
  
class ProveedoresAgregar extends Component {
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
            
            proveedor:this.props.proveedor,
            
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

    this.setState({
        proveedor:{...this.state.proveedor,[event.target.id]: event.target.value},
    })

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
ActualizaProveedor = () => {
console.log("contenido de proveedor ")
    console.log(this.state.proveedor)
request                  
  .post(IpServidor + '/proveedoresmodificar/'+this.state.proveedor.idProveedores)
// .post(IpServidor + '/proveedoresmodificar/?:id'+this.state.proveedor.idProveedores)
     .set('Content-Type', 'application/json')
        .send({ ProveedoresDesc: this.state.proveedor.ProveedoresDesc})
        .send({ ProveedoresTipo: this.state.proveedor.ProveedoresTipo})
        .send({ ProveedoresCUIT: this.state.proveedor.ProveedoresCUIT})        
        .send({ ProveedoresCalle: this.state.proveedor.ProveedoresCalle})
        .send({ ProveedoresNroCalle: this.state.proveedor.ProveedoresNroCalle})
        .send({ ProveedoresPiso: this.state.proveedor.ProveedoresPiso})
        .send({ ProveedoresDto: this.state.proveedor.ProveedoresDto})
        .send({ ProveedoresCodPos: this.state.proveedor.ProveedoresCodPos})
        .send({ ProveedoresLoc: this.state.proveedor.ProveedoresLoc})
        .send({ ProveedoresPcia: this.state.proveedor.ProveedoresPcia})
        .send({ ProveedoresTel: this.state.proveedor.ProveedoresTel})
        .send({ ProveedoresContacto: this.state.proveedor.ProveedoresContacto})
        .send({ ProveedoresMail: this.state.proveedor.ProveedoresMail})
        .send({ ProveedoresWeb: this.state.proveedor.ProveedoresWeb})
        .send({ ProveedoresCodMon: this.state.proveedor.ProveedoresCodMon})
     
    
     .set('X-API-Key', 'foobar')
     .then(function(res) { // res.body, res.headers, res.status
      })
      .catch((err) => CodigoError(err))
    }
    leetprov = _ => {
        // const url = IpServidor + '/stktipoproveedleer'; 
        const url = IpServidor + '/stkbgsubrubroleer';
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
        this.ActualizaProveedor()
        
        this.props.toggleModificar()
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
                  <DialogTitle id="form-dialog-title">Modificar Proveedores</DialogTitle>
                <DialogContent>
                <TextField
                    id='ProveedoresDesc'
                    label='Descripción'
                    value={this.state.proveedor.ProveedoresDesc}
                    onChange={this.handleChange('ProveedoresDesc')}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    autoFocus= {true}
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresTipo').focus();}}/>
                <div>
                <TextField
                    id="ProveedoresTipo" 
                    select
                    label= 'Tipo'
                    value={this.state.proveedor.ProveedoresTipo}
                    // onChange = {this.handleChange}>
                    onChange = {this.handleChange('ProveedoresTipo')}
                    SelectProps={{native:true}}
                    >
                    {this.state.tipoprov.map(option => (
                        <option
                            id = 'provtiposelect'
                            // key={option.idStkTipoProveed}
                            // value={option.idStkTipoProveed}
                            key={option.idSubRubro}
                            value={option.idSubRubro}
                        >
                            {/* {option.StkTipoProveedDesc} */}
                            {option.SubRubroDetalle}
                        </option>
                    ))}
                    </TextField>
                </div>
                <div>
                <TextField
                    id='ProveedoresCUIT'
                    label='C.U.I.T.'
                    value={this.state.proveedor.ProveedoresCUIT}
                    onChange={this.handleChange('ProveedoresCUIT')}
                    margin="normal"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCalle').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresCalle'
                    label='Calle'
                    value={this.state.proveedor.ProveedoresCalle}
                    onChange={this.handleChange('ProveedoresCalle')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresNroCalle').focus();}}/>
                <TextField
                    id='ProveedoresNroCalle'
                    label='Nro'
                    value={this.state.proveedor.ProveedoresNroCalle}
                    onChange={this.handleChange('ProveedoresNroCalle')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresPiso').focus();}}/>
                <TextField
                    id='ProveedoresPiso'
                    label='Piso'
                    value={this.state.proveedor.ProveedoresPiso}
                    onChange={this.handleChange('ProveedoresPiso')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresDto').focus();}}/>
                <TextField
                    id='ProveedoresDto'
                    label='Dto'
                    value={this.state.proveedor.ProveedoresDto}
                    onChange={this.handleChange('ProveedoresDto')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCodPos').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresCodPos'
                    label='Cód.Postal'
                    value={this.state.proveedor.ProveedoresCodPos}
                    onChange={this.handleChange('ProveedoresCodPos')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresLoc').focus();}}/>
                <TextField
                    id='ProveedoresLoc'
                    label='Localidad'
                    value={this.state.proveedor.ProveedoresLoc}
                    onChange={this.handleChange('ProveedoresLoc')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresPcia').focus();}}/>
                <TextField
                    id='ProveedoresPcia'
                    label='Provincia'
                    value={this.state.proveedor.ProveedoresPcia}
                    onChange={this.handleChange('ProveedoresPcia')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresTel').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresTel'
                    label='Teléfono'
                    value={this.state.proveedor.ProveedoresTel}
                    onChange={this.handleChange('ProveedoresTel')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresContacto').focus();}}/>
                <TextField
                    id='ProveedoresContacto'
                    label='Contacto'
                    value={this.state.proveedor.ProveedoresContacto}
                    onChange={this.handleChange('ProveedoresContacto')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresMail').focus();}}/>
                </div>
                 <div>
                <TextField
                    id='ProveedoresMail'
                    label='Mail'
                    value={this.state.proveedor.ProveedoresMail}
                    onChange={this.handleChange('ProveedoresMail')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresWeb').focus();}}/>
                <TextField
                    id='ProveedoresWeb'
                    label='Pág.web'
                    value={this.state.proveedor.ProveedoresWeb}
                    onChange={this.handleChange('ProveedoresWeb')}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCodMon').focus();}}/>
                </div>
                <div>
                <TextField
                    id="ProveedoresCodMon" 
                    select 
                    label= 'Tipo Moneda'
                    // value={this.state.proveedor.ProveedoresCodMon}
                    value={this.state.proveedor.ProveedoresCodMon}
                    onChange = {this.handleChange('ProveedoresCodMon')}
                    SelectProps={{native:true}}
                    >

                    {this.state.stkmonedas.map(option => (
                        // <MenuItem key={option.idStkMonedas}
                        //         value={option.idStkMonedas}>
                        //         {/* {option.StkMonedasDescripcion} */}
                        //         {console.log("contenido de this.state.ProveedoresCodMon "+this.state.ProveedoresCodMon)}
                        //         {option.idStkMonedas}
                        // </MenuItem>
                         <option key={option.idStkMonedas}
                         value={option.idStkMonedas}>
                         {/* {option.StkMonedasDescripcion} */}
                         {console.log("contenido de this.state.ProveedoresCodMon "+this.state.ProveedoresCodMon)}
                         {option.idStkMonedas}
                        </option>
                    ))}
                    
                    </TextField>
                    
                </div>
                 </DialogContent>
                <DialogActions>
                
                <Button variant="contained" color="primary"  onClick={this.submitProveedor}>
                    Modificar
                </Button>
                <Button variant="contained" color="secondary" onClick={this.props.toggleModificar}>
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


              
             
export default ProveedoresAgregar


