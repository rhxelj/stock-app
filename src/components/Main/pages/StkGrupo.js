import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import StkGrupoAgregar from './StkGrupoAgregar'
import StkGrupoBorrar from './StkGrupoBorrar'

import StkFab from '../../lib/StkFab'

import IpServidor from './VariablesDeEntorno'

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
            toggle: false,
            idStkGrupo:0,
            StkGrupoDesc:'',
            StkGrupoAbr: '',
            StkGrupoContRubro:0,
            grupos:[],
        }
        this.toggle = this.toggle.bind(this);
    }    
    
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
        const grupos = this.state.grupos.map( (rowData,index) => 
        // Object.assign(rowData, { borrar: <button className=" red accent-4" onClick={()=>this.deleteProduct(rowData.idStkMonedas)}>Borrar</button> })
        Object.assign(rowData, { borrar: 
            <div className="center-align"><StkGrupoBorrar idStkGrupo={rowData.idStkGrupo} leestkgrupo={()=>this.leestkgrupo()} read={()=>this.leestkgrupo()}></StkGrupoBorrar></div>})
            // <button 
            //     className=" red accent-4" 
            //     onClick={this.funcionTest}
            //     >
            //     Borrar
            // </button> })
        );


        var columns =[
            {
                Header: "Grupo(ID)",
                accessor: "idStkGrupo",
                tipo:"numero"  
            },
            {
                Header: "Descripcion",
                accessor: "StkGrupoDesc",
                tipo:"numero"  
            },
            {
                Header: "Abreviatura",
                accessor: "StkGrupoAbr",
                tipo:"numero"  
            },
            {
                Header: "Contador de Rubro",
                accessor: "StkGrupoContRubro",
                tipo:"numero"  
            },
            
            {
                Header: "",
                accessor: "borrar",
                tipo:""  
            },
        ]

        return( 
            <div>
                <h1>ABM DE GRUPOS</h1>
                
                {this.state.toggle &&
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    <StkGrupoAgregar click={()=>this.toggle()} leestkgrupo={()=>this.leestkgrupo()} read={()=>this.leestkgrupo()}> </StkGrupoAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
               

               {!this.state.toggle &&
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
                            {grupos.map(row => {
                            return (
                                <TableRow key={row.idStkGrupo} 
                                    // onDoubleClick={()=>{
                                    // console.log("actualizo variables")
                                    // this.setState({idStkMonedas:row.idStkMonedas})
                                    // this.setState({StkMonedasDescripcion:row.StkMonedasDescripcion})
                                    // this.setState({StkMonedasCotizacion:row.StkMonedasCotizacion})
                                    // this.togglemodificar()}}
                                    >
                                    <CustomTableCell>{row.idStkGrupo}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoAbr}</CustomTableCell>
                                    <CustomTableCell>{row.StkGrupoContRubro}</CustomTableCell>
                                    <CustomTableCell>{row.borrar}</CustomTableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                }
        {/* FAB BEGIN  */} {/* Muestra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

                <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />

        {/* FAB END */}
            </div>
        )
    }
}

export default withStyles(styles)(StkGrupo)