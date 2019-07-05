import React, { Component} from 'react'
import request from 'superagent'

// import IpServidor from '../VariablesDeEntorno'
import IpServidor from '../../pages/VariablesDeEntorno'

// Material UI START
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { number } from 'prop-types';
// Material UI   END


class AgregarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkmonedasagregar',
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion:0.00,
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

    // Agregar Moneda
    addMoneda = _=> { 
        // const url = IpServidor +'/agregarmonedas' 
        request
        .post(this.state.url)
        .set('Content-Type', 'application/json')
        .send({ idStkMonedas: this.state.idStkMonedas})
        .send({ StkMonedasDescripcion: this.state.StkMonedasDescripcion})    
        .send({ StkMonedasCotizacion: this.state.StkMonedasCotizacion})
        .set('X-API-Key', 'foobar')
        .then(function(res) {
        // res.body, res.headers, res.status
            //     console.log('res.status  ' + res.status);
            //     console.log('esta aca');
            //     alert('Agrego correctamente');
        })

        .catch(err => {
            if (err.status === 409) 
                    {
                    alert('Código de Moneda EXISTENTE  ') 
                    }
                    else
                    {
                    if (err.status === 410) 
                            {
                            alert('Código de Moneda no puede tener más de 4 dígitos ') 
                            }     
               else { console.log('Error nro :  ' + err.status)}
                        }
            })
    }   
   
    updateField(field){
      this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitMoneda(e){
      e.preventDefault()
      this.addMoneda()
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
          <DialogTitle id="form-dialog-title">Agregar Nueva Moneda</DialogTitle>
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
              inputProps={{
                // disabled:true,
                maxlength: 4,
                // required: true,
                // pattern:[A-Z],
                willValidate:true,
                validationMessage:"Falso estas?"}}


              // SelectProps={{
              //   native: true
              // }}


              placeholder="Código"
              // value={this.state.idStkMonedas} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasDescripcion').focus();}}
              value={this.state.idStkMonedas}  
            />
            <TextField
              margin="dense"
              id="StkMonedasDescripcion"
              label="Descripción"
              type="text"
              fullWidth
              placeholder="Descripción"
              // value={this.state.StkMonedasDescripcion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasCotizacion').focus();}}
              value={this.state.StkMonedasDescripcion}  
            />
            <TextField
              margin="dense"
              id="StkMonedasCotizacion"
              label="Cotización"
              type="number"
              fullWidth
              placeholder="Cotización"
              // value={this.state.StkMonedasCotizacion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
              value={this.state.StkMonedasCotizacion}  
            />
            
          </DialogContent>
          <DialogActions>
            <Button id="button--submit" onClick={this.submitMoneda} color="primary">
              Agregar
            </Button>
            <Button onClick={this.props.toggleAgregar} color="secondary">
              Cancelar
            </Button>

          </DialogActions>
        </Dialog>
      </div>
        
        )
    }
}

export default AgregarMonedas