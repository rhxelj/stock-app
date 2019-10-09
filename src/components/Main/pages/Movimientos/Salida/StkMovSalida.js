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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormControl, DialogContentText } from '@material-ui/core';
import { throws } from 'assert';
// import { AlertWarning } from 'material-ui/svg-icons';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const TipoConfeccion = [
  {
    indice: 1,
    detalle: 'Con Dobladillo',
  },
  {
    indice: 2,
    detalle: 'Con Fajas',
  },
  {
    indice: 3,
    detalle: 'Paño Unido',
  },
 
];
class StkMovSalida extends React.Component {
    constructor () {
      super()
      this.state = {
        stkrubro:[],
        stkgrupo:[],
        stkitems:[],
        StkItemsCantidad:0.00,
        StkItemsCantDisp:0.00,
        StkItemsFAct:'',
        StkItemsMin:0.00,
        StkItemsMax:0.00,
        TConfec: 0,
        cantidad: 1.00,
        largo: 0.00,
        ancho: 0.00,
        faltante : 0.00,
        total : 0.00,
        datostraid : [],
        marcaver : false,
        open: true
      }
    }
    // submit = () => {
    //   confirmAlert({
    //     title: 'La Cantidad excede la Disponibilidad',
    //     message: 'Confirma el Movimiento',
    //     buttons: [
    //       {
    //         label: 'Si',
    //         onClick: () => alert('Click Yes')
    //       },
    //       {
    //         label: 'No',
    //         onClick: () => alert('Click No')
    //       }
    //     ]
    //   })}
    handleClose = () => {
      this.setState({ open: false });
    };
   
  // Lee Grupo inicio 
leestkgrupo = _ => {
  const url = IpServidor + "/stkgrupoleer";
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
              this.setState({StkItemsCantidad: this.state.stkitemse[0].StkItemsCantidad})
              this.setState({StkItemsCantDisp: this.state.stkitemse[0].StkItemsCantDisp})
              this.setState({StkItemsFAct: this.state.stkitemse[0].StkItemsFAct})
              this.setState({StkItemsMin: this.state.stkitemse[0].StkItemsMin})
              this.setState({StkItemsMax: this.state.stkitemse[0].StkItemsMax})
  
            })
        }
  
componentWillMount(){
  this.leestkgrupo()
}

handleChange = prop => event => {
  this.setState({[prop]: event.target.value})
  
};

handleChangeGrupo = prop => event => {
  this.setState({[prop]: event.target.value},()=> this.stkrubroleecodgrupo(this.state.StkItemsGrupo))
};  
handleChangeRubro = prop => event => {
  this.setState({[prop]: event.target.value},()=> this.stkitemsleecodgryrb(this.state.StkItemsRubro))
};


handleChangeItems = prop => event => {
  this.setState({[prop]: event.target.value},()=> this.stkitemsleecodgrrbit())
};


verificadisp = _ => {
  var cant = Number(this.state.cantidad)
  var larg = Number(this.state.largo) 
  var anch = Number(this.state.ancho)

const url = IpServidor +  '/stkverificadisp'


    request
    
    .post(url)
    .set('Content-Type', 'application/json')
    .send({cant: cant})
    .send({larg: larg})
    .send({anch: anch})
    .send({StkItemsCantDisp: this.state.StkItemsCantDisp })
    .send({TConfec: this.state.TConfec})
    .then(res=> {
      const faltantev = JSON.parse(res.text)
      this.setState({datostraid: faltantev})
      this.setState({marcaver:true})
      this.setState({faltante: this.state.datostraid[0]})
      this.setState({total: this.state.datostraid[1]})
      
  })
 
  }
  // descargastock = _ => {   
  //   alert('descarga stock')
  //   } 
descargastock = _ => {     
const url = IpServidor +  '/stkitemsmoddisp/?id1='+this.state.StkItems+'&id2='+this.state.StkItemsGrupo +'&id3='+this.state.StkItemsRubro
    request
    .post(url)
    .set('Content-Type', 'application/json')
    .send({total: Number(this.state.total)})
    .send({StkItemsCantDisp: this.state.StkItemsCantDisp })
    .then(res=> {
      const total1 = JSON.parse(res.text)
      alert(total1)
      })
  
  // const url1 = 'http://localhost:4000/stkmovvtaagregar/?id1='+this.state.StkItems+'&id2='+this.state.StkItemsGrupo +'&id3='+this.state.StkItemsRubro ; //'http://localhost:3000/data'
  const url1 = IpServidor + '/stkmovvtaagregar/?id1=' + this.state.StkItems + '&id2=' + this.state.StkItemsGrupo + '&id3=' + this.state.StkItemsRubro
  request
  .post(url1)
  .set('Content-Type', 'application/json')
  .send({StkMovVtaCantidad: this.state.total})
  .then(function(res) {
      // res.body, res.headers, res.status
          });            
     }

salida = _=> {
}     
   
render () {
  return(
    <div>
      <Dialog
      // open={true}
      open={this.state.open}
      // onClose={this.handleClose}
      aria-labelledby="form-dialog-title"
      >  
      <Grid container>
      <Grid item xs={6} sm={6} lg={6}></Grid>
        <DialogTitle id="form-dialog-title">Salidas de stock por Confección</DialogTitle>
      <Grid item xs={6} sm={6} lg={6}></Grid>
      </Grid>
      <DialogContent>
      <Grid container  spacing={32}>
        <Grid item  xs={6} sm={6} lg={6}>
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
        <Grid item  xs={6} sm={6} lg={6}>
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
        <Grid item  xs={6} sm={6} lg={6}>
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
         
         
         
         {/* {this.state.StkItemsCantDisp < this.state.StkItemsMin
            ?
              <Grid item  xs={6} sm={6} lg={6}>
                <TextField
                id="CantDisp"
                label="Cantidad Disponible"
                value={this.state.StkItemsCantDisp}
                style={{background:"#f44336"}}
                disabled    
                      >
                </TextField>
              </Grid> 
            :
              <Grid item  xs={6} sm={6} lg={6}>
                <TextField
                  id="CantDisp"
                  label="Cantidad Disponible"
                  value={this.state.StkItemsCantDisp}
                  style={{background:"#00e676"}}
                  disabled    
                      >
                </TextField>
              </Grid> 
         } */}

<Grid item  xs={6} sm={6} lg={6}>
                <TextField
                id="CantDisp"
                label="Cantidad Disponible"
                value={this.state.StkItemsCantDisp}
                style={(this.state.StkItemsCantDisp < this.state.StkItemsMin) ? {background:"#f44336"}:{background:"#00e676"}}
                disabled    
                      >
                </TextField>
              </Grid> 


        <Grid item  xs={6} sm={6} lg={6}>
          <TextField
           id="MinStock"
           label="Mínimo Stock"
           value={this.state.StkItemsMin}
           disabled    
                >
          </TextField>
        </Grid> 
          <Grid item  xs={6} sm={6} lg={6}>
            <TextField
            id="MaxStock"
            label="Máximo Stock"
            value={this.state.StkItemsMax}
            disabled    
                  >
            </TextField>
          </Grid> 
        <Grid item  xs={6} sm={6} lg={6}>
          <TextField
            type="date"
            id="FechaAct"
            label="Fecha Actualización"
            value={this.state.StkItemsFAct}
            disabled    
                  >
          </TextField>
        </Grid> 
        <Grid item  xs={6} sm={6} lg={6}>
          <TextField
            id="TConfec"
            select
            label="Tipo Confección"
            fullWidth
            value={this.state.indice}
            onChange={this.handleChange('TConfec')}
            SelectProps={{
              native: true
            }} 
            autoFocus={true}
            >
            <option></option>
            {TipoConfeccion.map(option => (  
              <option
              key={option.indice}
              value={option.indice}
              >
                  {option.detalle} 
              </option>))} 
          </TextField>
        </Grid>
        <Grid item  xs={6} sm={6} lg={6}>
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
        <Grid item  xs={6} sm={6} lg={6}>
          <TextField
            id="largo"
            label="Largo"
            type="number"
            fullWidth
            value={this.state.largo}
            onChange={this.handleChange('largo')}
            autoFocus={true}
            >
          </TextField>
        </Grid>
        <Grid item  xs={6} sm={6} lg={6}>
          <TextField
            id="ancho"
            label="Ancho"
            type="number"
            fullWidth
            value={this.state.ancho}
            onChange={this.handleChange('ancho')}
            autoFocus={true}
            >
          </TextField>
         </Grid>
         <DialogActions>
                  {/* <Button variant="contained" color="primary"  onClick={this.submit}>Confirma</Button> */}
            [
              {!this.state.marcaver 
                ?
                <div>
                <Button variant="contained" color="primary"  onClick={this.verificadisp}>
                    Confirmar
                </Button>
                <Button variant="contained" color="secondary" onClick={this.handleClose}>
                    Cancelar
                </Button>
                </div>
                :
                  [
                    this.state.faltante > 0 
                    ?
                    <div>
                      <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        ATENCION NO ALCANZA EL STOCK
                        </DialogContentText>
                            {/* <label color="secondary"> ATENCION NO ALCANZA EL STOCK </label> */}
                        <DialogActions>
                        <Button variant="contained" color="primary"  onClick={this.descargastock}>
                          Verificado
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.handleClose}>
                          Cancelar
                        </Button>
                      </DialogActions>
                      </DialogContent>
                    </div>
                    :
                    <div>
                      <label  >DESCARGA</label> 
                      {this.descargastock()}
                      {this.handleClose()}
                    </div>
                  ]
              
              }
            ]
          </DialogActions>
          </Grid>
          </DialogContent>
        </Dialog>
        <DialogActions>
        </DialogActions>
        </div>
      )

    }
}



export default StkMovSalida





