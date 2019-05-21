import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'

import orderBy from 'lodash/orderBy'

import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';

import StkMonedasAgregar from './StkMonedasAgregar'
import StkMonedasBorrar from './StkMonedasBorrar'
import StkMonedasModificar from './StkMonedasModificar'

// para usar las tablas de MUI start
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search'

// import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

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
    fab: {
        position: 'absolute',
        // bottom: theme.spacing.unit * 2,
        // right: theme.spacing.unit * 2,
        bottom: '100px',
        right: '100px',
        background:"red",
      },
      icon: {
        margin: theme.spacing.unit,
        fontSize: 32,
      },
  });

// para usar las tablas de MUI end

class Monedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor + '/stkmonedasleer',
            toggle: false,
            togglemodificar:false,
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion: 0,
            monedas:[],
            filtered:'',
            campo: 'idStkMonedas',
            fab: {
                position: 'absolute',
                bottom: '50px',
                right: '50px',
              },
            //   direction: 'asc'
            direction:{},
            busqueda: false

            
        }

        this.toggle = this.toggle.bind(this);
        this.togglemodificar = this.togglemodificar.bind(this);
        
        const { classes } = props; // ver si se puede borra es para insertar iconos
    }    
   
//******************************************* Funcion ordernar - Begin *******************************************

    sortBy(key) {
        this.setState({
          monedas: this.state.monedas.sort((a, b) =>
            this.state.direction[key] === "asc" 
                ?  
                    a[key] < b[key] 
                    ?
                     1
                    :
                     -1
                : 
                    a[key] > b[key]
                    ?
                    1
                   :
                    -1
          ),
          direction: {
            [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
          }
        });
      }

//******************************************* Funcion ordernar - End *******************************************
    
//Read
    read = _ => {
        const url = IpServidor + '/stkmonedasleer'
        request
        .get(url)                            
        .set('Content-Type', 'application/json')
            .then(res=> {
            const monedas = JSON.parse(res.text)
            // this.setState({monedas: monedas})
            this.setState({ monedas })
            })
    }
      
//******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

    toggle(event){                      // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
        this.setState(prevState => ({
        toggle: !prevState.toggle
        }))
    }


    
    togglemodificar(event){             // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***  
        // this.toggle()
        this.setState(prevState => ({
        togglemodificar: !prevState.togglemodificar
        }))
        
    }

//******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************
 
toggleBusqueda(event){                      // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
this.setState(prevState => ({
busqueda: !prevState.busqueda
}))
}


    search=(event)=>{                       // Funcion de busqueda
        // var name  = event.target.name
        var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
        this.setState({filtered: value})
    }
    
    // <input onChange={this.search} type="text" value={this.state.filtered}/>
    
    componentWillUnmount(){
        this.setState({ state: this.state });
    }
    
    componentDidMount(){
        this.read()
    }
    

    render(){

// Agrego el campo del Boton BORRAR
    // var monedas = this.state.monedas.map( (rowData,index) => 
    //     Object.assign(rowData, { borrar: 
    //         <div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={()=>this.read()}></StkMonedasBorrar></div>})
    //     );

    this.state.monedas.map( 
        (rowData,index) => 
            Object.assign(rowData, { borrar:<div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={()=>this.read()}></StkMonedasBorrar></div>})
    );

// ******************************************* Filtrado de datos - Begin *******************************************

    var filtrado =  this.state.monedas.filter((moneda)=>{
            return( 
                moneda.idStkMonedas.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 || 
                moneda.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })

// ******************************************* Filtrado de datos - end  *******************************************

var columns =[
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


    return( 
            <div>
                <Grid container>
                    <Grid item xs={12} sm={12} lg={12}>
                        <h1>ABM DE Monedas</h1>

                        

                    </Grid>
                </Grid>
                {this.state.toggle
                ? 
                // Muestra el Componente AgregarMonedas 
                <div>
                    
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  black-text">
                                    <StkMonedasAgregar click={()=>this.toggle()} read={()=>this.read()}> </StkMonedasAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                // Boton Agregar 
                <div>
                    {/* <Button onClick={()=>this.toggle()} variant="contained" color="primary">AGREGAR MONEDAS</Button> */}
                
                {/* muestra cuadro para filtrado */}
                    {/* <input onChange={this.search} type="text" value={this.state.filtered}/> */}
                
                        </div>
                }
 
                {!this.state.toggle
                ?
                // Muestar la tabla de Monedas
                        <Paper >
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        {columns.map((row, index) => {
                                            return (<CustomTableCell key={index} onClick={()=>{return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
                                        })
                            }
                                        <CustomTableCell ></CustomTableCell>
                                    </TableRow>
                                </TableHead>
                             
                                <TableBody>
                                    {filtrado.map(row => {
                                    return (
                                        <TableRow key={row.idStkMonedas} 
                                            onDoubleClick={()=>{
                                                this.setState({idStkMonedas:row.idStkMonedas})
                                                this.setState({StkMonedasDescripcion:row.StkMonedasDescripcion})
                                                this.setState({StkMonedasCotizacion:row.StkMonedasCotizacion})

                                                this.togglemodificar()
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
                        :
                    <div></div>
                }
                {this.state.togglemodificar
                    ?  
                    //Llama al componente ModificarMonedas
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                    <StkMonedasModificar 
                                        clickmodificar={()=>this.togglemodificar()} 
                                        read={()=>this.read()}
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
                   :
                    <div></div>    
                }
                <Fab 
                    onClick={()=>this.toggle()} 
                    color="primary" 
                    aria-label="Add" 
                    style={{ 
                        "position" : "fixed",
                        "bottom": "10px",
                        "right": "25px",}}
                >
                    <AddIcon />
                </Fab>
                <Fab 
                    onClick={()=>this.toggleBusqueda()} 
                    color="primary" 
                    aria-label="Search" 
                    style={{ 
                        "position" : "fixed",
                        "bottom": "70px",
                        "right": "25px",}}
                >
                    <SearchIcon />
                   
                
                </Fab>
                <div style={{ 
                        "position" : "fixed",
                        "bottom": "135px",
                        "right": "25px",}}>    
                    {/* {this.state.busqueda && <input onChange={this.search} type="text" value={this.state.filtered}/>} */}
                    {this.state.busqueda && <InputBase style={{background:"grey"}} placeholder="Texto de Busqueda" onChange={this.search} type="text" value={this.state.filtered}/>}

                    
                </div>
            </div>
        )
    }
}

export default Monedas	