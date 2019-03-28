import React, { Component } from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'


import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';

// import StkMonedasAgregar from './StkMonedasAgregar'
// import StkMonedasBorrar from './StkMonedasBorrar'
// import StkMonedasModificar from './StkMonedasModificar'

import StkRubroAgregar from './StkRubroAgregar'
import StkRubroBorrar from './StkRubroBorrar'
import StkRubroModificar from './StkRubroModificar'

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

class StkRubro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: IpServidor + '/stkrubroleermezcla',
            toggle: false,
            togglemodificar: false,
            idStkRubro: '',
            StkMonedasDescripcion: '',
            StkMonedasCotizacion: 0,
            rubro: [],
            filtered: '',
            // campo: 'StkMonedasDescripcion',idStkMonedas
            campo: 'idStkRubro',
            // fab: {
            //     position: 'absolute',
            //     bottom: '50px',
            //     right: '50px',
            //   },
            direction: { // direccion del ordenamiento asc o des
            }

        }
        this.toggle = this.toggle.bind(this);
        this.togglemodificar = this.togglemodificar.bind(this);
        // this.funcionTest = this.funcionTest.bind(this);
        // leeproveedor
    }

    //Funcion ordernar Begin

    // Ordena Numeros
    sortByNumero(key) {
        this.setState({
            monedas: this.state.monedas.sort((a, b) =>
                this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
            ),
            direction: {
                [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
            }
        });
    }

    sortBy(key) {
        this.setState({
            monedas: this.state.monedas.sort((a, b) =>
                this.state.direction[key] === "asc" ? a[key].toUpperCase() < b[key].toUpperCase() : b[key].toUpperCase() < a[key].toUpperCase()
            ),
            direction: {
                [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
            }
        });
    }

    //Funcion ordernar End




    //Read
    read = _ => {
        // const url = IpServidor + '/leermonedas'; //'http://192.168.2.102:4000/indexprov'
        request
            .get(this.state.url)
            .set('Content-Type', 'application/json')
            .then(res => {
                const rubro = JSON.parse(res.text)
                this.setState({ rubro: rubro }, () => {
                    console.log(`Rubro :`)
                    console.log(this.state.rubro)
                })
            })
    }



    leeproveedor(prop) {
        // if (this.state.StkRubroProv1 !== 0) {
        if (prop !== 0) {
            const url = 'http://localhost:4000/proveedoresleercod/' + prop; //'http://localhost:3000/data'
            request
                .get(url)
                .set('Content-Type', 'application/json')
                .then(res => {
                    const proveedor = JSON.parse(res.text)
                    this.setState({ proveedor: proveedor })
                    this.setState({ DescProv: this.state.proveedor[0].ProveedoresDesc })
                })

        }
    }

    leegrupodesc(prop) {
        // if (this.state.StkRubroProv1 !== 0) {
        if (prop !== 0) {
            const url = 'http://localhost:4000/stkgrupoleercod/' + prop; //'http://localhost:3000/data'
            request
                .get(url)
                .set('Content-Type', 'application/json')
                .then(res => {
                    const grupo = JSON.parse(res.text)
                    this.setState({ grupo: grupo })
                    this.setState({ StkGrupoDesc: this.state.grupo[0].StkGrupoDesc })
                })

        }
    }


    // //Update
    // ActualizaMoneda = (params) => {
    //   const  monedas  = params;

    // request                  
    //    .post('http://localhost:4000/stkmonedasmodificar/'+monedas.idStkMonedas)
    //    .set('Content-Type', 'application/json')

    // //    .send({ idtipomonedas: this.state.idtipomonedas})
    //    .send({ StkMonedasDescripcion: params.StkMonedasDescripcion})
    //    .send({ StkMonedasCotizacion: params.StkMonedasCotizacion})
    //    .set('X-API-Key', 'foobar')
    //    .then(function(res) {
    //   // res.body, res.headers, res.status
    //     });

    //     //this.getproveedores();
    //  }


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


    componentWillUnmount() {
        this.setState({ state: this.state });
    }
    componentDidMount() {
        this.read()
    }

    search = (event) => {
        var name = event.target.name
        var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
        this.setState({ filtered: value })
    }

    // <input onChange={this.search} type="text" value={this.state.filtered}/>

    render() {
        // Agrego el campo del Boton BORRAR
        console.log("Rubro para ver codigos :")
        console.log(this.state.rubro[0])
        var rubro = this.state.rubro.map((rowData, index) =>
            Object.assign(rowData, {
                borrar:
                    <div className="center-align"><StkRubroBorrar idrubro={rowData.idStkRubro} idgrupo={rowData.StkRubroCodGrp} read={() => this.read()}></StkRubroBorrar></div>
            })
        );

        // Agrego el filtrado de datos
        // var filtrado =  this.state.rubro.filter((rubro)=>{
        //     var row = `moneda.${this.state.campo}`
        //     // const campo = this.state.campo
        //     console.log("Contenido de ROW : "+row)
        //     console.log("Contenido de row.this.state.campo : ")
        //     console.log("contenido de campo : ",this.state.campo)

        //     console.log("tipo row ",typeof(row))
        //     // return( 
        //         // moneda.idStkMonedas.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 || 
        //         // moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        //     // )
        // })

        var columns = [
            {
                Header: "Rubro(ID)",
                accessor: "idStkRubro",
                tipo: "numero"
            },
            {
                Header: "Grupo",
                accessor: "StkGrupoDesc",
                tipo: "numero"
            },
            {
                Header: "Descripcion",
                accessor: "StkRubroDesc",
                tipo: "numero"
            },
            {
                Header: "Abreviatura",
                accessor: "StkRubroAbr",
                tipo: "numero"
            },
            {
                Header: "Proveedor",
                accessor: "ProveedoresDesc",
                tipo: "numero"
            },
            {
                Header: "Ancho",
                accessor: "StkRubroAncho",
                tipo: "numero"
            },
            {
                Header: "Presentacion",
                accessor: "StkRubroPres",
                tipo: "numero"
            },
            {
                Header: "Unidad De Medida",
                accessor: "StkRubroUM",
                tipo: "numero"
            },
            {
                Header: "Costo",
                accessor: "StkRubroCosto",
                tipo: "numero"
            },
            {
                Header: "Moneda",
                accessor: "StkRubroTM",
                tipo: "numero"
            },
            {
                Header: "",
                accessor: "borrar",
                tipo: ""
            },
        ]
        return (
            <div>
                <h1>ABM DE RUBRO</h1>
                {/* <input onChange={this.search} type="text" value={this.state.filtered}/>  */}
                {this.state.toggle
                    ?
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkRubroAgregar click={() => this.toggle()} read={() => this.read()}> </StkRubroAgregar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {/* <p onClick={()=>this.toggle()} className='btn'>  AGREGAR MONEDAS </p> */}
                        <Button onClick={() => this.toggle()} variant="contained" color="primary">AGREGAR RUBRO</Button>
                        {/* <Button variant="fab" color="primary" aria-label="Add" className={this.state.fab}>
                 <AddIcon /> </Button> */}
                        <input onChange={this.search} type="text" value={this.state.filtered} />
                    </div>
                }
                {/* Muestro contenido */}
                {!this.state.toggle
                    ?
                    <Paper >
                        <Table >
                            <TableHead>
                                {/* <TableRow>
                                        <CustomTableCell onClick={() => this.sortBy("idStkMonedas")} >Código</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("StkMonedasDescripcion")} >Descripción</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("StkMonedasCotizacion")} numeric>Cotización</CustomTableCell>
                                        <CustomTableCell ></CustomTableCell>
                                    </TableRow> */}
                                <TableRow>
                                    {
                                        columns.map((row, index) => {
                                            return (<CustomTableCell key={index} onClick={() => this.sortBy(row.accessor, row.tipo)} >{row.Header}</CustomTableCell>)
                                        })
                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody>

                                {rubro.map(row => {
                                    return (
                                        // <TableRow key={row.idStkRubro} 
                                        <TableRow key={row.StkRubroAbr}
                                            onDoubleClick={()=>{
                                            // console.log("actualizo variables")
                                            // this.setState({idStkMonedas:row.idStkMonedas})
                                            // this.setState({StkMonedasDescripcion:row.StkMonedasDescripcion})
                                            // this.setState({StkMonedasCotizacion:row.StkMonedasCotizacion})
                                                
                                                this.setState({idStkRubro : row.idStkRubro})
                                                this.setState({StkGrupoDesc : row.StkGrupoDesc})
                                                this.setState({StkRubroDesc : row.StkRubroDesc})
                                                this.setState({StkRubroAbr : row.StkRubroAbr})
                                                this.setState({ProveedoresDesc : row.ProveedoresDesc})
                                                this.setState({StkRubroAncho : row.StkRubroAncho})
                                                this.setState({StkRubroPres : row.StkRubroPres})
                                                this.setState({StkRubroUM : row.StkRubroUM})
                                                this.setState({StkRubroCosto : row.StkRubroCosto})
                                                this.setState({StkRubroTM : row.StkRubroTM})
                                        
                                                this.togglemodificar()}
                                            }
                                        >
                                            <CustomTableCell>{row.idStkRubro}</CustomTableCell>
                                            <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroAbr}</CustomTableCell>
                                            <CustomTableCell>{row.ProveedoresDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroAncho}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroPres}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroUM}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroCosto}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroTM}</CustomTableCell>
                                            <CustomTableCell>{row.borrar}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    :
                    <div></div>
                }
                {this.state.togglemodificar
                    ?
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkRubroModificar 
                                            clickmodificar={()=>this.togglemodificar()} 
                                            read={()=>this.read()}

                                            idStkRubro={this.state.idStkRubro}
                                            StkGrupoDesc={this.state.StkGrupoDesc}
                                            StkRubroDesc={this.state.StkRubroDesc}
                                            StkRubroAbr={this.state.StkRubroAbr}
                                            ProveedoresDesc={this.state.ProveedoresDesc}
                                            StkRubroAncho={this.state.StkRubroAncho}
                                            StkRubroPres={this.state.StkRubroPres}
                                            StkRubroUM={this.state.StkRubroUM}
                                            StkRubroCosto={this.state.StkRubroCosto}
                                            StkRubroTM={this.state.StkRubroTM}
                                            borrar={this.state.borrar}
                                        >
                                        
                                    </StkRubroModificar>
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

export default StkRubro	