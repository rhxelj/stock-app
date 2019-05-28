import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'

import StkUnMedAgregar from './StkUnMedAgregar'
import StkUnMedBorrar from './StkUnMedBorrar'


import IpServidor from './VariablesDeEntorno'
import StkFab from '../../lib/StkFab'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles'; 


// import Button from '@material-ui/core/Button';
// import StkMonedasAgregar from './StkMonedasAgregar'
// import StkMonedasBorrar from './StkMonedasBorrar'
// import StkMonedasModificar from './StkMonedasModificar'
// import Button from '@material-ui/core/Button';



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

class UnidadMedidas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor,
            toggle_agregar: false,
            toggle_busqueda: false,
            toggle_modificar: false,
            filtered:'',
            idStkUnMed:'',
            StkUnMedDesc:'',
            unidad_medidas:[]
        }
        // this.renderEditable = this.renderEditable.bind(this)
        // this.toggle = this.toggle.bind(this);
        // this.funcionTest = this.funcionTest.bind(this);
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
    
    
    
    
    
    //Read
    read = _ => {
        const url = IpServidor + '/stkunmedleer'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const unidad_medidas = JSON.parse(res.text)
            this.setState({unidad_medidas})
            })
    }

    // //Update
    ActualizaUnMed = (params) => {
     
        const  datos  = params;
     
    request                  
       .post(this.state.url + '/stkunmedmodificar/' + datos.idStkUnMed)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkUnMedDesc: params.StkUnMedDesc})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
     }
    
    //  deleteProduct = (id)=> {
        
    //     //       const { moneda } = this.state;
    //            request
    //              .delete('http://localhost:4000/borrarmonedas/'+id)
    //              .set('Content-Type', 'application/json')
    //              //.set('X-API-Key', 'foobar')
    //              .then(function(res) {
    //            // res.body, res.headers, res.status
    //              })
    //              .catch(err => {
    //                 if (err.status === 411) 
    //                         {
    //                         alert('Código de Moneda Usado no se puede borrar  ') 
    //                         }
    //                     })
    //              //alert("Borrado")
    //             //  this.toggle()
    //              this.read()
    //          }
    
    toggle(event){
        this.setState(prevState => ({
        toggle: !prevState.toggle
        }))
    }
    
    // componentWillUnmount(){
    //     this.read()
    // }
   
    componentDidMount(){
        this.read()
    }
    
    // renderEditable(cellInfo) {
    //     return (
    //       <div
    //         style={{ backgroundColor: "#fafafa" }}
    //         contentEditable
    //         suppressContentEditableWarning
    //         onBlur={e => {
    //           const datos = [...this.state.datos]
    //           datos[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
    //           this.setState({ datos })
    //           this.ActualizaUnMed(cellInfo.original)
    //         }}
    //         dangerouslySetInnerHTML={{
    //           __html: this.state.datos[cellInfo.index][cellInfo.column.id]
    //         }}
    //       />
    //     )
    //   }


    //   funcionTest(){ 
    //     alert('ggggg')
        
    //   }

    render(){
        //************************************** Agrego el campo del Boton BORRAR - Begin *********************************
        this.state.unidad_medidas.map( (rowData,index) => 
            Object.assign(rowData, { 
                borrar: 
                    <div className="center-align"><StkUnMedBorrar id={rowData.idStkUnMed} read={()=>this.read()}></StkUnMedBorrar></div>})
        );
        //************************************** Agrego el campo del Boton BORRAR - End ***********************************  

       // ******************************************* Filtrado de datos - Begin *******************************************

        var unidad_medidas = this.state.unidad_medidas.filter((unmed) => { //este proveedores no es el proveedores de this.state.proveedores es una copia local
            return (
            unmed.idStkUnMed.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 
            // ||
            // proveedor.ProveedoresTipo.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            // ||
            // proveedor.ProveedoresCUIT.indexOf(this.state.filtered) !== -1 
            // ||
            // proveedor.ProveedoresCalle.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            // ||
            // proveedor.ProveedoresCalle.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
            )
        })

    // ******************************************* Filtrado de datos - end  *******************************************    
      
    var columns = [
        {
            Header: "Código",
            accessor: "idStkUnMed",
            // tipo:"texto",
            order: true,
        },
        {
            Header: "Descripción",
            accessor: "StkUnMedDesc",
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
                        <h1>ABM DE UnidadMedidas</h1>
                    </Grid>
                </Grid>

                {/* Muestra el Componente Unidad de Medidas  */}

                {this.state.toggle_agregar &&
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        <StkUnMedAgregar toggleAgregar={this.toggleAgregar} read={this.read}> </StkUnMedAgregar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                }

                {/* Muestar la tabla de Unidad de Medidas */}

                {!this.state.toggle_agregar &&
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
                                {unidad_medidas.map(row => {
                                    return (
                                        <TableRow className={this.props.classes.row} key={row.idStkUnMed}
                                            onDoubleClick={() => {
                                                this.setState({ idStkUnMed: row.idStkUnMed })
                                                this.setState({ StkUnMedDesc: row.StkUnMedDesc })

                                                this.toggleModificar()
                                            }}
                                        >

                                            <CustomTableCell>{row.idStkUnMed}</CustomTableCell>
                                            <CustomTableCell>{row.StkUnMedDesc}</CustomTableCell>
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
                    // ?  
                    //Llama al componente ModificarMonedas
                    <div>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="">
                                    <div className="card-content  black-text">
                                        {/* <StkMonedasModificar
                                            toggleModificar={this.toggleModificar}
                                            read={() => this.read()}
                                            idStkUnMed={this.state.idStkUnMed}
                                            StkUnMedDesc={this.state.StkUnMedDesc}
                                            StkMonedasCotizacion={this.state.StkMonedasCotizacion}
                                        >

                                        </StkMonedasModificar> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    //    :
                    //     <div></div>    
                }

                {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}
                <StkFab borraFiltered={this.borraFiltered} toggleAgregar={this.toggleAgregar} toggleBusqueda={this.toggleBusqueda} toggle_busqueda={this.state.toggle_busqueda} search={this.search} filtered={this.state.filtered} />

            </div>
            // <div>
            //     {/* <BorrarMonedas ></BorrarMonedas> */}
            //     <h1>ABM DE UnidadMedidas</h1>
                
                
            //     {this.state.toggle
            //     ?
            //     <div>
            //         <div className="row">
            //             <div className="col s12 ">
            //                 <div className="">
            //                     <div className="card-content  black-text">
            //                         <StkUnMedAgregar click={()=>this.toggle()} read={()=>this.read()}> </StkUnMedAgregar>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     :
            //     // <p onClick={()=>this.toggle()} className='btn'>AGREGAR datos</p>
            //     <Button onClick={()=>this.toggle()} variant="contained" color="primary">AGREGAR MEDIDAS</Button>
            //     }
            //    {!this.state.toggle 
            //    ? 
            //     <ReactTable
            //             data={datosTabla}

            //             filterable
            //             defaultSorted={[
            //                 {
            //                     id: "codigo",
            //                     desc: true
            //                 }
            //             ]}

            //             columns={[
            //                  {                   
            //                 columns: [
            //                         {
            //                         Header: "Código",
            //                         id:"codigo",
            //                         accessor: "idStkUnMed"
                                    
            //                         },
            //                         {
            //                         Header: "Descripción",
            //                         accessor: "StkUnMedDesc",
            //                         Cell: this.renderEditable
            //                         },
            //                         {
            //                             Header: "",
            //                             accessor: "borrar",
            //                             // Cell: this.renderEditable
            //                         }
                                        
                                    
            //                 ]
            //             }                
                            
            //             ]}
            //             defaultPageSize={20}
            //             className="-striped -highlight"
            //         />
            //         :
            //         <div></div>}
            //     </div>
        )
    }
}

export default withStyles(styles)(UnidadMedidas)