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

class AgregarUnidadMedidas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkunmedagregar',
            idStkUnMed:'',
            StkUnMedDesc:'',
            open: true, // Material UI
        }
        this.updateField = this.updateField.bind(this);
        this.submitUnMed = this.submitUnMed.bind(this);
    }    

     
    // Agregar 
    add = _=> { 
        // const url = IpServidor +'/agregarstkunmed'
        request
        .post(this.state.url)
        .set('Content-Type', 'application/json')
        .send({ idStkUnMed: this.state.idStkUnMed})
        .send({ StkUnMedDesc: this.state.StkUnMedDesc})    
        .set('X-API-Key', 'foobar')
        .then(function(res) {
        // res.body, res.headers, res.status
            //     console.log('res.status  ' + res.status);
            //     console.log('esta aca');
            //     alert('Agrego correctamente');
        })

        .catch((err) => CodigoError(err))
    }   
   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitUnMed(e){
      e.preventDefault()
      this.add()
      this.props.read()
      this.props.toggleAgregar()
    }

          
    componentDidMount(){
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
          <DialogTitle id="form-dialog-title">Agregar Nueva Unidad de Medida</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Cargue los Datos y presione enter para cambiar de campo.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="idStkUnMed"
              label="Código - (Máx. 4 Dígitos)"
              type="text"
              fullWidth
              placeholder="Código"
              value={this.state.idStkUnMed} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkUnMedDesc').focus();}}
            />
            <TextField
              margin="dense"
              id="StkUnMedDesc"
              label="Descripción"
              type="text"
              fullWidth
              placeholder="Descripción"
              value={this.state.StkUnMedDesc} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
            
          </DialogContent>
          <DialogActions>
            <Button 
              id="button--submit" 
              onClick={this.submitUnMed} 
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

export default AgregarUnidadMedidas