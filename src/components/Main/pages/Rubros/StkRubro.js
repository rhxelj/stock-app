import React, { Component } from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from '../VariablesDeEntorno'

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';

// import StkMonedasAgregar from './StkMonedasAgregar'
// import StkMonedasBorrar from './StkMonedasBorrar'
// import StkMonedasModificar from './StkMonedasModificar'
import StkFab from '../../../lib/StkFab'

import StkRubroAgregar from './StkRubroAgregar'
import StkRubroBorrar from './StkRubroBorrar'
import StkRubroModificar from './StkRubroModificar'

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
    marginLeft:'15px',
    padding:'0px',
    width:'100px'
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

class StkRubro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // url: IpServidor + '/stkrubroleermezcla',
            toggle: false,
            togglemodificar: false,
            idStkRubro: '',
            StkMonedasDescripcion: '',
            StkMonedasCotizacion: 0,
            rubro: [],
            toggle_agregar: false,
            toggle_busqueda: false,
            toggle_modificar: false,
            filtered:'',
            campo: 'idStkRubro',
            direction: { // direccion del ordenamiento asc o des
            }

        }
     
    }

    //Read
    read = _ => {
        const url = IpServidor + '/stkrubroleermezcla'; //'http://192.168.2.102:4000/indexprov'

        request
            .get(url)
            .set('Content-Type', 'application/json')
            .then(res => {
                const rubro = JSON.parse(res.text)
                this.setState({ rubro: rubro }, () => {
                    console.log(`Rubro :`)
                    console.log(this.state.rubro)
                })
            })
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


// Cosas a agregar para la funcion de Ordenar (SortBy) Begin ***************************************************************************************************

    // Funcion ordernar - Begin 

    sortBy(key) {
        this.setState({
            rubro: this.state.rubro.sort((a, b) =>
                this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
            ),
            direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
        });
    }

// Funcion ordernar - End 


// Cosas a agregar para la funcion de Ordenar (SortBy) End ******************************************************************************************************



//******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

toggleAgregar = () =>{            
    this.setState(prevState => ({
        toggle_agregar: !prevState.toggle_agregar
    })) // estado inicial "FALSE" muestra la tabla de "rubro"  en "TRUE" llama al componente *** <StkRubroAgregar> ***
}

toggleModificar = () =>{          
    this.setState(prevState => ({
        toggle_modificar: !prevState.toggle_modificar
    })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <StkRubroModificar> ***  
}

toggleBusqueda = () => {
    this.setState(prevState => ({
        toggle_busqueda: !prevState.toggle_busqueda
    }))
}

// Cosas a agregar para la funcion de Busqueda Begin **************************************************************************************************

    // Funcion De Busqueda - Begin

    search = (event) => {                       // Funcion de busqueda
        // var name  = event.target.name
        var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
        this.setState({ filtered: value })
    }

// Funcion De Busqueda - End.

// Opcion para borrar contenido del cuadro de busqueda - BEGIN    
    
    borraFiltered = ()=> {
        this.setState({ filtered: '' })
    }

// Opcion para borrar contenido del cuadro de busqueda - END

    

// Cosas a agregar para la funcion de Busqueda End *******************


//******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************



    // toggle(event) {
    //     this.setState(prevState => ({
    //         toggle: !prevState.toggle
    //     }))
    // }

    // togglemodificar(event) {
    //     this.toggle()
    //     this.setState(prevState => ({
    //         togglemodificar: !prevState.togglemodificar
    //     }))

    // }


    componentWillUnmount() {
        this.setState({ state: this.state });
    }
    componentDidMount() {
        this.read()
    }

    // search = (event) => {
    //     var name = event.target.name
    //     var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    //     this.setState({ filtered: value })
    // }

    // <input onChange={this.search} type="text" value={this.state.filtered}/>

    render() {
        // Agrego el campo del Boton BORRAR
            // var rubro = this.state.rubro.map((rowData, index) =>
            this.state.rubro.map((rowData, index) =>
                Object.assign(rowData, {
                    borrar:
                        <StkRubroBorrar idStkRubro={rowData.idStkRubro} StkRubroCodGrp={rowData.StkRubroCodGrp} read={() => this.read()}></StkRubroBorrar>
            })
        );

        // Filtrado de datos - Begin 

            var rubro = this.state.rubro.filter((rbr) => {
                return (
                    rbr.StkGrupoDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 
                    // || 
                    // moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
                )
            })
        // Filtrado de datos - End  

      
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
                accessor: "StkRubroPresDes",
                tipo: "texto"
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
                {/* <h1>ABM DE RUBRO</h1> */}
                <Grid container>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                        <h1>ABM DE RUBRO</h1>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                </Grid>
                {/* <input onChange={this.search} type="text" value={this.state.filtered}/>  */}
                {this.state.toggle_agregar
                    ?
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkRubroAgregar toggleAgregar={this.toggleAgregar} read={() => this.read()}> </StkRubroAgregar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        {/* <p onClick={()=>this.toggle()} className='btn'>  AGREGAR MONEDAS </p> */}
                        {/* <Button onClick={() => this.toggle()} variant="contained" color="primary">AGREGAR RUBRO</Button> */}
                        {/* <Button variant="fab" color="primary" aria-label="Add" className={this.state.fab}>
                         <AddIcon /> </Button> */}
                        {/* <input onChange={this.search} type="text" value={this.state.filtered} /> */}
                    </div>
                }
                {/* Muestro contenido */}
                {!this.state.toggle_agregar
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
                                    <CustomTableCell className="headerFijo" ></CustomTableCell>
                                    {
                                        columns.map((row, index) => {
                                            return (<CustomTableCell className="headerFijo"  key={index} onClick={() => this.sortBy(row.accessor, row.tipo)} >{row.Header}</CustomTableCell>)
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
                                                this.setState({idStkRubro : row.idStkRubro})
                                                this.setState({StkRubroCodGrp : row.StkRubroCodGrp})
                                                this.setState({StkRubroDesc : row.StkRubroDesc})
                                                this.setState({StkRubroAbr : row.StkRubroAbr})
                                                this.setState({StkRubroProv : row.StkRubroProv})//id
                                                this.setState({StkRubroAncho : row.StkRubroAncho})
                                                this.setState({StkRubroPresDes : row.StkRubroPresDes})
                                                this.setState({StkRubroPres : row.StkRubroPres})
                                                this.setState({StkRubroUM : row.StkRubroUM})
                                                this.setState({StkRubroCosto : row.StkRubroCosto})
                                                // this.setState({ProveedoresDesc : row.ProveedoresDesc})
                                                
                                                // this.setState({StkGrupoDesc : row.StkGrupoDesc})
                                                this.setState({StkRubroTM : row.StkRubroTM})
                                                
                                                this.toggleModificar()}
                                            }
                                        >
                                            {/* {console.log('presdes en rubro : ',row.StkRubroPresDes)} */}
                                            <CustomTableCell style={style}>{row.borrar}</CustomTableCell>
                                            <CustomTableCell>{row.idStkRubro}</CustomTableCell>
                                            <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroAbr}</CustomTableCell>
                                            <CustomTableCell>{row.ProveedoresDesc}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroAncho}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroPresDes}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroPres}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroUM}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroCosto}</CustomTableCell>
                                            <CustomTableCell>{row.StkRubroTM}</CustomTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                    :
                    <div></div>
                }
                {this.state.toggle_modificar
                    ?
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkRubroModificar 
                                            toggleModificar={this.toggleModificar} 
                                            read={()=>this.read()}

                                            idStkRubro={this.state.idStkRubro}
                                            StkRubroCodGrp={this.state.StkRubroCodGrp}
                                            StkRubroDesc={this.state.StkRubroDesc}
                                            StkRubroAbr={this.state.StkRubroAbr}
                                            StkRubroProv={this.state.StkRubroProv}
                                            StkRubroAncho={this.state.StkRubroAncho}
                                            StkRubroPres={this.state.StkRubroPres}
                                            StkRubroPresDes={this.state.StkRubroPresDes}
                                            StkRubroUM={this.state.StkRubroUM}
                                            StkRubroCosto={this.state.StkRubroCosto}
                                            StkRubroTM={this.state.StkRubroTM}
                                            borrar={this.state.borrar}
                                            // ProveedoresDesc={this.state.ProveedoresDesc}
                                            // StkGrupoDesc={this.state.StkGrupoDesc}
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

{/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

                <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />
            </div>
        )
    }
}

export default StkRubro	