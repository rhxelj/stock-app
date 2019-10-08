import React, { Component } from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Grid from '@material-ui/core/Grid';


// import AgregarProveedor from './ProveedoresAgregar'
import IpServidor from '../VariablesDeEntorno'
import ProveedoresAgregar from './ProveedoresAgregar';
import ProveedoresBorrar from './ProveedoresBorrar'
import ProveedoresModificar from './ProveedoresModificar';
import StkFab from '../../../lib/StkFab'



// para usar las tablas de MUI start
import { withStyles } from '@material-ui/core/styles';
import '../../../../Styles/TableHeader.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Estilo para el botón de borrar
const style = {
  padding:'0px',
  width:'47px'
};

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

// para usar las tablas de MUI end





class Proveedores extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: IpServidor + '/proveedoresleer',
      proveedores: [],
      direction: {}, // direccion del ordenamiento asc o desc
      toggle_agregar: false,
      toggle_busqueda: false,
      toggle_modificar: false,
      toggle_imprimir: false,
      filtered:'',
      
      proveedor:{
        idProveedores:'',
        ProveedoresDesc:'',
        ProveedoresTipo:1,
        ProveedoresCUIT:'',
        ProveedoresCalle:'',
        ProveedoresNroCalle:0,
        ProveedoresPiso:'',
        ProveedoresDto:'',
        ProveedoresCodPos:'',
        ProveedoresLoc:'',
        ProveedoresPcia:'',
        ProveedoresTel:'',
        ProveedoresContacto:'',
        ProveedoresMail:'',
        ProveedoresWeb:'',
        ProveedoresCodMon:'',
      }
    }
    // this.toggle = this.toggle.bind(this);
  }


//Funcion ordernar Begin


// // Ordena Numeros
  // sortByNumero(key) {
  //   this.setState({
  //     proveedores: this.state.proveedores.sort((a, b) =>
  //       this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
  //     ),
  //     direction: {
  //       [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
  //     }
  //   });
  // }

  // sortBy(key,tipo) {
  //   this.setState({
  //     proveedores: this.state.proveedores.sort((a, b) =>
  //     tipo === 'numero' 
  //     ? 
  //       (this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key] )
  //      :
  //       (this.state.direction[key] === "asc" ? a[key].toUpperCase() < b[key].toUpperCase() : b[key].toUpperCase() < a[key].toUpperCase())
  //     ),
  //     direction: {
  //       [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
  //     }
  //   });
  // }

//Funcion ordernar End 

  // Funcion ordernar - Begin 

  sortBy(key) {
    this.setState({
        proveedores: this.state.proveedores.sort((a, b) =>
            this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
        ),
        direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
    });
}

// Funcion ordernar - End 

//Read
  read = _ => {
    // const url = IpServidor + '/proveedoresleer'; //'http://192.168.2.102:4000/indexprov'
    request
      .get(this.state.url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const proveedores = JSON.parse(res.text)
        this.setState({ proveedores: proveedores })
      })
  }

// Funcion De Busqueda - Begin

  search = (event) => {                       // Funcion de busqueda
    // var name  = event.target.name
    var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    this.setState({ filtered: value })
  }

  borraFiltered = ()=> {
    this.setState({ filtered: '' })
  }

// Funcion De Busqueda - End.

  //******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

  toggleAgregar = () =>{            
    this.setState(prevState => ({
        toggle_agregar: !prevState.toggle_agregar
    })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarProveedores> ***
}

toggleModificar = () =>{          
    this.setState(prevState => ({
        toggle_modificar: !prevState.toggle_modificar
    })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarProveedores> ***  
}

toggleBusqueda = () => {
    this.setState(prevState => ({
        toggle_busqueda: !prevState.toggle_busqueda
    }))
}

toggleImprimir = () => {
  this.setState(prevState => ({
      toggle_imprimir: !prevState.toggle_imprimir
  }))
}

//******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************
  

  
  // leetprov = _ => {
  //   // const url = IpServidor + '/stktipoproveedleer';
  //   const url = IpServidor + '/stkbgsubrubroleer';
  //   request
  //     .get(url)
  //     .set('Content-Type', 'application/json')
  //     .then(res => {
  //       const tipoprov = JSON.parse(res.text)
  //       this.setState({ tipoprov: tipoprov })
  //     })

  // }

  componentDidMount() {
    // this.leetprov()
    this.read()
  }



  render() {
  //************************************** Agrego el campo del Boton BORRAR - Begin *********************************
    this.state.proveedores.map((rowData, index) =>
      Object.assign(rowData, {
        borrar:
          // <div className="center-align"><ProveedoresBorrar idProveedores={rowData.idProveedores} read={() => this.read()}></ProveedoresBorrar></div>
          <ProveedoresBorrar idProveedores={rowData.idProveedores} read={() => this.read()}></ProveedoresBorrar>
        })
    )
  //************************************** Agrego el campo del Boton BORRAR - End ***********************************  
  
  // ******************************************* Filtrado de datos - Begin *******************************************

  var proveedores = this.state.proveedores.filter((proveedor) => { //este proveedores no es el proveedores de this.state.proveedores es una copia local
    return (
      
      proveedor.ProveedoresDesc == null ? true : 
        proveedor.ProveedoresDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 
      ||
      proveedor.SubRubroDetalle == null ? true : 
        proveedor.SubRubroDetalle.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
      // ||
      // proveedor.ProveedoresCalle.indexOf(this.state.filtered) !== -1
      // ||
      // proveedor.ProveedoresCUIT.indexOf(this.state.filtered) !== -1 
      // ||
      // proveedor.ProveedoresDto.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
    )
})

// ******************************************* Filtrado de datos - end  *******************************************    

  var columns = [
      {
        Header: "Código",
        accessor: "idProveedores",
        tipo:"numero",
        order: true,
      },
      {
        Header: "Denomiación",
        accessor: "ProveedoresDesc",
        tipo:"",
        order: true,
      },
      {
        Header: "Tipo",
        accessor: "ProveedoresTipo",
        tipo:"",
        order: true,
      },
      {
        Header: "CUIT",
        accessor: "ProveedoresCUIT",
        tipo:"numero",
        order: true,
      },
      {
        Header: "Calle",
        accessor: "ProveedoresCalle",
        tipo:"",
        order: true,
      },
      {
        Header: "Nro",
        accessor: "ProveedoresNroCalle",
        tipo:"numero",
        order: true,
      },
      {
        Header: "Piso",
        accessor: "ProveedoresPiso",
        tipo:"numero",
        order: true,
      },
      {
        Header: "Dto",
        accessor: "ProveedoresDto",
        tipo:"",
        order: true,
      },
      {
        Header: "Cod.Postal",
        accessor: "ProveedoresCodPos",
        tipo:"numero",
        order: true,
      },
      {
        Header: "Localidad",
        accessor: "ProveedoresLoc",
        tipo:"",
        order: true,
      },
      {
        Header: "Provincia",
        accessor: "ProveedoresPcia",
        tipo:"",
        order: true,
      },
      {
        Header: "Teléfono",
        accessor: "ProveedoresTel",
        tipo:"numero",
        order: true,
      },

      {
        Header: "Contacto",
        accessor: "ProveedoresContacto",
        tipo:"",
        order: true,
      },
      {
        Header: "mail",
        accessor: "ProveedoresMail",
        tipo:"",
        order: true,
      },
      {
        Header: "Pág. Web",
        accessor: "ProveedoresWeb",
        tipo:"",
        order: true,
      },
      {
        Header: "Moneda",
        accessor: "ProveedoresCodMon",
        tipo:"",
        order: true,
      },
      {
        Header: "",
        accessor: "borrar",

      }
    ]

    return (
      <div>
        {/* <h1>ABM DE Proveedores</h1> */}
        <Grid container>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                        <h1>ABM DE Proveedores</h1>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                </Grid>
        {/* Agregar Proveedor */}
        {this.state.toggle_agregar &&
          // ?
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  white-text">
                    <ProveedoresAgregar toggleAgregar={this.toggleAgregar} read={() => this.read()}> </ProveedoresAgregar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          // :
          // <Button onClick={() => this.toggle()} variant="contained" color="primary">AGREGAR PROVEEDORES</Button>
        }

        {/* Muestro contenido */}
        {!this.state.toggle_agregar &&
          // ?
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  <CustomTableCell className="headerFijo" ></CustomTableCell>
                  {
                    columns.map((row, index) => {
                      // return (<CustomTableCell style={{position: "sticky", top: 35}}key={index} onClick={() => {return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
                      return (<CustomTableCell className="headerFijo" key={index} onClick={() => {return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
                    })
                  }
                </TableRow>
              </TableHead>

              <TableBody>
                {proveedores.map(proveedor => {
                  return (
                    <TableRow onDoubleClick={() => {
                      this.setState({ 
                        proveedor: {
                          idProveedores: proveedor.idProveedores,
                          ProveedoresDesc: proveedor.ProveedoresDesc,
                          ProveedoresTipo: proveedor.ProveedoresTipo, //Proveedores Tipo idStkTipoProveed
                          ProveedoresCUIT: proveedor.ProveedoresCUIT,
                          ProveedoresCalle: proveedor.ProveedoresCalle,
                          ProveedoresNroCalle: proveedor.ProveedoresNroCalle,
                          ProveedoresPiso: proveedor.ProveedoresPiso,
                          ProveedoresDto: proveedor.ProveedoresDto,
                          ProveedoresCodPos: proveedor.ProveedoresCodPos,
                          ProveedoresLoc: proveedor.ProveedoresLoc,
                          ProveedoresPcia: proveedor.ProveedoresPcia,
                          ProveedoresTel: proveedor.ProveedoresTel,
                          ProveedoresContacto: proveedor.ProveedoresContacto,
                          ProveedoresMail: proveedor.ProveedoresMail,
                          ProveedoresWeb: proveedor.ProveedoresWeb,
                          ProveedoresCodMon: proveedor.ProveedoresCodMon,
                        }
                      })
                    this.toggleModificar()
                  }
                }key={proveedor.idProveedores}>

                      <CustomTableCell style= {style} >{proveedor.borrar}</CustomTableCell>
                      <CustomTableCell >{proveedor.idProveedores}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresDesc}</CustomTableCell>
                      {/* <CustomTableCell >{proveedor.StkTipoProveedDesc}</CustomTableCell>  */}
                      <CustomTableCell >{proveedor.SubRubroDetalle}</CustomTableCell> 
                      <CustomTableCell >{proveedor.ProveedoresCUIT}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresCalle}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresNroCalle}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresPiso}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresDto}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresCodPos}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresLoc}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresPcia}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresTel}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresContacto}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresMail}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresWeb}</CustomTableCell>
                      <CustomTableCell >{proveedor.ProveedoresCodMon}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          // :
          // <div></div>
        }

        {/* modificar */}
        {this.state.toggle_modificar &&
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  black-text">
                    <ProveedoresModificar
                      toggleModificar={this.toggleModificar}
                      read={() => this.read()}

                      proveedor={this.state.proveedor}
                    
                    >
                    {console.log("dentro de proveedores antes ")}
                    {console.log(this.state.proveedor)}
                    </ProveedoresModificar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        
        {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

        <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />
      </div>
    )
  }
}

export default withStyles(styles)(Proveedores)