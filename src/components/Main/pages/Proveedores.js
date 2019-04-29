import React, { Component } from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';

// import AgregarProveedor from './ProveedoresAgregar'
import ProveedoresAgregar from './ProveedoresAgregar';
import ProveedoresModificar from './ProveedoresModificar';
import ProveedoresBorrar from './ProveedoresBorrar'

import IpServidor from './VariablesDeEntorno'



// para usar las tablas de MUI start
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
      toggle: false,
      togglemodificar: false,
      proveedores: [],
      direction: {} // direccion del ordenamiento asc o desc
    }
    this.toggle = this.toggle.bind(this);
  }


  //Funcion ordernar Begin

  // Ordena Numeros
  sortByNumero(key) {
    this.setState({
      proveedores: this.state.proveedores.sort((a, b) =>
        this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
      }
    });
  }

  sortBy(key,tipo) {
    this.setState({
      proveedores: this.state.proveedores.sort((a, b) =>
      tipo === 'numero' 
      ? 
        (this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key] )
       :
        (this.state.direction[key] === "asc" ? a[key].toUpperCase() < b[key].toUpperCase() : b[key].toUpperCase() < a[key].toUpperCase())
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
      }
    });
  }

//Funcion ordernar End 

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

  // deleteProduct = (id) => {

  //   //       const { moneda } = this.state;
  //   request
  //     .delete(IpServidor + '/proveedoresborrar/' + id)
  //     .set('Content-Type', 'application/json')
  //     //.set('X-API-Key', 'foobar')
  //     .then(function (res) {
  //       // res.body, res.headers, res.status
  //     })
  //     .catch(err => {
  //       if (err.status === 411) {
  //         alert('Código de Proveedor Usado no se puede borrar  ')
  //       }
  //     })
  //   //alert("Borrado")
  //   //  this.toggle()
  //   this.read()
  // }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }

  togglemodificar(event) {
    this.toggle()
    this.setState(prevState => ({
      togglemodificar: !prevState.togglemodificar
    }))

  }
  
  leetprov = _ => {
    const url = IpServidor + '/stktipoproveedleer';
    request
      .get(url)
      .set('Content-Type', 'application/json')
      .then(res => {
        const tipoprov = JSON.parse(res.text)
        this.setState({ tipoprov: tipoprov })
      })

  }

  componentDidMount() {
    this.leetprov()
    this.read()
  }



  render() {

    var proveedores = this.state.proveedores.map((rowData, index) =>
      Object.assign(rowData, {
        borrar:
          <div className="center-align"><ProveedoresBorrar idProveedores={rowData.idProveedores} read={() => this.read()}></ProveedoresBorrar></div>
      })
    )

    var columns = [
      {
        Header: "Código",
        accessor: "idProveedores",
        tipo:"numero"
      },
      {
        Header: "Denomiación",
        accessor: "ProveedoresDesc",
        tipo:""
      },
      {
        Header: "Tipo",
        accessor: "ProveedoresTipo",
        tipo:""
      },
      {
        Header: "CUIT",
        accessor: "ProveedoresCUIT",
        tipo:"numero"
      },
      {
        Header: "Calle",
        accessor: "ProveedoresCalle",
        tipo:""
      },
      {
        Header: "Nro",
        accessor: "ProveedoresNroCalle",
        tipo:"numero"
      },
      {
        Header: "Piso",
        accessor: "ProveedoresPiso",
        tipo:"numero"
      },
      {
        Header: "Dto",
        accessor: "ProveedoresDto",
        tipo:""
      },
      {
        Header: "Cod.Postal",
        accessor: "ProveedoresCodPos",
        tipo:"numero"
      },
      {
        Header: "Localidad",
        accessor: "ProveedoresLoc",
        tipo:""
      },
      {
        Header: "Provincia",
        accessor: "ProveedoresPcia",
        tipo:""
      },
      {
        Header: "Teléfono",
        accessor: "ProveedoresTel",
        tipo:"numero"
      },

      {
        Header: "Contacto",
        accessor: "ProveedoresContacto",
        tipo:""
      },
      {
        Header: "mail",
        accessor: "ProveedoresMail",
        tipo:""
      },
      {
        Header: "Pág. Web",
        accessor: "ProveedoresWeb",
        tipo:""
      },
      {
        Header: "Moneda",
        accessor: "ProveedoresCodMon",
        tipo:""
      },
      {
        Header: "",
        accessor: "borrar",

      }
    ]

    return (
      <div>
        <h1>ABM DE Proveedores</h1>

        {/* Agregar Proveedor */}
        {this.state.toggle
          ?
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  white-text">
                    <ProveedoresAgregar click={() => this.toggle()} read={() => this.read()}> </ProveedoresAgregar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <Button onClick={() => this.toggle()} variant="contained" color="primary">AGREGAR PROVEEDORES</Button>
        }

        {/* Muestro contenido */}
        {!this.state.toggle
          ?
          <Paper >
            <Table >
              <TableHead>
                <TableRow>
                  {
                    columns.map((row, index) => {
                      return (<CustomTableCell key={index} onClick={() => this.sortBy(row.accessor,row.tipo)} >{row.Header}</CustomTableCell>)
                    })
                  }
                </TableRow>
              </TableHead>

              <TableBody>
                {proveedores.map(row => {
                  return (
                    <TableRow onDoubleClick={() => {
                      this.setState({ idProveedores: row.idProveedores })
                      this.setState({ ProveedoresDesc: row.ProveedoresDesc })
                      this.setState({ ProveedoresTipo: row.ProveedoresTipo }) //Proveedores Tipo idStkTipoProveed
                      // this.setState({ ProveedoresTipo: row.StkTipoProveedDesc }) //Proveedores Tipo

                      this.setState({ ProveedoresCUIT: row.ProveedoresCUIT })
                      this.setState({ ProveedoresCalle: row.ProveedoresCalle })
                      this.setState({ ProveedoresNroCalle: row.ProveedoresNroCalle })
                      this.setState({ ProveedoresPiso: row.ProveedoresPiso })
                      this.setState({ ProveedoresDto: row.ProveedoresDto })
                      this.setState({ ProveedoresCodPos: row.ProveedoresCodPos })
                      this.setState({ ProveedoresLoc: row.ProveedoresLoc })
                      this.setState({ ProveedoresPcia: row.ProveedoresPcia })
                      this.setState({ ProveedoresTel: row.ProveedoresTel })
                      this.setState({ ProveedoresContacto: row.ProveedoresContacto })
                      this.setState({ ProveedoresMail: row.ProveedoresMail })
                      this.setState({ ProveedoresWeb: row.ProveedoresWeb })
                      this.setState({ ProveedoresCodMon: row.ProveedoresCodMon })

                      this.togglemodificar()
                      console.log(`valor de toogle modificar : ${this.state.togglemodificar}`)

                    }
                    } key={row.idProveedores}>

                      <CustomTableCell >{row.idProveedores}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresDesc}</CustomTableCell>
                      <CustomTableCell >{row.StkTipoProveedDesc}</CustomTableCell> 
                      <CustomTableCell >{row.ProveedoresCUIT}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresCalle}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresNroCalle}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresPiso}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresDto}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresCodPos}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresLoc}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresPcia}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresTel}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresContacto}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresMail}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresWeb}</CustomTableCell>
                      <CustomTableCell >{row.ProveedoresCodMon}</CustomTableCell>
                      <CustomTableCell >{row.borrar}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          :
          <div></div>
        }

        {/* modificar */}
        {this.state.togglemodificar
          ?
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  black-text">
                    <ProveedoresModificar
                      clickmodificar={() => this.togglemodificar()}
                      read={() => this.read()}

                      idProveedores={this.state.idProveedores}
                      ProveedoresDesc={this.state.ProveedoresDesc}
                      ProveedoresTipo={this.state.ProveedoresTipo}
                      ProveedoresCUIT={this.state.ProveedoresCUIT}
                      ProveedoresCalle={this.state.ProveedoresCalle}
                      ProveedoresNroCalle={this.state.ProveedoresNroCalle}
                      ProveedoresPiso={this.state.ProveedoresPiso}
                      ProveedoresDto={this.state.ProveedoresDto}
                      ProveedoresCodPos={this.state.ProveedoresCodPos}
                      ProveedoresLoc={this.state.ProveedoresLoc}
                      ProveedoresPcia={this.state.ProveedoresPcia}
                      ProveedoresTel={this.state.ProveedoresTel}
                      ProveedoresContacto={this.state.ProveedoresContacto}
                      ProveedoresMail={this.state.ProveedoresMail}
                      ProveedoresWeb={this.state.ProveedoresWeb}
                      ProveedoresCodMon={this.state.ProveedoresCodMon}
                    // StkTipoProveedDesc={this.state.borrar }
                    >
                    </ProveedoresModificar>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
      </div>
    )
  }
}

export default Proveedores