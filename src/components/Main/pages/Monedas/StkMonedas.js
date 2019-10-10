
import React, { Component } from 'react'
import request from 'superagent'

import IpServidor from '../../pages/VariablesDeEntorno'
import StkMonedasAgregar from './StkMonedasAgregar'
import StkMonedasBorrar from './StkMonedasBorrar'
import StkMonedasModificar from './StkMonedasModificar'
// import StkFab from '../../../lib/StkFab'

import StkFab from '../../../lib/StkFab'

// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'; 
import '../../../../Styles/TableHeader.css'

import SelecCampos from '../Impresion/SelecCampos'

// Estilo para el boton de borrar
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
            moneda:{
                idStkMonedas: '',
                StkMonedasDescripcion: '',
                StkMonedasCotizacion: 0,
            },
            opcion:"",
            monedas: [],
            filtered: '',
            campo: 'idStkMonedas',
            direction: 'asc',
            // direction: {},
            // toggle_agregar: false,
            // toggle_busqueda: false,
            // toggle_modificar: false,
            opcion: "",            
            toggle:{
                agregar: false,
                busqueda: false,
                modificar: false,
                seleccampos: false,
            }
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

    toggle = (arg) =>{            
        console.log("el argumento es :",arg)
        this.setState(prevState => ({
            // toggle:{...this.state.toggle,[arg]: !prevState.toggle[arg]}
            toggle:{[arg]: !prevState.toggle[arg]}
        })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
        console.log("el contenido de this.state.toggle  es :",this.state.toggle)
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
                // Object.assign(rowData, { borrar: <div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={() => this.read()}></StkMonedasBorrar></div> })
                Object.assign(rowData, { borrar:<StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={() => this.read()}></StkMonedasBorrar> })
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
        
        // var properties = [
        //         // { field: 'idStkMonedas', displayName: 'ID'},
        //         { field: 'StkMonedasDescripcion', displayName: 'Descripción'},
        //         { field: 'StkMonedasCotizacion', displayName: 'Cotizacion'}
        //     ]
        
        return (
            <div>
                <Grid container>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                        <h1>ABM DE Monedas</h1>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                </Grid>
                {/* Muestra el Componente AgregarMonedas  */}

                {/* this.state.toggle_agregar && */}
                {this.state.toggle.agregar &&
                    // Muestra el Componente AgregarMonedas 
                    <div>

                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkMonedasAgregar  toggleAgregar={()=>this.toggle("agregar")} read={this.read}> </StkMonedasAgregar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                }

                {/* Muestar la tabla de Monedas */}

                {/* {!this.state.toggle_agregar && */}
                {!this.state.toggle.agregar &&
                    <Paper >
                        <Table >
                            <TableHead>
                                <TableRow className={this.props.classes.row} >
                                    <CustomTableCell className="headerFijo"  ></CustomTableCell>
                                    {columns.map((row, index) => {
                                        return (<CustomTableCell className="headerFijo"  key={index} onClick={() => { return row.order && this.sortBy(row.accessor) }} >{row.Header}</CustomTableCell>)
                                    })
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filtrado.map(moneda => {
                                    return (
                                        <TableRow className={this.props.classes.moneda} key={moneda.idStkMonedas}
                                            onDoubleClick={() => {
                                                this.setState({ 
                                                    moneda: {
                                                        idStkMonedas: moneda.idStkMonedas,
                                                        StkMonedasDescripcion: moneda.StkMonedasDescripcion,
                                                        StkMonedasCotizacion: moneda.StkMonedasCotizacion, 
                                                    }
                                                })
                                                this.toggle("modificar")
                                                console.log(this.state.toggle)
                                            }}
                                        >
                                            <CustomTableCell style= {style}>{moneda.borrar}</CustomTableCell>
                                            <CustomTableCell>{moneda.idStkMonedas}</CustomTableCell>
                                            <CustomTableCell>{moneda.StkMonedasDescripcion}</CustomTableCell>
                                            <CustomTableCell>{moneda.StkMonedasCotizacion}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                }

                {/* Llama al componente ModificarMonedas */}

                {/* {this.state.toggle_modificar && */}
                {this.state.toggle.modificar &&
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkMonedasModificar
                                            toggleModificar={()=>this.toggle("modificar")}
                                            read={() => this.read()}
                                            moneda={this.state.moneda}
                                        />
                                        {/* </StkMonedasModificar> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
                {this.state.toggle.seleccampos &&
                    // Componente Imprimir cuando apreto el boton imprimir mando el contenido de filtrado
                    <SelecCampos 
                        datos={filtrado} 
                        toggleImprimir={()=>this.toggle("seleccampos")} 
                        headerTabla={columns}
                    />
                }

                {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}
                {/* <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} /> */}
                <StkFab 
                    borraFiltered={this.borraFiltered} 
                    toggleAgregar={()=>this.toggle("agregar")} 
                    toggleImprimir={()=>this.toggle("seleccampos")}
                    toggleBusqueda={()=>this.toggle("busqueda")} 
                    toggle_busqueda={this.state.toggle.busqueda} 
                    search={this.search} 
                    filtered={this.state.filtered} 
                    agrega={true}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Monedas)	