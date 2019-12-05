import React, { Component } from 'react'
import request from 'superagent'

import IpServidor from "../VariablesDeEntorno";
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
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
import CodigoError from '../../../lib/CodigoError'
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

  constructor(props) {
    super(props)
    this.state = {
      stkrubro: [],
      renglon: [],
      open: true,
      Cliente: '',
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



  presuppu = () => {
    var datoscalculo = [
      {
        StkRubroAbr: "STD",
        minmay   : 2,
        cantidad: 3,
        largo: 5,
      },
      {
        StkRubroAbr: "STD3",
        minmay   : 1,
        cantidad: 7,
        largo: 8.5,
      },
    ]
    var datoscalculos = JSON.stringify(datoscalculo)

    const url = IpServidor + "/presuppu/?datoscalculo=" + datoscalculos
    console.log(url)
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const renglon = JSON.parse(res.text)
        this.setState(() => { return { renglon: renglon } });
        console.log(renglon)
      })
  }

  presupconfajas = () => {
    var datoscalculo = [
      {
        StkRubroAbr: "STD",
        minmay   : 2,
        cantidad: 1,
        largo: 5,
        ancho: 3.25,
      },
      {
        StkRubroAbr: "STD3",
        minmay   : 1,
        cantidad: 7,
        largo: 8.5,
        ancho: 2.75,
      },
    ]
    var datoscalculos = JSON.stringify(datoscalculo)

    const url = IpServidor + "/presupfajas/?datoscalculo=" + datoscalculos
    // console.log(url)
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const renglon = JSON.parse(res.text)
        this.setState(() => { return { renglon: renglon } });
        console.log(renglon)
      })
  }

  presuplonaconf = () => {
    var datoscalculo = [
      {
        StkRubroAbr: "STD",
        minmay   : 2,
        cantidad: 1,
        largo: 5,
        ancho: 3.25,
      },
      {
        StkRubroAbr: "STD3",
        minmay   : 1,
        cantidad: 7,
        largo: 8.5,
        ancho: 2.75,
      },
    ]
    var datoscalculos = JSON.stringify(datoscalculo)

    const url = IpServidor + "/presuplonaconf/?datoscalculo=" + datoscalculos
    // console.log(url)
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const renglon = JSON.parse(res.text)
        this.setState(() => { return { renglon: renglon } });
        console.log('renglon')
        console.log(renglon)
      })
  }

  grabapresup = _ => {
    console.log(this.state.renglon)
    const url = IpServidor + "/presupgraba";
    request
      .post(url)
      .set("Content-Type", "application/json")
      .send({ renglon: this.state.renglon })
      .set("X-API-Key", "foobar")
      .then(function (res) { })
      .catch((err) => CodigoError(err))
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  };
  render() {

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
            <Button
              id="button--submit"
              onClick={this.presuppu}
              color="primary"
              variant="contained"
            >
              Presupuestar Paño
        </Button>
            <TextField
              id='Cliente'
              type="text"
              label='Cliente'
              fullWidth
              value={this.state.Cliente}
              onChange={this.handleChange('Cliente')}
            >
            </TextField>
            <Button 
              id="button--submit" 
              onClick={this.presupconfajas} 
              color="primary"
              variant="contained"
              >
                Presupuestar Con Fajas
        </Button>
        <Button 
              id="button--submit" 
              onClick={this.presuplonaconf} 
              color="primary"
              variant="contained"
              >
                Presupuestar Confección
        </Button>
        
            <Button
              id="button--submit"
              onClick={this.grabapresup}
              color="primary"
              variant="contained"
            >
              Graba Prespuesto
        </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

  }

}

export default withStyles(styles)(PresupPant)	