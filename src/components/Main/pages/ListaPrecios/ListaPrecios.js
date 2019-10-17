import React, { Component} from 'react'
import request from 'superagent'
// import  QRCode  from "qrcode.react";
// import printJS from 'print-js'
import { withStyles } from '@material-ui/core/styles'; 
import IpServidor from "../VariablesDeEntorno";
import StkItemsRed from './StkItemsRed'

// import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dialog } from '@material-ui/core';
// import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions'
import StkFab from '../../../lib/StkFab'
import SelecCampos from '../Impresion/SelecCampos'
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

      toggle:{
        agregar: false,
        busqueda: false,
        modificar: false,
        seleccampos: false,
    },
      
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

  // Funcion De Busqueda - Begin

  search = (event) => {                       // Funcion de busqueda
    // var name  = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    this.setState({ filtered: value })
}

// Funcion De Busqueda - End.

// Cosas a agregar para la funcion de Busqueda End *************************************************************************************************************
  
  
   // Opcion para borrar contenido del cuadro de busqueda - BEGIN    
        
   borraFiltered = ()=> {
    this.setState({ filtered: '' })
}

// Opcion para borrar contenido del cuadro de busqueda - END
  
  toggle = (arg) =>{            
    console.log("el argumento es :",arg)
    this.setState(prevState => ({
        // toggle:{...this.state.toggle,[arg]: !prevState.toggle[arg]}
        toggle:{[arg]: !prevState.toggle[arg]}
    })) // estado inicial "FALSE" muestra la tabla de "listaprecios"  en "TRUE" llama al componente *** <Agregarlistaprecios> ***
    console.log("el contenido de this.state.toggle  es :",this.state.toggle)
}
  
  toggleDesplegar = (idStkRubro, StkRubroCodGrp) =>{         
    // this.setState(prevState => ({
    //     toggle_desplegar: !prevState.toggle_desplegar
    // }))
     // estado inicial "FALSE" muestra la tabla de "listaprecios"  en "TRUE" llama al componente *** <desplegarProveedores> ***
    this.toggleDialogo()
    this.setState({codgrupo : StkRubroCodGrp})
    this.setState({codrubro : idStkRubro})
  }

  toggleDialogo = () =>{         
    this.setState(prevState => ({
        toggle_desplegar: !prevState.toggle_desplegar
    }))
  }


//******************************************* Funcion ordernar - Begin *******************************************

sortBy(key) {
  this.setState({
      listaprecios: this.state.listaprecios.sort((a, b) =>
          this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
      ),
      direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
  });
}

//******************************************* Funcion ordernar - End *******************************************


render (){
 
  // Filtrado de datos - Begin 
    var listaprecios = this.state.listaprecios.filter((lisprecios) => { //este listaprecios no es el listaprecios de this.state.proveedores es una copia local
      return (
        lisprecios.StkRubroDesc == null ? true : 
        lisprecios.StkRubroDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        
      )
    })
  // Filtrado de datos - End 

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
    },
    {
      Header: "Paño Unido",
      accessor: "PMayPU",
      tipo:"",
      order: true,
    },
    {
      Header: "Paño Unido Rec",
      accessor: "PMayPUR",
      tipo:"",
      order: true,
    },
    {
      Header: "",
      accessor: "",
      tipo:"",
      order: false,
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
              <TableRow>
                {/* <CustomTableCell >Descripción</CustomTableCell>
                <CustomTableCell numeric>Precio Púb.</CustomTableCell>
                <CustomTableCell numeric>Precio May</CustomTableCell>
                <CustomTableCell numeric>Paño Unid</CustomTableCell>
                <CustomTableCell numeric>Paño Unid Rec</CustomTableCell> */}
                
                {/* <CustomTableCell className="headerFijo"  > */}
                                    {columns.map((row, index) => {
                                      return (
                                        <CustomTableCell 
                                        className="headerFijo"  
                                        key={index} 
                                        onClick={() => { return row.order && this.sortBy(row.accessor) }} 
                                        >
                                                {row.Header}
                                            </CustomTableCell>)
                                        
                                      })
                                    }
                </TableRow>
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
                  <CustomTableCell ></CustomTableCell>
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
              

              {this.state.toggle.seleccampos &&
        <SelecCampos 
            datos={listaprecios} 
            toggleImprimir={()=>this.toggle("seleccampos")} 
            headerTabla={columns}
        />
    }

              <StkFab 
                    borraFiltered={this.borraFiltered} 
                    toggleAgregar={()=>this.toggle("agregar")} 
                    toggleImprimir={()=>this.toggle("seleccampos")}
                    toggleBusqueda={()=>this.toggle("busqueda")} 
                    toggle_busqueda={this.state.toggle.busqueda} 
                    search={this.search} 
                    filtered={this.state.filtered} 
                    agrega={false}
                />
    </div>
  )
}
 


}


export default withStyles(styles)(ListaPrecios)	