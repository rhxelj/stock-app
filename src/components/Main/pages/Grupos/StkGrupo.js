import React, { Component} from 'react'
import request from 'superagent'

import { withStyles } from '@material-ui/core/styles';
import '../../../../Styles/TableHeader.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StkGrupoAgregar from './StkGrupoAgregar'
import StkGrupoBorrar from './StkGrupoBorrar'
import StkGrupoModificar from './StkGrupoModificar'

import StkFab from '../../../lib/StkFab'

import IpServidor from '../VariablesDeEntorno'

    // Estilo para el botón de borrar
    const style = {
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




class StkGrupo extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            idStkGrupo:0,
            StkGrupoDesc:'',
            StkGrupoAbr: '',
            StkGrupoContRubro:0,
            grupos:[],
            toggle_agregar: false,
            toggle_busqueda: false,
            toggle_modificar: false,
            filtered:'',
            direction: 'asc',
        }
        this.toggle = this.toggle.bind(this);
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
    


//  *********************************************** Cosas a agregar para la funcion de Busqueda Begin ***************************************************

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

    
//*************************************************** Cosas a agregar para la funcion de Busqueda End **********************************************************
    

// Cosas a agregar para la funcion de Ordenar (SortBy) Begin ***************************************************************************************************

    // Funcion ordernar - Begin 

    sortBy(key) {
        this.setState({
            grupos: this.state.grupos.sort((a, b) =>
                this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
            ),
            direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
        });
    }

// Funcion ordernar - End 


// Cosas a agregar para la funcion de Ordenar (SortBy) End ******************************************************************************************************



//Read
    leestkgrupo = _ => {
        const url = IpServidor + '/stkgrupoleer'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const grupos = JSON.parse(res.text)
            this.setState({grupos: grupos})
            })
    }
  
    
    toggle(event){
        this.setState(prevState => ({
        toggle: !prevState.toggle
        }))
    }
  
    componentDidMount(){
        this.leestkgrupo()
    }

      
    render(){
        // const grupos = 
        this.state.grupos.map( (rowData,index) => 
        // Object.assign(rowData, { borrar: <button className=" red accent-4" onClick={()=>this.deleteProduct(rowData.idStkMonedas)}>Borrar</button> })
        Object.assign(rowData, { borrar: 
            <StkGrupoBorrar idStkGrupo={rowData.idStkGrupo} leestkgrupo={()=>this.leestkgrupo()} read={()=>this.leestkgrupo()}></StkGrupoBorrar>})
        );


        //  Esto se agrega dentro de la funcion render 

        // Filtrado de datos - Begin 

        var grupos = this.state.grupos.filter((grupo) => {
            return (
                // grupo.idStkGrupo.indexOf(this.state.filtered) !== -1 ||
                grupo.StkGrupoDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })
        // Filtrado de datos - End  



        var columns =[
            {
                Header: "Grupo(ID)",
                accessor: "idStkGrupo",
                order: true,
            },
            {
                Header: "Descripcion",
                accessor: "StkGrupoDesc",
                order: true,  
            },
            {
                Header: "Abreviatura",
                accessor: "StkGrupoAbr",
                order: true, 
            },
            {
                Header: "Contador de Rubro",
                accessor: "StkGrupoContRubro",
                order: true, 
            },
            
            {
                Header: "",
                accessor: "borrar",
                tipo:""  
            },
        ]

        return( 
            <div>
                {/* <h1>ABM DE GRUPOS</h1> */}
                <Grid container>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                        <h1>ABM DE GRUPOS</h1>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                </Grid>
                
                {this.state.toggle_agregar && // Muestra el componente agregar 
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    <StkGrupoAgregar toggleAgregar={this.toggleAgregar} leestkgrupo={()=>this.leestkgrupo()} read={()=>this.leestkgrupo()}> </StkGrupoAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
               

               {!this.state.toggle_agregar && // Muestra la tabla de Grupo
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <CustomTableCell className="headerFijo"></CustomTableCell>
                                {
                                    columns.map((row, index) => {
                                    return (<CustomTableCell className="headerFijo" key={index} onClick={() => { return row.order && this.sortBy(row.accessor) }} >{row.Header}</CustomTableCell>)
                                    })
                                }
                            </TableRow>
                        </TableHead>
                    
                        <TableBody>
                            {grupos.map(row => {
                            return (
                                <TableRow key={row.idStkGrupo} 
                                    onDoubleClick={()=>{
                                    console.log("actualizo variables")
                                    this.setState({idStkGrupo:row.idStkGrupo})
                                    this.setState({StkGrupoDesc:row.StkGrupoDesc})
                                    this.setState({StkGrupoAbr:row.StkGrupoAbr})
                                    this.setState({StkGrupoContRubro:row.StkGrupoContRubro})
                                    this.toggleModificar()}}
                                    >
                                    <CustomTableCell style= {style}>{row.borrar}</CustomTableCell>
                                    <CustomTableCell>{row.idStkGrupo}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoAbr}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoContRubro}</CustomTableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                }

                {/* Llama al componente ModificarGrupo */}

                {this.state.toggle_modificar &&
                                
                                <div>
                                    <div className="row">
                                        <div className="col s12 ">
                                            <div className="">
                                                <div className="card-content  black-text">
                                                    <StkGrupoModificar
                                                        toggleModificar={this.toggleModificar}
                                                        read={() => this.leestkgrupo()}
                                                        idStkGrupo={this.state.idStkGrupo}
                                                        StkGrupoDesc={this.state.StkGrupoDesc}
                                                        StkGrupoAbr={this.state.StkGrupoAbr}        
                                                        StkGrupoContRubro={this.state.StkGrupoContRubro}
                                                        
                                                        // idStkMonedas={this.state.idStkMonedas}
                                                        // StkMonedasDescripcion={this.state.StkMonedasDescripcion}
                                                        // StkMonedasCotizacion={this.state.StkMonedasCotizacion}
                                                    >

                                                    </StkGrupoModificar>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            }


        {/* FAB BEGIN  */} {/* Muestra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

                <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />

        {/* FAB END */}
            </div>
        )
    }
}

export default withStyles(styles)(StkGrupo)