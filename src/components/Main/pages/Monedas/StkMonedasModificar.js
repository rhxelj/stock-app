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

import Grid from '@material-ui/core/Grid';

class StkModificarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkmonedasagregar',
            idStkMonedas: this.props.idStkMonedas,
            StkMonedasDescripcion:this.props.StkMonedasDescripcion,
            StkMonedasCotizacion:this.props.StkMonedasCotizacion,
            open: true, // Material UI
            moneda:this.props.moneda,
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

    actualizaMoneda = () => {
      // const  monedas  = params;
     console.log("valor de moneda : ")
     console.log(this.state.moneda)
    request                  
       .post('http://localhost:4000/stkmonedasmodificar/'+this.state.moneda.idStkMonedas)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkMonedasDescripcion: this.state.moneda.StkMonedasDescripcion})
       .send({ StkMonedasCotizacion: this.state.moneda.StkMonedasCotizacion})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
     }
    
   
    updateField(field){
        this.setState({
            moneda:{...this.state.moneda,[field.target.id]: field.target.value},
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitMoneda(e){
        e.preventDefault()
        // this.addMoneda()
      this.actualizaMoneda() // revisar si hay que pasar parametros
      this.props.read()
      this.props.toggleModificar()
      // this.props.toggle()
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
          <Grid container>
            <Grid item xs={4} sm={4} lg={4}></Grid>
              <DialogTitle id="form-dialog-title">Modificar Moneda</DialogTitle>
            <Grid item xs={4} sm={4} lg={4}></Grid>
          </Grid>
          <DialogContent>
          <Grid container  spacing={24}>
            <DialogContentText>
              Cargue los Datos y presione enter para cambiar de campo.
            </DialogContentText>
            <Grid item  xs={6} sm={6} lg={6}>
            <TextField
              autoFocus
              margin="dense"
              id="idStkMonedas"
              label="Código"
              type="text"
              fullWidth
              placeholder="Código"
              value={this.state.moneda.idStkMonedas} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasDescripcion').focus();}}
            />
            </Grid>
            <Grid item  xs={6} sm={6} lg={6}>
            <TextField
              margin="dense"
              id="StkMonedasDescripcion"
              label="Descripción"
              type="text"
              fullWidth
              placeholder="Descripción"
              value={this.state.moneda.StkMonedasDescripcion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasCotizacion').focus();}}
            />
            </Grid>
            <Grid item  xs={6} sm={6} lg={6}>
            <TextField
              margin="dense"
              id="StkMonedasCotizacion"
              label="Cotización"
              type="number"
              fullWidth
              placeholder="Cotización"
              value={this.state.moneda.StkMonedasCotizacion} 
              onChange={this.updateField}
              onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
            />
            </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              id="button--submit" 
              onClick={this.submitMoneda} 
              color="primary"
            >
              Modificar
            </Button>
            <Button onClick={this.props.toggle} color="secondary">
              Cancelar
            </Button>

          </DialogActions>
        </Dialog>
      </div>
        
        )
    }
}

export default StkModificarMonedas