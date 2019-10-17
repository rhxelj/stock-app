import React from 'react'
import request from 'superagent'
import IpServidor from '../../VariablesDeEntorno'
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import StkScaneaQR from './StkScaneaQR'
import DialogActions from "@material-ui/core/DialogActions";

class StkSalidaFinal extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        toggle_scanea: false,
        open: true,
        datosscaneados: '',
        StkRubroAncho:0.00,
        StkRubroPresDes:'',
        StkRubroPres:0.00,
        StkRubroUM:0.00,
        cantidad: 1.00,
        cantidad1: 1.00,


      }
    }
   


toggleScanea = () =>{            
  this.setState(prevState => ({
      toggle_scanea: !prevState.toggle_scanea
  })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarProveedores> ***
  }
  
componentWillMount(){
}

handleChange = prop => event => {
  this.setState({[prop]: event.target.value})
  
};



handleClose = () =>  {
  this.setState({ open: false });
};

  

datosscaneados = (codigo) =>  {
  this.setState({ datosscaneados: codigo });
  var grupo = codigo.split(':')[1]
  var rubro = codigo.split(':')[2]

  const url = IpServidor + "/stkrubroleecodgryrb/?id1="+rubro+'&id2='+grupo;
  request
  .get(url)
  .set('Content-Type', 'application/json')
      .then(res=> {
        const stkrubroele = JSON.parse(res.text);
        this.setState(()=>{ return {stkrubroele: stkrubroele}});
        this.setState({StkRubroAncho: this.state.stkrubroele[0].StkRubroAncho})
        this.setState({StkRubroPresDes: this.state.stkrubroele[0].StkRubroPresDes})
        this.setState({StkRubroPres: this.state.stkrubroele[0].StkRubroPres})
        this.setState({StkRubroUM: this.state.stkrubroele[0].StkRubroUM})

      })
    }

  restastock = _ => {
  var nroenvase = this.state.datosscaneados.split(':')[0]
  var grupo = this.state.datosscaneados.split(':')[1]
  var rubro = this.state.datosscaneados.split(':')[2]
  var item = this.state.datosscaneados.split(':')[3]
  

  const url = IpServidor +  '/stkmovsalfinal/?id1='+item+'&id2='+grupo +'&id3='+rubro ; //'http://localhost:3000/data'
    request
    .post(url)
    .set('Content-Type', 'application/json')
    .send({cantidad: this.state.cantidad })
    .send({cantidad1: this.state.cantidad1 })
    .catch(err => {
        if (err.status === 414) 
                {
                alert('Falta información para modificar Items  ') 
                }
            else { 
                console.log('Error nro en StkMovEntrada 1:  ' + err.status)
                }
                    
              })
              
          

      const url1 = IpServidor +  '/stkmovenvase/?id1='+item+'&id2='+grupo +'&id3='+rubro +'&id4='+nroenvase ; //'http://localhost:3000/data'
      request
      .post(url1)
      .set('Content-Type', 'application/json')
      .send({cantidad2: this.state.cantidad })
      .send({cantidad3: this.state.cantidad1 })
      .catch(err => {
          if (err.status === 414) 
                  {
                  alert('Falta información para modificar Items  ') 
                  }
              else { 
                  console.log('Error nro en StkMovEntrada 1:  ' + err.status)
                  }
                      
                })
                
            }
      

render () {
  
  return(
    <div>
   
      {/* <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
      > */}
        <Grid container>
          <Grid item xs={6} sm={6} lg={6}></Grid>
            <DialogTitle id="form-dialog-title">Scaneo</DialogTitle>
          <Grid item xs={6} sm={6} lg={6}></Grid>
        </Grid>
        {/* <DialogContent> */}
          <Grid container  spacing={32}>
            <Grid item  xs={6} sm={6} lg={6}>
              <Button variant="contained" color="primary" onClick = {this.toggleScanea}  >
                {this.state.toggle_scanea && <StkScaneaQR datosscaneados={this.datosscaneados} />}
              Scanea
              </Button>
              <Button variant="contained" color="secondary" onClick={this.ImpConf}>
                  Cancelar
              </Button>
            </Grid>
            <Grid item  xs={6} sm={6} lg={6}>
            <h4>{this.state.datosscaneados.split('-')[0]}</h4>
              <h4>{this.state.datosscaneados.split('-')[1]}</h4>
              <h4>{this.state.datosscaneados.split('-')[2]}</h4>
              <h4>{this.state.datosscaneados.split('-')[3]}</h4>
              <h4>{this.state.datosscaneados.split('-')[4]}</h4>
{/* me faltaría un  */}
              <TextField
                id="cantidad"
                label="Cantidad"
                type="number"
                // fullWidth
                value={this.state.cantidad}
                onChange={this.handleChange('cantidad')}
                autoFocus={true}
                >
              </TextField>
              <label> por :   </label>
              <TextField
                id="cantidad1"
                label= {this.state.StkRubroUM}  
                type="number"
                // fullWidth
                value={this.state.cantidad1}
                onChange={this.handleChange('cantidad1')}
                autoFocus={true}
                >
           </TextField>
            
            </Grid>
                  {/* <Button  variant="contained" color="primary"  onClick={this.restastock(this.datosscaneados) }> */}
                  <Button  variant="contained" color="primary"  onClick={this.restastock}>
                Confirmar
            </Button>
            <Button variant="contained" color="secondary" onClick={this.handleClose}>
                Cancelar
            </Button>
            <DialogActions>
       
       <div>
      
       </div>
 
    
 </DialogActions>

          

          </Grid>
        {/* </DialogContent>
      </Dialog>  */}


    </div>
      )

    }
}



export default StkSalidaFinal 




