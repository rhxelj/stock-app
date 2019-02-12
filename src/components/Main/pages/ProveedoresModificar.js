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

  
class ProveedoresAgregar extends Component {
    constructor(props){
        super(props)
        this.state = {
            estado:false,
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
            
            
            // provdesc:this.props.provdesc,
            // provtipo:this.props.provtipo,
            // provcuit:this.props.provcuit,
            // provcalle:this.props.provcalle,
            // provnrocalle:this.props.provnrocalle,
            // provpiso:this.props.provpiso,
            // provdto:this.props.provdto,
            // provcodpostal:this.props.provcodpostal,
            // provlocalidad:this.props.provlocalidad,
            // provprovincia:this.props.provprovincia,
            // provtelefono:this.props.provtelefono,
            // provcontacto:this.props.provcontacto,
            // provmail:this.props.provmail,
            // provpagweb:this.props.provpagweb,
            // provcodmon:this.props.provcodmon,
            // idStkTipoProveed:this.props.idStkTipoProveed,
            // StkTipoProveedDesc:this.props.StkTipoProveedDesc,
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
ActualizaProveedor = () => {
     
    // const  proveedores  = params;
   console.log("dentro de ActualizaProveedor contenido de this.state.ProveedoresTipo : " + JSON.stringify(this.state.ProveedoresTipo))
   console.log("dentro de ActualizaProveedor contenido de this.state.proveedores : " + this.state.proveedores.ProveedoresDesc)
  request                  
     .post(IpServidor + '/proveedoresmodificar/'+this.state.idProveedores)
     .set('Content-Type', 'application/json')
        .send({ provdesc: this.state.ProveedoresDesc})
        .send({ provtipo: this.state.ProveedoresTipo})
        .send({ provcuit: this.state.ProveedoresCUIT})        
        .send({ provcalle: this.state.ProveedoresCalle})
        .send({ provnrocalle: this.state.ProveedoresNroCalle})
        .send({ provpiso: this.state.ProveedoresPiso})
        .send({ provdto: this.state.ProveedoresDto})
        .send({ provcodpostal: this.state.ProveedoresCodPos})
        .send({ provlocalidad: this.state.ProveedoresLoc})
        .send({ provprovincia: this.state.ProveedoresPcia})
        .send({ provtelefono: this.state.ProveedoresTel})
        .send({ provcontacto: this.state.ProveedoresContacto})
        .send({ provmail: this.state.ProveedoresMail})
        .send({ provpagweb: this.state.ProveedoresWeb})
        .send({ provcodmon: this.state.ProveedoresCodMon})
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
        this.ActualizaProveedor()
        
        this.props.clickmodificar()
        this.props.read()

    }


    componentDidMount(){
        this.read()
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
                    value={this.state.ProveedoresDesc}
                    onChange={this.handleChange}
                    margin="dense"
                    fullWidth
                    variant="standard"
                    autoFocus= {true}
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresTipo').focus();}}/>
                <div>
                <TextField
                    id="ProveedoresTipo" 
                    select = {true}
                    label= 'Tipo'
                    value={this.state.ProveedoresTipo}
                    // onChange = {this.handleChange}>
                    onChange = {this.handleChange('ProveedoresTipo')}>
                    {this.state.tipoprov.map(option => (
                        <MenuItem
                            id = 'provtiposelect'
                            key={option.idStkTipoProveed}
                            value={option.idStkTipoProveed}
                        >
                            {option.StkTipoProveedDesc}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                <div>
                <TextField
                    id='ProveedoresCUIT'
                    label='C.U.I.T.'
                    value={this.state.ProveedoresCUIT}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCalle').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresCalle'
                    label='Calle'
                    value={this.state.ProveedoresCalle}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresNroCalle').focus();}}/>
                <TextField
                    id='ProveedoresNroCalle'
                    label='Nro'
                    value={this.state.ProveedoresNroCalle}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresPiso').focus();}}/>
                <TextField
                    id='ProveedoresPiso'
                    label='Piso'
                    value={this.state.ProveedoresPiso}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresDto').focus();}}/>
                <TextField
                    id='ProveedoresDto'
                    label='Dto'
                    value={this.state.ProveedoresDto}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCodPos').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresCodPos'
                    label='Cód.Postal'
                    value={this.state.ProveedoresCodPos}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresLoc').focus();}}/>
                <TextField
                    id='ProveedoresLoc'
                    label='Localidad'
                    value={this.state.ProveedoresLoc}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresPcia').focus();}}/>
                <TextField
                    id='ProveedoresPcia'
                    label='Provincia'
                    value={this.state.ProveedoresPcia}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresTel').focus();}}/>
                </div>
                <div>
                <TextField
                    id='ProveedoresTel'
                    label='Teléfono'
                    value={this.state.ProveedoresTel}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresContacto').focus();}}/>
                <TextField
                    id='ProveedoresContacto'
                    label='Contacto'
                    value={this.state.ProveedoresContacto}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresMail').focus();}}/>
                </div>
                 <div>
                <TextField
                    id='ProveedoresMail'
                    label='Mail'
                    value={this.state.ProveedoresMail}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresWeb').focus();}}/>
                <TextField
                    id='ProveedoresWeb'
                    label='Pág.web'
                    value={this.state.ProveedoresWeb}
                    onChange={this.handleChange}
                    margin="dense"
                    variant="standard"
                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('ProveedoresCodMon').focus();}}/>
                </div>
                <div>
                <TextField
                    id="ProveedoresCodMon" 
                    select = {true}
                    label= 'Tipo Moneda'
                    value={this.state.ProveedoresCodMon}
                    onChange = {this.handleChange}>
                    {this.state.stkmonedas.map(option => (
                        <MenuItem key={option.idStkMonedas}
                                value={option.idStkMonedas}>
                                {option.StkMonedasDescripcion}
                                </MenuItem>
                    ))}
                    </TextField>
                    
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


              
             
export default ProveedoresAgregar