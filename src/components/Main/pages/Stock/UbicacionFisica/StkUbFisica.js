import React, { Component } from "react";
import request from "superagent";
// import ReactTable from 'react-table'
import "react-table/react-table.css";

import StkUbFisicaAgregar from "./StkUbFisicaAgregar";
import StkUbFisicaBorrar from "./StkUbFisicaBorrar";

import IpServidor from "../../VariablesDeEntorno";
import StkFab from "../../../../lib/StkFab";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import "../../../../../Styles/TableHeader.css";

// Estilo para el botón de borrar
const style = {
  padding: "0px",
  width: "100px"
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = {
  root: {
    width: "100%",
    //   marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    // backgroundColor: 'red',
    "&:nth-of-type(odd)": {
      // backgroundColor: theme.palette.background.default,
      // backgroundColor: 'red',
    }
  },
  fab: {
    // position: 'fixed',
    // bottom: theme.spacing.unit * 2,
    // right: theme.spacing.unit * 2,
    // bottom: '100px',
    // right: '100px',
    background: "red"
  },
  icon: {
    // margin: theme.spacing.unit,
    fontSize: 32
  }
};

class UnidadMedidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: IpServidor,
      toggle_agregar: false,
      toggle_busqueda: false,
      // toggle_modificar: false,
      filtered: "",
      idStkUbFisica: "",
      StkUbFisicaGeo: "",
      ub_fisica: [],
      direction: "asc"
    };
    // this.renderEditable = this.renderEditable.bind(this)
    // this.toggle = this.toggle.bind(this);
    // this.funcionTest = this.funcionTest.bind(this);
  }

  //******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

  toggleAgregar = () => {
    this.setState(prevState => ({
      toggle_agregar: !prevState.toggle_agregar
    })); // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
  };

  toggleBusqueda = () => {
    this.setState(prevState => ({
      toggle_busqueda: !prevState.toggle_busqueda
    }));
  };

  //******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************

  // Funcion De Busqueda - Begin

  search = event => {
    // Funcion de busqueda
    // var name  = event.target.name
    var value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.setState({ filtered: value });
  };

  // Funcion De Busqueda - End.

  // Opcion para borrar contenido del cuadro de busqueda - BEGIN

  borraFiltered = () => {
    this.setState({ filtered: "" });
  };

  // Opcion para borrar contenido del cuadro de busqueda - END

  // Cosas a agregar para la funcion de Ordenar (SortBy) Begin ***************************************************************************************************

  // Funcion ordernar - Begin

  sortBy(key) {
    this.setState({
      ub_fisica: this.state.ub_fisica.sort((a, b) =>
        this.state.direction[key] === "asc"
          ? a[key] < b[key]
            ? 1
            : -1
          : a[key] > b[key]
          ? 1
          : -1
      ),
      direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
    });
  }

  // Funcion ordernar - End

  // Cosas a agregar para la funcion de Ordenar (SortBy) End ******************************************************************************************************

  //Read
  read = _ => {
    const url = IpServidor + "/stkubfisicaleer";
    request
      .get(url)
      .set("Content-Type", "application/json")
      .then(res => {
        const ub_fisica = JSON.parse(res.text);
        this.setState({ ub_fisica });
      });
  };

  componentDidMount() {
    this.read();
  }

  render() {
    //************************************** Agrego el campo del Boton BORRAR - Begin *********************************
    this.state.ub_fisica.map((rowData, index) =>
      Object.assign(rowData, {
        borrar: (
          <StkUbFisicaBorrar
            idStkUbFisica={rowData.idStkUbFisica}
            StkUbFisicaGeo={rowData.StkUbFisicaGeo}
            read={() => this.read()}
          ></StkUbFisicaBorrar>
        )
      })
    );
    //************************************** Agrego el campo del Boton BORRAR - End ***********************************

    // ******************************************* Filtrado de datos - Begin *******************************************

    var ub_fisica = this.state.ub_fisica.filter(ubfisica => {
      //este proveedores no es el proveedores de this.state.proveedores es una copia local
      return (
        ubfisica.idStkUbFisica
          .toLowerCase()
          .indexOf(this.state.filtered.toLowerCase()) !== -1 ||
        ubfisica.StkUbFisicaGeo.toLowerCase().indexOf(
          this.state.filtered.toLowerCase()
        ) !== -1
        // ||
        // proveedor.ProveedoresCUIT.indexOf(this.state.filtered) !== -1
        // ||
        // proveedor.ProveedoresCalle.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        // ||
        // proveedor.ProveedoresCalle.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
      );
    });

    // ******************************************* Filtrado de datos - end  *******************************************

    var columns = [
      {
        Header: "Lugar Físico",
        accessor: "idStkUbFisica",
        // tipo:"texto",
        order: true
      },
      {
        Header: "Ub. Geográfica",
        accessor: "StkUbFisicaGeo",
        // tipo:"texto",
        order: true
      },
      {
        Header: "",
        accessor: "borrar",
        // tipo:"",
        order: false
      }
    ];

    return (
      <div>
        <Grid container>
          <Grid item xs={4} sm={4} lg={4}></Grid>
          <Grid item xs={4} sm={4} lg={4}>
            <h1>AB de Ubicación</h1>
          </Grid>
          <Grid item xs={4} sm={4} lg={4}></Grid>
        </Grid>

        {/* Muestra el Componente Unidad de Medidas  */}

        {this.state.toggle_agregar && (
          <div>
            <div className="row">
              <div className="col s12 ">
                <div className="">
                  <div className="card-content  black-text">
                    <StkUbFisicaAgregar
                      toggleAgregar={this.toggleAgregar}
                      read={this.read}
                    >
                      {" "}
                    </StkUbFisicaAgregar>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Muestar la tabla de Unidad de Medidas */}

        {!this.state.toggle_agregar && (
          <Paper>
            <Table>
              <TableHead>
                <TableRow className={this.props.classes.row}>
                  <CustomTableCell className="headerFijo"></CustomTableCell>
                  {columns.map((row, index) => {
                    return (
                      <CustomTableCell
                        className="headerFijo"
                        key={index}
                        onClick={() => {
                          return row.order && this.sortBy(row.accessor);
                        }}
                      >
                        {row.Header}
                      </CustomTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>

              <TableBody>
                {ub_fisica.map(row => {
                  return (
                    <TableRow
                      className={this.props.classes.row}
                      key={row.idStkUbFisica}
                      onDoubleClick={() => {
                        this.setState({ idStkUbFisica: row.idStkUbFisica });
                        this.setState({ StkUbFisicaGeo: row.StkUbFisicaGeo });

                        // this.toggleModificar()
                      }}
                    >
                      <CustomTableCell style={style}>
                        {row.borrar}
                      </CustomTableCell>
                      <CustomTableCell>{row.idStkUbFisica}</CustomTableCell>
                      <CustomTableCell>{row.StkUbFisicaGeo}</CustomTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}

        {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}
        <StkFab
          borraFiltered={this.borraFiltered}
          toggleAgregar={this.toggleAgregar}
          toggleBusqueda={this.toggleBusqueda}
          toggle_busqueda={this.state.toggle_busqueda}
          search={this.search}
          filtered={this.state.filtered}
          agrega={true}
        />
      </div>
    );
  }
}

export default withStyles(styles)(UnidadMedidas);
