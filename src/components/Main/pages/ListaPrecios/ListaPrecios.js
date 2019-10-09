import React, { Component} from 'react'
import request from 'superagent'
import  QRCode  from "qrcode.react";
import printJS from 'print-js'
import { withStyles } from '@material-ui/core/styles'; 
import IpServidor from "../VariablesDeEntorno";
import StkItemsRed from './StkItemsRed'

import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dialog } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
// import ExpansionPanel, {
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from 'material-ui/ExpansionPanel';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  
}))(TableCell);

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
    
  });

class ListaPrecios extends Component {
 constructor(props) {
    super(props)
    this.state = {
      url: IpServidor + '/listaprecios',
      listaprecios: [],
      direction: {}, // direccion del ordenamiento asc o desc
      codrubro : 0,
      codgrupo : 0,
      toggle_desplegar: false,
      toggle_busqueda: false,
      toggle_modificar: false,
      filtered:'',
      
      lisprecios : {
        idStkRubro : 0,
        StkRubroCodGrp : 0,
        StkGrupoDesc : '',
        StkRubroDesc : '',
        StkRubroCosto :	0.00,
        StkRubroTM	: '',
        PPub	:	0.00,
        PMay	:	0.00,
        PMayPU :	0.00,
        PMayPUR :	0.00,
      },
   
    }
  }

  leer = _ => {
    request
      .get(this.state.url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const listaprecios = JSON.parse(res.text)
        this.setState({ listaprecios: listaprecios })
      })
  }


  componentDidMount() {
    this.leer()
  }

  toggleDesplegar = (idStkRubro, StkRubroCodGrp) =>{         
    // this.setState(prevState => ({
    //     toggle_desplegar: !prevState.toggle_desplegar
    // }))
     // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <desplegarProveedores> ***
    this.toggleDialogo()
    this.setState({codgrupo : StkRubroCodGrp})
    this.setState({codrubro : idStkRubro})
  }

  toggleDialogo = () =>{         
    this.setState(prevState => ({
        toggle_desplegar: !prevState.toggle_desplegar
    }))
  }

render (){
  var listaprecios = this.state.listaprecios.filter((lisprecios) => { //este listaprecios no es el listaprecios de this.state.proveedores es una copia local
    return (
      
      lisprecios.StkGrupoDesc == null ? true : 
      lisprecios.StkGrupoDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 
   
    )
})
  var columns = [
    {
      Header: "Descripción",
      accessor: "StkRubroDesc",
      tipo:"",
      order: true,
    },
    {
      Header: "Precio Púb.",
      accessor: "PPub",
      tipo:"numero",
      order: true,
    },
    {
      Header: "Precio May",
      accessor: "PMay",
      tipo:"numero",
      order: true,
    }
  ]
    return(
      <div>
          
      <Grid container>
                  <Grid item xs={12} sm={8} lg={12}>
                  <h3>Lista Precios</h3>
                  </Grid>
                  <Grid item xs={12} sm={8} lg={12}>
                 
      {/* Desplegar Stock */}
      {/* {!this.state.toggle_desplegar && */}
      {/* {true && */}
        <Paper >
        <Table  stickyHeader>
            <TableHead   className="headerFijo" >
              {/* <TableRow> */}
                <CustomTableCell >Descripción</CustomTableCell>
                <CustomTableCell numeric>Precio Púb.</CustomTableCell>
                <CustomTableCell numeric>Precio May</CustomTableCell>
                <CustomTableCell numeric>Paño Unid</CustomTableCell>
                <CustomTableCell numeric>Paño Unid Rec</CustomTableCell>
            </TableHead>


            <TableBody  >
              {listaprecios.map(lisprecios => {
                return (
                 <TableRow 
                  hover	= {true}
                  onClick={() => {
                    this.toggleDesplegar(lisprecios.idStkRubro, lisprecios.StkRubroCodGrp)
                  // this.toggleDialogo()
                  }} 
                  key={lisprecios.StkRubroDesc}
                 >
                  <CustomTableCell >{lisprecios.StkRubroDesc}</CustomTableCell>
                  <CustomTableCell numeric>$ {lisprecios.PPub.toFixed(2)}</CustomTableCell>
                  <CustomTableCell numeric>$ {lisprecios.PMay.toFixed(2)}</CustomTableCell>
                  <CustomTableCell numeric>$ {lisprecios.PMayPU.toFixed(2)}</CustomTableCell>
                  <CustomTableCell numeric>$ {lisprecios.PMayPUR.toFixed(2)}</CustomTableCell>
                  </TableRow>
                )}
              )}
            </TableBody>

          </Table>
          <Grid item xs={2} sm={2} lg={6}>
          {/* {this.state.toggle_desplegar &&  */}
            <Dialog
              open={this.state.toggle_desplegar}
              // onClose={this.toggleDialogo}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <StkItemsRed CodGrupo = {this.state.codgrupo} CodRubro = {this.state.codrubro}/>
            
              <DialogActions>
                <Button variant="contained" color="secondary" onClick={()=>this.toggleDialogo()}>
                {/* <Button variant="contained" color="secondary" onClick={()=>alert("Cerrar fue presionado")}> */}
                        Cerrar
                </Button>
              </DialogActions>
            
            </Dialog> 
            </Grid>
          {/* } */}
          </Paper>
      {/* } */}
    
      
       </Grid>
              </Grid>
    </div>
  )
}
 


}


export default withStyles(styles)(ListaPrecios)	