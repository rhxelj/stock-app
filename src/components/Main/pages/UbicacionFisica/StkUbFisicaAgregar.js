import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from '../VariablesDeEntorno'

// Material UI START
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Material UI   END
import CodigoError from '../../../lib/CodigoError'

class AgregarUbFisica extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkubfisicaagregar',
            idStkUbFisica:'',
           StkUbFisicaGeo:'',
            open: true, 
        // Material UI
        }
        this.updateField = this.updateField.bind(this);
        this.submitUbFisica = this.submitUbFisica.bind(this);
    }    
  
    // Agregar 
    add = _=> { 
        request
        .post(this.state.url)
        .set('Content-Type', 'application/json')
        .send({ idStkUbFisica: this.state.idStkUbFisica})
        .send({StkUbFisicaGeo: this.state.StkUbFisicaGeo})    
        .set('X-API-Key', 'foobar')
        .then(function(res) {
  
        })

        .catch((err) => CodigoError(err))
    }   
   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitUbFisica(e){
      e.preventDefault()
      this.add()
      this.props.read()
      this.props.toggleAgregar()
    }

          
    componentDidMount(){
    }

    render(){
      const ubicacion = [
        {
          indiceub: 'PAR',
          detalleub : 'PARQUE',
        },
        {
          indiceub: 'RUT',
          detalleub : 'RUTA',
        },
        {
          indiceub: 'GB',
          detalleub : 'GRUNBEING',
        },
      ]
        return( 
            
            <div>
                <Dialog
        //   open={this.state.open}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Agregar Nueva Ubicación</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los Datos y presione enter para cambiar de campo.
            </DialogContentText>

            <TextField
              id="StkUbFisicaGeo"
              select
              label="Ubicación Geografica"
              fullWidth
              value={this.state.StkUbFisicaGeo}
              onChange={this.updateField}
              SelectProps={{
                native: true
              }} 
              autoFocus={true}
              >
              <option default></option>
              
              {ubicacion.map(option => (    
                <option
                key={option.indiceub}
                value={option.indiceub}
                >
                    {option.detalleub} 
                </option>))} 
              </TextField>

            <TextField
              autoFocus
              margin="dense"
              id="idStkUbFisica"
              label="Lugar Físico"
              type="text"
              fullWidth
              placeholder="Lugar Físico"
              value={this.state.idStkUbFisica} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkUbFisicaGeo').focus();}}
            />
          
          
            
          </DialogContent>
          <DialogActions>
            <Button 
              id="button--submit" 
              onClick={this.submitUbFisica} 
              color="primary"
              variant="contained"
            >
              
              Agregar
            </Button>

            <Button 
              variant="contained"
              onClick={this.props.toggleAgregar} 
              color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        )
    }
}

export default AgregarUbFisica