import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from "../VariablesDeEntorno";
import Button from '@material-ui/core/Button';
import Table from  '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
    maxWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const TipoConfeccion = [
  {
    indiceconf: 1,
    detalle: 'Por Unidad',
  },
  {
    indiceconf: 2,
    detalle: 'Paño Unido',
  },
  {
    indiceconf: 3,
    detalle: 'Con Fajas',
  },
  {
    indiceconf: 4,
    detalle: 'Con Dobladillo',
  },
  {
    indiceconf: 5,
    detalle: 'Enrollable',
  },
  {
    indiceconf: 6,
    detalle: 'Con Ojales cada :',
  },
];

class PresupPant extends Component {
  
    constructor(props){
      super(props)
      this.state = {
          stkrubro:[],
          renglon : [],
          open: true,
          cantidad: 1.00,
  }
}

presupunid = () => {
 var datoscalculo = [
   {
    StkRubroAbr  : "STD",
    minmay   : 2,
    cantidad  : 10,
   },
   {
    StkRubroAbr  : "STD3",
    minmay   : 1,
    cantidad  : 20,
   },
  ]
  var datoscalculos = JSON.stringify(datoscalculo)

  const url = IpServidor + "/presupunid/?datoscalculo="+datoscalculos
   console.log(url)
  request
  .get(url)
  .set('Content-Type', 'application/json')
      .then(res=> {
        const renglon = JSON.parse(res.text)
        this.setState(()=>{ return {renglon: renglon}});
        console.log(renglon)
      })
  }
 

  // presuppu = () => {
  //   var datoscalculo = [
  //     {
  //      StkRubroAbr  : "STD",
  //      minmay   : 2,
  //      cantidad  : 3,
  //      largo : 5,
  //     },
  //     {
  //      StkRubroAbr  : "STD3",
  //      minmay   : 1,
  //      cantidad  : 7,
  //      largo : 8.5,
  //     },
  //    ]
  //    var datoscalculos = JSON.stringify(datoscalculo)
   
  //    const url = IpServidor + "/presuppu/?datoscalculo="+datoscalculos
  //    console.log(url)
  //    request
  //    .get(url)
  //    .set('Content-Type', 'application/json')
  //        .then(res=> {
  //          const renglon = JSON.parse(res.text)
  //          this.setState(()=>{ return {renglon: renglon}});
  //          console.log(renglon)
  //        })
  //    }
    
  handleClose = () =>  {
    this.setState({ open: false });
  };
render () {

    return (
  
    <div > 
       <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title">
        <DialogActions>
        <Button 
        id="button--submit" 
        onClick={this.presupunid} 
        color="primary"
        variant="contained"
        >
          Presupuestar Unid
        </Button>
        {/* <Button 
        id="button--submit" 
        onClick={this.presuppu} 
        color="primary"
        variant="contained"
        >
          Presupuestar Paño
        </Button> */}
      </DialogActions>
        </Dialog>  
  </div>       
    )
       
    }
   
  }

export default withStyles(styles)(PresupPant)	