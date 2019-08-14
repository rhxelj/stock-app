import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from "../../VariablesDeEntorno";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// import { confirmAlert } from 'react-confirm-alert';
// import { Link, Route } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';


import Typography from '@material-ui/core/Typography';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, DialogContentText } from '@material-ui/core';
// import { throws } from 'assert';
// import { AlertWarning } from 'material-ui/svg-icons';
import StkGenImpQR from '../../Impresion/StkGenImpQR';
// import { timingSafeEqual } from 'crypto';



const styles = { color: 'white', backgroundColor: 'white',padding: 15 }
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
];


class StkMovEntrada extends React.Component {
    constructor () {
      super()
      this.state = {
        stkrubro:[],
        stkgrupo:[],
        stkitems:[],
        stkenvaseubg: [],
        ubicacionf : [],
        stkrubroele:[],
        StkItemsCantidad:0.00,
        StkItemsCantDisp:0.00,
        StkItemsFAct:'',
        StkItemsMin:0.00,
        StkItemsMax:0.00,
        // TConfec: 0,
        StkRubroAncho:0.00,
        StkRubroPresDes:'',
        StkRubroPres:0.00,
        StkRubroUM:0.00,
        cantidad: 1.00,
        largo: 0.00,
        ancho: 0.00,
        faltante : 0.00,
        total : 0.00,
        datostraid : [],
        open: true,
        toggle_imprimir: false,
        marcagenqr: false,
        imp_conf : false,
        marcaagregado : false,
        StkEnvaseUb: '',
        StkEnvaseObserv: '',
        StkEnvasePartida: '',
        ubicacion : ''
      }
    }

  // Lee Grupo inicio 
leestkgrupo = _ => {
  const url = IpServidor + "/stkgrupoleer";
  // console.log ('url ')
  // console.log (url)
  request
  .get(url)
  .set('Content-Type', 'application/json')
  .then(res=> {
      const stkgrupo = JSON.parse(res.text);
      this.setState(()=>{ return {stkgrupo: stkgrupo}});
      
      })
  }

  //lee rubro por código de grupo
  stkrubroleecodgrupo = (id) => {
    const url = IpServidor + "/stkrubroleecodgrupo/"+id;
    request
    .get(url)
    .set('Content-Type', 'application/json')
        .then(res=> {
          const stkrubro = JSON.parse(res.text);
          this.setState(()=>{ return {stkrubro: stkrubro}});
        })
    }


    //lee ubicacion física según la ubicación geografica
    
    stkubfisicaleerUbG = (id) => {
      const url = IpServidor + "/stkubfisicaleerUbG/?id="+id;
      request
      .get(url)
      .set('Content-Type', 'application/json')
          .then(res=> {
            const ubicacionf = JSON.parse(res.text);
            this.setState(()=>{ return {ubicacionf: ubicacionf}});
          })
      }
  

    stkrubroleecodgryrb = () => {
      const url = IpServidor + "/stkrubroleecodgryrb/?id1="+this.state.StkItemsRubro+'&id2='+this.state.StkItemsGrupo;
      request
      .get(url)
      .set('Content-Type', 'application/json')
          .then(res=> {
            const stkrubroele = JSON.parse(res.text);
            // this.setState(()=>{ return {stkrubroele: stkrubroele}});
            // this.setState({StkRubroAncho: this.state.stkrubroele[0].StkRubroAncho})
            // this.setState({StkRubroPresDes: this.state.stkrubroele[0].StkRubroPresDes})
            // this.setState({StkRubroPres: this.state.stkrubroele[0].StkRubroPres})
            // this.setState({StkRubroUM: this.state.stkrubroele[0].StkRubroUM})

            this.setState(()=>{ return {stkrubroele: stkrubroele}});
            this.setState({
              StkRubroAncho: this.state.stkrubroele[0].StkRubroAncho,
              StkRubroPresDes: this.state.stkrubroele[0].StkRubroPresDes,
              StkRubroPres: this.state.stkrubroele[0].StkRubroPres,
              StkRubroUM: this.state.stkrubroele[0].StkRubroUM
            })
          })
      
      // this.marcagrupo()
      }
    stkitemsleecodgryrb = (id3) => {
      var id2 = this.state.StkItemsGrupo
      const url = IpServidor + "/stkitemsleecodgryrb/?id2="+id2+'&id3='+id3;
      request
      .get(url)
      .set('Content-Type', 'application/json')
          .then(res=> {
            const stkitems = JSON.parse(res.text);
           this.setState(()=>{ return {stkitems: stkitems}});
          })
      }


      stkitemsleecodgrrbit = () => {
        var id1 = this.state.StkItems
        var id2 = this.state.StkItemsGrupo
        var id3 = this.state.StkItemsRubro
        const url = IpServidor + "/stkitemsleecodgrrbit/?id1="+id1+"&id2="+id2+'&id3='+id3;
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
              const stkitemse = JSON.parse(res.text);
              this.setState({stkitemse: stkitemse})
              // this.setState({StkItemsCantidad: this.state.stkitemse[0].StkItemsCantidad})
              // this.setState({StkItemsCantDisp: this.state.stkitemse[0].StkItemsCantDisp})
              // this.setState({StkItemsFAct: this.state.stkitemse[0].StkItemsFAct})
              // this.setState({StkItemsMin: this.state.stkitemse[0].StkItemsMin})
              // this.setState({StkItemsMax: this.state.stkitemse[0].StkItemsMax})
              // var recorte = this.state.StkItemsFAct.substr(0,10);
              // this.setState({StkItemsFAct: recorte})


              this.setState({
                // stkitemse: stkitemse,
                StkItemsCantidad: this.state.stkitemse[0].StkItemsCantidad,
                StkItemsCantDisp: this.state.stkitemse[0].StkItemsCantDisp,
                StkItemsFAct: this.state.stkitemse[0].StkItemsFAct,
                StkItemsMin: this.state.stkitemse[0].StkItemsMin,
                StkItemsMax: this.state.stkitemse[0].StkItemsMax
              })
              
              var recorte = this.state.StkItemsFAct.substr(0,10);
              this.setState({StkItemsFAct: recorte})
            })
        }
  
componentWillMount(){
  this.leestkgrupo()
}

componentWillUnmount() {
}


componentDidMount () {

}

// Handles VARIOS REVISAR si se pueden "REDUCIR" - INICIO
//***********************************************************//
    handleChange = prop => event => {
      this.setState({[prop]: event.target.value})
    
      
    };

    handleChangeGrupo = prop => event => {
      this.setState({[prop]: event.target.value},()=> this.stkrubroleecodgrupo(this.state.StkItemsGrupo))
    };  

    handleChangeUbicacion = prop => event => {
      this.setState({[prop]: event.target.value},()=> this.stkubfisicaleerUbG(this.state.StkEnvaseUbG))
    };

    handleChangeRubro = prop => event => {
      this.setState({[prop]: event.target.value},()=> this.stkrubroleecodgryrb())
      this.setState({[prop]: event.target.value},()=> this.stkitemsleecodgryrb(this.state.StkItemsRubro))
    };


    handleChangeItems = prop => event => {
      this.setState({[prop]: event.target.value},()=> this.stkitemsleecodgrrbit())
    };

    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () =>  {
      this.setState({ open: false });
    };

// Handles VARIOS REVISAR si se pueden "REDUCIR" - FIN
//***********************************************************//

toggleImprimir = () =>{          
  this.setState(prevState => ({
      toggle_imprimir: !prevState.toggle_imprimir
  })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***  
}

MarcaGenQr = () => {
  this.setState(prevState => ({
    marcagenqr: !prevState.marcagenqr
}))
}

ImpConf = () => {
  this.setState(prevState => ({
    imp_conf: !prevState.imp_conf
}))
}
//aca

agregastock = _ =>{     
     const url = IpServidor +  '/stkitemsmodstock/?id1='+this.state.StkItems+'&id2='+this.state.StkItemsGrupo +'&id3='+this.state.StkItemsRubro ; //'http://localhost:3000/data'
    request
    .post(url)
    .set('Content-Type', 'application/json')
    // .send({total: Number(this.state.total)})
    .send({cantidad: this.state.cantidad })
    .send({StkRubroPres: this.state.StkRubroPres })
    .send({StkItemsCantDisp: this.state.StkItemsCantDisp })
    .send({StkItemsCantidad: this.state.StkItemsCantidad })
    // .then(res=> {
    //   const total1 = JSON.parse(res.text)
    //   //this.setState({marcaver:true})
    //   })
    .catch(err => {
        if (err.status === 414) 
                {
                alert('Falta información para modificar Items  ') 
                }
           else { 
                console.log('Error nro en StkMovEntrada 1:  ' + err.status)
                }
                    
              })
      
           
      const url1 = IpServidor +  '/stkenvaseagregar/?id1='+this.state.StkItems+'&id2='+this.state.StkItemsGrupo +'&id3='+this.state.StkItemsRubro ; //'http://localhost:3000/data'
      request
      .post(url1)
      .set('Content-Type', 'application/json')
      // .send({total: Number(this.state.total)})
      .send({cantidad: this.state.cantidad })
      .send({StkRubroPres: this.state.StkRubroPres })
      .send({StkEnvasePartida: this.state.StkEnvasePartida })
      .send({StkEnvaseUbG: this.state.StkEnvaseUbG })
      .send({StkEnvaseUbF: this.state.StkEnvaseUbF })
      .send({StkEnvaseObserv: this.state.StkEnvaseObserv })
      .then(res=> {
       // const total1 = JSON.parse(res.text)
       this.setState({marcaagregado:true})
        }) 
        .catch(err => {
          if (err.status === 413) 
                  {
                  alert('Falta información para agregar Envase  ') 
                  }
                 
             else { console.log('Error nro en StkMovEntrada 2 :  ' + err.status)}
                      }
          )
        this.toggleImprimir()
       
}




render () {
  //const ubica =  this.state.indiceub
  return(
    // <div style={styles}>
    <div>
      {/* <Dialog
      id='dialogoppal'
      open={this.state.open}
      onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
       >   */}
      <Paper style={styles}>
      {/* <Grid container> */}

      
      {/* <Grid item xs={6} sm={6} lg={6}></Grid> */}
        {/* <DialogTitle id="form-dialog-title">Entradas de stock</DialogTitle> */}
        {/* <Grid item xs={6} sm={6} lg={6}><h1>Entradas de stock</h1></Grid>
      <Grid item xs={6} sm={6} lg={6}></Grid>
      </Grid> */}



      <Grid container>
        <Grid item xs={4} sm={4} lg={4}>
        </Grid>
        <Grid item xs={4} sm={4} lg={4}>
            <h1 style={{color:"Black"}}>Entradas de stock</h1>
        </Grid>
        <Grid item xs={4} sm={4} lg={4}>
        </Grid>
      </Grid>


          <Grid container  spacing={32}>

        <Grid item  xs={3} sm={3} lg={3}>
          <TextField
            id="CantDisp"
            label="Cantidad Disponible"
            value={this.state.StkItemsCantDisp}
            style={
              this.state.StkItemsCantDisp < this.state.StkItemsMin 
                ? {background: "#f92c19" }
                : {background:"#00e676"}}
            disabled    
          >
          </TextField>
        </Grid> 
    
                  <Grid item  xs={3} sm={3} lg={3}>
                    <TextField
                      id="Cantidad"
                      label="Cantidad "
                      value={this.state.StkItemsCantidad}
                      style={
                        this.state.StkItemsCantidad < this.state.StkItemsMin 
                          ? {background: "#f92c19" }
                          : {background:"#00e676"}
                      }
                      disabled    
                    >
                    </TextField>
                  </Grid> 
    
            <Grid item  xs={2} sm={2} lg={2}>
              <TextField
               id="MinStock"
               label="Mínimo Stock"
               value={this.state.StkItemsMin}
               disabled    
                    >
              </TextField>
            </Grid> 
              <Grid item  xs={2} sm={2} lg={2}>
                <TextField
                id="MaxStock"
                label="Máximo Stock"
                value={this.state.StkItemsMax}
                disabled    
                      >
                </TextField>
              </Grid> 
            <Grid item  xs={2} sm={2} lg={2}>
              <TextField
                InputLabelProps={{ shrink: true }} 
                type="date"
                id="FechaAct"
                label="Fecha Actualización"
                value={this.state.StkItemsFAct}
                disabled    
                      >
              </TextField>
            </Grid> 

      {/* <DialogContent> */}
        <Grid item  xs={4} sm={4} lg={4}>
       
          <TextField
            id="StkItemsGrupo"
            select
            label="Grupo"
            fullWidth
            value={this.state.StkItemsGrupo}
            onChange={this.handleChangeGrupo('StkItemsGrupo')}
            SelectProps={{
                native: true
              }} 
            >
            <option></option>
            {this.state.stkgrupo.map(option => (
              <option
                key={option.idStkGrupo}
                value={option.idStkGrupo}>
                    {option.StkGrupoDesc}
                    </option>
                ))}
          </TextField>
        </Grid> 
        <Grid item  xs={4} sm={4} lg={4}>
          <TextField
            id="StkItemsRubro"
            select
            label="Rubro"
            fullWidth
            value={this.state.StkItemsRubro}
            onChange={this.handleChangeRubro('StkItemsRubro')}
            SelectProps={{
              native: true
            }} 
            autoFocus={true}
            >
            <option></option>
            {this.state.stkrubro.map(option => (  
              <option
              key={option.idStkRubro}
              value={option.idStkRubro}
              >
              {option.StkRubroDesc} 
              </option>))} 
          </TextField>
        </Grid> 
        <Grid item  xs={4} sm={4} lg={4}>
          <TextField
            id="StkItems"
            select
            label="Items"
            fullWidth
            value={this.state.StkItems}
            onChange={this.handleChangeItems('StkItems')}
            SelectProps={{
              native: true
            }} 
            autoFocus={true}
            >
            <option></option>
            {this.state.stkitems.map(option => (  
              <option
              key={option.idStkItems}
              value={option.idStkItems}
              >
              {option.StkItemsDesc} 
              </option>))} 
          </TextField>
        </Grid>
        
{/* Cantidad/ StkRubroPresDes / StkRubroPres / StkRubroUM */}
        <Grid item  xs={2} sm={2} lg={2}>
          <TextField
            id="cantidad"
            label="Cantidad"
            type="number"
            fullWidth
            value={this.state.cantidad}
            onChange={this.handleChange('cantidad')}
            autoFocus={true}
            >
          </TextField>
        </Grid>
        
        <Grid item  xs={2} sm={2} lg={2}>
          <TextField
            label= " "
            type="text"
            fullWidth
            value={this.state.StkRubroPresDes}
            disabled  
            >
          </TextField>
        </Grid>
        
        
        {/* <Grid item  xs={2} sm={2} lg={2}> */}
          {/* <h1>de : </h1> */}
          <br></br>
          {/* <Typography variant="h6" component="h6">
            de :
          </Typography>
        </Grid> */}

        <Grid item  xs={4} sm={4} lg={4}>
          <Typography variant="h6" component="h6">
            de :
          
          <TextField
            label=" "
            id="StkRubroPres"
            type="Number"
            // fullWidth
            value={this.state.StkRubroPres}
            onChange={this.handleChange('StkRubroPres')}
            autoFocus={true}
            >
          </TextField>
            </Typography>
        </Grid>
        <Grid item  xs={2} sm={2} lg={2}>
          {/* <label>{this.state.StkRubroUM} x </label> */}
          
          <TextField 
            label="X"
            fullWidth 
            value={this.state.StkRubroUM}
            type="number"
          >
          </TextField>

        </Grid>

       
        <Grid item  xs={2} sm={2} lg={2}>
          <TextField
            id="StkRubroAncho"
            label="Ancho"
            type="number"
            fullWidth
            value={this.state.StkRubroAncho}
            onChange={this.handleChange('StkRubroAncho')}
            autoFocus={true}
            >
          </TextField>
         </Grid>
        
        {/* Partida Ubicación-Geografica Ubicación-Fisica */}
         <Grid item  xs={4} sm={4} lg={4}>
          <TextField
            id='StkEnvasePartida'
            type="text"
            label = 'Partida'
            fullWidth
            value={this.state.StkEnvasePartida}
            onChange={this.handleChange('StkEnvasePartida')}
            >
          </TextField>
        </Grid>
         
         
         <Grid item  xs={4} sm={4} lg={4}>
          <TextField
           id="StkEnvaseUbG"
           select
           label="Ubicación Geografica"
           fullWidth
           value={this.state.indiceub}
           onChange={this.handleChangeUbicacion('StkEnvaseUbG')}
           SelectProps={{
             native: true
           }} 
           autoFocus={true}
           >
           <option></option>
           {ubicacion.map(option => (  
             <option
             key={option.indiceub}
             value={option.indiceub}
             >
                 {option.detalleub} 
             </option>))} 
          </TextField>
         </Grid>
         <Grid item  xs={4} sm={4} lg={4}>
          <TextField
           id="StkEnvaseUbF"
           select
           label="Ubicación Física"
           fullWidth
           value={this.state.StkEnvaseUbF}
           onChange={this.handleChange('StkEnvaseUbF')}
           SelectProps={{
             native: true
           }} 
           autoFocus={true}
           >
           <option></option>
            {this.state.ubicacionf.map(option => (  
              <option
              key={option.idStkUbFisica}
              value={option.idStkUbFisica}
              >
              {option.idStkUbFisica} 
              </option>))} 
           
          </TextField>
         </Grid>

         <Grid item  xs={12} sm={12} lg={12}>
          <TextField
            id='StkEnvaseObserv'
            type="text"
            label = 'Observación'
            fullWidth
            value={this.state.StkEnvaseObserv}
            onChange={this.handleChange('StkEnvaseObserv')}
            >
          </TextField>

          
        </Grid>

        </Grid>
          {/* </DialogContent>
         <DialogActions> */}
              <Grid>
                <br></br>
                <br></br>
              </Grid>
              <Grid 
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
              
              >
                <Button  variant="contained" color="primary"  onClick={this.agregastock}>
                    Confirmar
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleClose}>
                    Cancelar
                </Button>
                </Grid>
             
          {/* </DialogActions> */}
       
       
               {this.state.toggle_imprimir &&
                  // <Dialog
                  // open={this.state.open}
                  // onClose={this.handleClose}
                  // aria-labelledby="form-dialog-title"
                  // >
                  // <DialogTitle id="form-dialog-title">Imprimir</DialogTitle>
                  //     <DialogContent>
                  //       <DialogContentText id="alert-dialog-slide-description">
                  
                  //   </DialogContentText>
                    <div>  
                    <Button variant="contained" color="primary" onClick = {this.ImpConf}  >
                      {this.state.imp_conf && <StkGenImpQR ubicaG = {this.state.StkEnvaseUbG} />}
                      Imprime
                    </Button>
                    <Button variant="contained" color="secondary" onClick={this.ImpConf}>
                      Cancelar
                    </Button>
                </div>
                // </DialogContent>
                // </Dialog> 
                
                }
          
             
          
          
        {/* </Dialog> */}
        </Paper>
        </div>
      )

    }
}



export default  (StkMovEntrada)




