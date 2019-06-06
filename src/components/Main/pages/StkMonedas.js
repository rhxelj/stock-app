
import React, { Component } from 'react'
import request from 'superagent'

import IpServidor from './VariablesDeEntorno'
import StkMonedasAgregar from './StkMonedasAgregar'
import StkMonedasBorrar from './StkMonedasBorrar'
import StkMonedasModificar from './StkMonedasModificar'
import StkFab from '../../lib/StkFab'

// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'; 


const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = {
    root: {
        width: '100%',
        //   marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        // backgroundColor: 'red',
        '&:nth-of-type(odd)': {
            // backgroundColor: theme.palette.background.default,
            // backgroundColor: 'red',
        },
    },
    fab: {
        // position: 'fixed',
        // bottom: theme.spacing.unit * 2,
        // right: theme.spacing.unit * 2,
        // bottom: '100px',
        // right: '100px',
        background: "red",
    },
    icon: {
        // margin: theme.spacing.unit,
        fontSize: 32,
    },
};

class Monedas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            idStkMonedas: '',
            StkMonedasDescripcion: '',
            StkMonedasCotizacion: 0,
            monedas: [],
            filtered: '',
            campo: 'idStkMonedas',
            direction: 'asc',
            // direction: {},
            toggle_agregar: false,
            toggle_busqueda: false,
            toggle_modificar: false,
            // targetname:"",
            // targetvalue:""
        }

        // this.togglemodificar = this.togglemodificar.bind(this);

        // this.toggle = this.toggle.bind(this);
        // const { classes } = props; // ver si se puede borra es para insertar iconos
    }

    //******************************************* Funcion ordernar - Begin *******************************************

    sortBy(key) {
        this.setState({
            monedas: this.state.monedas.sort((a, b) =>
                this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
            ),
            direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
        });
    }

    //******************************************* Funcion ordernar - End *******************************************

    //Read
    read = _ => {
        const url = IpServidor + '/stkmonedasleer'
        request
            .get(url)
            .set('Content-Type', 'application/json')
            .then(res => {
                const monedas = JSON.parse(res.text)
                // this.setState({monedas: monedas})
                this.setState({ monedas })
            })
        }
        
   
        search = (event) => {                       // Funcion de busqueda
            // var name  = event.target.name
            var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
            this.setState({ filtered: value })
        }
    
        borraFiltered = ()=> {
            this.setState({ filtered: '' })
        }
        
    //******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

    toggleAgregar = () =>{            
        this.setState(prevState => ({
            toggle_agregar: !prevState.toggle_agregar
        })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
    }

    toggleModificar = () =>{          
        this.setState(prevState => ({
            toggle_modificar: !prevState.toggle_modificar
        })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***  
    }

    toggleBusqueda = () => {
        this.setState(prevState => ({
            toggle_busqueda: !prevState.toggle_busqueda
        }))
    }

    //******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************




    // <input onChange={this.search} type="text" value={this.state.filtered}/>



    componentWillUnmount() {
        this.setState({ state: this.state });
    }

    componentDidMount() {
        this.read()
    }


    render() {

        // const { classes } = styles

        //************************************** Agrego el campo del Boton BORRAR - Begin *********************************

        this.state.monedas.map(
            (rowData, index) =>
                Object.assign(rowData, { borrar: <div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={() => this.read()}></StkMonedasBorrar></div> })
        );

        //  ************************************ Agrego el campo del Boton BORRAR - end  ***********************************


        // ******************************************* Filtrado de datos - Begin *******************************************

        var filtrado = this.state.monedas.filter((moneda) => {
            return (
                moneda.idStkMonedas.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 ||
                moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })

        // ******************************************* Filtrado de datos - end  *******************************************


        // ******************************************* Encabezado de la tabla a mostrar - Begin  *******************************************

        var columns = [
            {
                Header: "Código",
                accessor: "idStkMonedas",
                // tipo:"texto",
                order: true,
            },
            {
                Header: "Descripción",
                accessor: "StkMonedasDescripcion",
                // tipo:"texto",
                order: true,
            },
            {
                Header: "Cotización",
                accessor: "StkMonedasCotizacion",
                // tipo:"numero",
                // tipo:"texto",
                order: true,
            },
            {
                Header: "",
                accessor: "borrar",
                // tipo:"",
                order: false,
            }
        ]

        // ******************************************* Encabezado de la tabla a mostrar - end  *******************************************
        return (
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} lg={12}>
                        <h1>ABM DE Monedas</h1>
                    </Grid>
                </Grid>

                {/* Muestra el Componente AgregarMonedas  */}

                {this.state.toggle_agregar &&
                    // ? 
                    // Muestra el Componente AgregarMonedas 
                    <div>

                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkMonedasAgregar  toggleAgregar={this.toggleAgregar} read={this.read}> </StkMonedasAgregar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    // :
                    // // Boton Agregar 
                    // <div>
                    //     <Button onClick={()=>this.toggle()} variant="contained" color="primary">AGREGAR MONEDAS</Button>

                    // muestra cuadro para filtrado
                    //     <input onChange={this.search} type="text" value={this.state.filtered}/>

                    //          </div>
                }

                {/* Muestar la tabla de Monedas */}

                {!this.state.toggle_agregar &&
                    // ?
                    <Paper >
                        <Table >
                            <TableHead>
                                <TableRow className={this.props.classes.row} >
                                    {columns.map((row, index) => {
                                        return (<CustomTableCell key={index} onClick={() => { return row.order && this.sortBy(row.accessor) }} >{row.Header}</CustomTableCell>)
                                    })
                                    }
                                    <CustomTableCell ></CustomTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filtrado.map(row => {
                                    return (
                                        <TableRow className={this.props.classes.row} key={row.idStkMonedas}
                                            onDoubleClick={() => {
                                                this.setState({ idStkMonedas: row.idStkMonedas })
                                                this.setState({ StkMonedasDescripcion: row.StkMonedasDescripcion })
                                                this.setState({ StkMonedasCotizacion: row.StkMonedasCotizacion })

                                                this.toggleModificar()
                                            }}
                                        >

                                            <CustomTableCell>{row.idStkMonedas}</CustomTableCell>
                                            <CustomTableCell>{row.StkMonedasDescripcion}</CustomTableCell>
                                            <CustomTableCell>{row.StkMonedasCotizacion}</CustomTableCell>
                                            <CustomTableCell>{row.borrar}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    //     :
                    // <div></div>
                }

                {/* Llama al componente ModificarMonedas */}

                {this.state.toggle_modificar &&
                
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkMonedasModificar
                                            toggleModificar={this.toggleModificar}
                                            read={() => this.read()}
                                            idStkMonedas={this.state.idStkMonedas}
                                            StkMonedasDescripcion={this.state.StkMonedasDescripcion}
                                            StkMonedasCotizacion={this.state.StkMonedasCotizacion}
                                        >

                                        </StkMonedasModificar>
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

export default withStyles(styles)(Monedas)	