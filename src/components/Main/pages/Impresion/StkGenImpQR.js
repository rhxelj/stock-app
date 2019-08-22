import React, { Component} from 'react'
import request from 'superagent'
import  QRCode  from "qrcode.react";
import printJS from 'print-js'

import IpServidor from "../../pages/VariablesDeEntorno";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import { Button } from '@material-ui/core';



class StkGenImpQR extends Component {
  
    constructor(props){
      super()
        this.state = {
          envaseimp:[],
          stkrubro:[],
          grupostk:0,
          rubrostk:0,
          itemsstk:0,
          open: true,
      }
    }     
      stkenvaseleeimp = _ => {
        const url = IpServidor +  '/stkenvaseleeimp/?id='+this.props.ubicaG ; 
        console.log(url)
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const envaseimp = JSON.parse(res.text)
            // this.setState({envaseimp: envaseimp})
            this.setState(()=>{ return {envaseimp: envaseimp}});
            })
           
    }
   stkenvasecambiaimp = _ => {
        const url = IpServidor +  '/stkenvasecambiaimp/?id='+this.props.ubicaG ; 
        console.log(url)
        request
        .post(url)
        .set('Content-Type', 'application/json')
        .then(res=> {
        const envasecambiaimp = JSON.parse(res.text)
            })
           
    }

  componentDidMount(){
    this.stkenvaseleeimp()  
  }      

   


 


render () {

    return (
  
    <div >
    <form>
     
     <br></br>
     <br></br>
     <br></br>
      <button type="button" onClick={()=>printJS({maxWidth : 800,  scanStyles : false, printable : 'mostrar', type : 'html'})}>
        Imprime
      </button>

      <button type="button" onClick={()=>this.props.cancelaImpresion()}>
        Cancelar
      </button>
      <Grid 
        id = "mostrar"
        container
        direction="column"
        // justify="left"
        // alignItems="left"
      >
        {this.state.envaseimp.map((option, indice) => (
        <Grid    xs={3} >
          <QRCode 
              id="codigo-QR"
              value={ option.idStkEnvase +  
                ':' + option.StkEnvaseGrupo + 
                ':' + option.StkEnvaseRubro + 
                ':' + option.StkEnvaseItem + 
                ': Envase Nro = ' + option.idStkEnvase +
                ' - ' + option.StkGrupoDesc + 
                ' - ' + option.StkRubroDesc + 
                ' - ' + option.StkItemsDesc + 
                ' - Cant ' + option.StkEnvaseCant + 
                ' - Ubic ' + option.StkEnvaseUbG + '--' + option.StkEnvaseUbF +
                ' - ' + option.stkenvasefecha + 
                ' - ' + option.StkEnvaseObserv
                } 

              style={{ width: 256 }}
              renderAs='svg'
              >
        </QRCode> 
          <Paper >Envase : { option.idStkEnvase }</Paper>
          <Paper >{ option.StkGrupoDesc  }</Paper>
          <Paper >{ option.StkRubroDesc }</Paper>
          <Paper >{ option.StkItemsDesc }</Paper>
          <Paper >Partida : { option.StkEnvasePartida }</Paper>
          <Paper >Cant. : { option.StkEnvaseCant  }</Paper>
          <Paper >Fecha : { option.StkEnvaseFechaAct  }</Paper>
          <Paper >Ubicación : { option.StkEnvaseUbG }  -- {option.StkEnvaseUbF} </Paper>
          <Paper >Observ. : { option.StkEnvaseObserv  }</Paper>
        </Grid>
          ))}
      </Grid>
               
    </form>
      {/* {this.stkenvasecambiaimp() } */}
    {/* <button type="button" onClick={()=>printJS( 'codigo-QR', 'html')} >
  
    Print eeForm
 </button> */}
  </div>       
  // </div>   
    )
       
    }
   
  }

export default StkGenImpQR
