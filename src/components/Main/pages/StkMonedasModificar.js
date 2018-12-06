import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from './VariablesDeEntorno'

// Material UI START
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Material UI   END


class StkModificarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkmonedasagregar',
            idStkMonedas: this.props.idStkMonedas,
            StkMonedasDescripcion:this.props.StkMonedasDescripcion,
            StkMonedasCotizacion:this.props.StkMonedasCotizacion,
            open: true, // Material UI
        }
        this.updateField = this.updateField.bind(this);
        this.submitMoneda = this.submitMoneda.bind(this);
    }    

    // Material UI START
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    // Material UI END

    ActualizaMoneda = (params) => {
      const  monedas  = params;
     
    request                  
       .post('http://localhost:4000/stkmonedasmodificar/'+this.state.idStkMonedas)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkMonedasDescripcion: this.state.StkMonedasDescripcion})
       .send({ StkMonedasCotizacion: this.state.StkMonedasCotizacion})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
     }
    
   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitMoneda(e){
        e.preventDefault()
        // this.addMoneda()
      this.ActualizaMoneda() // revisar si hay que pasar parametros
      this.props.read()
      
      this.props.clickmodificar()
      // this.props.read()
    }

    componentDidUpdate(){
      // this.props.read()
      
  }    
    componentDidMount(){
    }

    componentWillUnmount(){
      // this.props.read()
    }

    render(){
      
        return( 
       <div>
            <Dialog
        //   open={this.state.open}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modificar Moneda</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los Datos y presione enter para cambiar de campo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="idStkMonedas"
              label="Código"
              type="text"
              fullWidth
              placeholder="Código"
              value={this.state.idStkMonedas} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasDescripcion').focus();}}
            />
            <TextField
              margin="dense"
              id="StkMonedasDescripcion"
              label="Descripción"
              type="text"
              fullWidth
              placeholder="Descripción"
              value={this.state.StkMonedasDescripcion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasCotizacion').focus();}}
            />
            <TextField
              margin="dense"
              id="StkMonedasCotizacion"
              label="Cotización"
              type="number"
              fullWidth
              placeholder="Cotización"
              value={this.state.StkMonedasCotizacion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.clickmodificar} color="primary">
              Cancelar
            </Button>
            <Button id="button--submit" onClick={this.submitMoneda} color="primary">
              Modificar
            </Button>

          </DialogActions>
        </Dialog>
      </div>
        
        )
    }
}

export default StkModificarMonedas