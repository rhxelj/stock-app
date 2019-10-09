import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import { withStyles } from '@material-ui/core/styles';
import '../../../../Styles/TableHeader.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import StkFab from '../../../lib/StkFab'

import StkItemsAgregar from './StkItemsAgregar'
import StkItemsBorrar from './StkItemsBorrar'
import StkItemsModificar from './StkItemsModificar'
import Grid from '@material-ui/core/Grid';
// import orderBy from 'lodash/orderBy'
import SelecCampos from '../Impresion/SelecCampos'

import IpServidor from '../VariablesDeEntorno'
// Estilo para el botón de borrar
const style = {
    padding:'0px',
    width:'100px'
};

// Estilos Inicio
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
// Estilos Fin 



class StkItems extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            togglemodificar:false,
            idStkItems:0,
            StkItemsGrupo:0,
            StkItemsRubro:0,
            StkItemsDesc:'',
            StkItemsCantidad:0,
            StktemsFAct:'',
            StkItemsMin:0,
            StkItemsMax:0,
            items:[],       
            itemsdetalles:[],
            stkgrupoitem:[],
            toggle:{
                agregar: false,
                busqueda: false,
                modificar: false,
                seleccampos: false,  
            },
            toggle_agregar: false,
            toggle_busqueda: false,
            toggle_modificar: false,
            filtered:'',
            direction: 'asc',
        }
        this.toggle = this.toggle.bind(this);
    }    
    


//******************************************* Habilita el contenido a mostrar en Pantalla - Begin *******************************************

toggle = (arg) =>{            
    console.log("el argumento es :",arg)
    this.setState(prevState => ({
        toggle:{[arg]: !prevState.toggle[arg]}
    })) // estado inicial "FALSE" muestra la tabla de "..." en "TRUE" llama al componente <ComponenteParticular>
}


// toggleAgregar = () =>{            
//     this.setState(prevState => ({
//         toggle_agregar: !prevState.toggle_agregar
//     })) // estado inicial "FALSE" muestra la tabla de "monedas"  en "TRUE" llama al componente *** <AgregarMonedas> ***
// }

// toggleModificar = () =>{          
//     this.setState(prevState => ({
//         toggle_modificar: !prevState.toggle_modificar
//     })) // estado inicial "FALSE" no muestra nada  en "TRUE" llama al componente  *** <ModificarMonedas> ***  
// }

// toggleBusqueda = () => {
//     this.setState(prevState => ({
//         toggle_busqueda: !prevState.toggle_busqueda
//     }))
// }

//******************************************* Habilita el contenido a mostrar en Pantalla - End *******************************************



//*********************************************** Cosas a agregar para la funcion de Busqueda Begin ***************************************************

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



//********************************************* Cosas a agregar para la funcion de Busqueda End ****************************************************************


//********************************************* Cosas a agregar para la funcion de Ordenar (SortBy) Begin ******************************************************

    // Funcion ordernar - Begin 

    sortBy(key) {
        this.setState({
            items: this.state.items.sort((a, b) =>
                this.state.direction[key] === "asc" ? (a[key] < b[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1)
            ),
            direction: { [key]: this.state.direction[key] === "asc" ? "desc" : "asc" }
        });
    }

// Funcion ordernar - End 


//*********************************************** Cosas a agregar para la funcion de Ordenar (SortBy) End *******************************************************


    //Read
    leeStkItems = _ => {
        const url = IpServidor + '/stkitemsleer'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const items = JSON.parse(res.text)
            this.setState({items: items})
            })
    }
   
     //Read
     leeStkItemsDetalles = _ => {
        const url = IpServidor + '/stkitemsleedetalles'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const items = JSON.parse(res.text)
            this.setState({items: items})
            })
    }
    stkgrupoleercod = (id) => {
        const url = IpServidor + "/stkgrupoleercod/?id="+id;
        request
          .get(url)
          .set('Content-Type', 'application/json')
          .then(res=> {
            const stkgrupoitem = JSON.parse(res.text);
            this.setState(()=>{ return {stkgrupoitem: stkgrupoitem[0]}}); //saco el item del grupo
          })
        //   console.log(this.state.stkgrupoitem)
        //   console.log('StkGrupoDesc'+this.state.stkgrupoitem.StkGrupoDesc)
          return this.state.stkgrupoitem.StkGrupoDesc
        }
    // }
    

    toggle(event){
    // toogle = (event)=>{
        this.setState(prevState => ({
        toggle: !prevState.toggle
        }))
    }
   
    togglemodificar(event){
        this.toggle()
        this.setState(prevState => ({
        togglemodificar: !prevState.togglemodificar
        }))
        
    }

    componentDidMount(){
        // this.leeStkItems()
        this.leeStkItemsDetalles()
    }

      
    render(){
    
    // Agrego el campo del Boton BORRAR
        this.state.items.map( (rowData,index) => 
            Object.assign(rowData, { borrar: 
                // <div className="center-align"><StkItemsBorrar StkItem={[rowData.idStkItems,rowData.StkItemsGrupo,rowData.StkItemsRubro]} leeStkItems={()=>this.leeStkItems()} read={()=>this.leeStkItems()}></StkItemsBorrar></div>})
                <div className="center-align"><StkItemsBorrar idStkItems={rowData.idStkItems} StkItemsGrupo={rowData.StkItemsGrupo} StkItemsRubro={rowData.StkItemsRubro} leeStkItems={()=>this.leeStkItems()} read={()=>this.leeStkItems()}></StkItemsBorrar></div>})
        );
        // Tengo que hacer otro Object.assin para  StkItemsGrupo para mostrar la descripcion o lo hacemos desde el backend?    

            //  Esto se agrega dentro de la funcion render 

        // Filtrado de datos - Begin 

            var items = this.state.items.filter((item) => {
                return (
                    item.StkItemsDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1 
                    // ||
                    // item.StkItemsCantidad.indexOf(this.state.filtered) !== -1
                )
            })
        // Filtrado de datos - End  



// Encabezado de la Tabla
        var columns =[
            {
                Header: "Items(ID)",
                accessor: "idStkItems",
                tipo:"numero",
                order: true,
            },
            {
                Header: "Grupo",
                accessor: "StkItemsGrupo",
                tipo:"numero",
                order:true,  
            },
            {
                Header: "Rubro",
                accessor: "StkItemsRubro",
                tipo:"texto",
                order:true,  
            },
            {
                Header: "Descripción",
                accessor: "StkItemsDesc",
                tipo:"texto",
                order:true,  
            },
            {
                Header: "Cantidad",
                accessor: "StkItemsCantidad",
                tipo:"numero",
                order:true,  
            },
            {
                Header: "Cantidad Disponible",
                accessor: "StkItemsCantDisp",
                tipo:"numero",
                order:true,  
            },
            {
                Header: "Fecha de Actualización",
                accessor: "StktemsFAct",
                tipo:"texto",
                order:true,  
            },
            {
                Header: "Stock Mínimo",
                accessor: "StkItemsMin",
                tipo:"numero",
                order:true,  
            },
            {
                Header: "Stock Máximo",
                accessor: "StkItemsMax",
                tipo:"numero",
                order:true,  
            },
            // {
            //     Header: "Observaciones",
            //     accessor: "StkItemsObserv",
            //     tipo:"numero"  
            // },
            {
                Header: "",
                accessor: "borrar",
                tipo:""  
            },
        ]

        return( 
            <div>
                <Grid container>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                        <h1>ABM DE ITEMS</h1>
                    </Grid>
                    <Grid item xs={4} sm={4} lg={4}>
                    </Grid>
                </Grid>


                {this.state.toggle.agregar &&
                // Muestra el Componente AgregarItems 
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    {/* <StkItemsAgregar click={()=>this.toggle()} leeStkItemsDetalles={()=>this.leeStkItemsDetalles()} read={()=>this.leeStkItems()}> </StkItemsAgregar> */}
                                    <StkItemsAgregar toggleAgregar={()=>this.toggle("agregar")} leeStkItemsDetalles={()=>this.leeStkItemsDetalles()}> </StkItemsAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
               
                

               {!this.state.toggle.agregar &&
                // ?
                // Muestar la tabla de Items
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
                            <CustomTableCell  className="headerFijo" ></CustomTableCell>
                            {
                                columns.map((row, index) => {
                                // return (<CustomTableCell key={index} onClick={() => this.sortBy(row.accessor,row.tipo)} >{row.Header}</CustomTableCell>)
                                return (<CustomTableCell className="headerFijo"  key={index} onClick={()=>{return row.order && this.sortBy(row.accessor)}} >{row.Header}</CustomTableCell>)
                                // return (<CustomTableCell key={index} onClick={()=>{return row.order ? console.log('ordena '+row.accessor) :  console.log('No Ordena '+row.accessor)}} >{row.Header}</CustomTableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                 
                    <TableBody>
                        {items.map(row => {
                        return (
                            <TableRow key={row.StkItemsDesc} 
                                // Cargo las variables que voy a enviar a StkIemsModificar.js 
                                onDoubleClick={()=>{ 
                                    this.setState({idStkItems:row.idStkItems})
                                    this.setState({StkItemsGrupo:row.StkItemsGrupo})
                                    this.setState({StkGrupoDesc:row.StkGrupoDesc})
                                    this.setState({StkItemsRubro:row.StkItemsRubro})
                                    this.setState({StkRubroDesc:row.StkRubroDesc})
                                    this.setState({StkItemsDesc:row.StkItemsDesc})
                                    this.setState({StkItemsCantidad:row.StkItemsCantidad})
                                    this.setState({StkItemsCantDisp:row.StkItemsCantDisp})
                                    this.setState({StkItemsMin:row.StkItemsMin})
                                    this.setState({StkItemsMax:row.StkItemsMax})
                                    
                                    this.toggle("modificar")
                                }}
                            >
                                {/* {console.log("row ")} */}
                                {/* {console.log(row)} */}
                                <CustomTableCell style= {style}>{row.borrar}</CustomTableCell>
                                <CustomTableCell>{row.idStkItems}</CustomTableCell>
                                <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkRubroDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsCantidad}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsCantDisp}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsFAct}</CustomTableCell> 
                                <CustomTableCell>{row.StkItemsMin}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsMax}</CustomTableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
                // :
                //     <div></div>  
                }


                    {this.state.toggle.modificar
                        ?  
                         //Llama al componente ModificarItems
                        <div>
                            <div className="row">
                                <div className="col s12 ">
                                    <div className="">
                                        <div className="card-content  black-text">
                                        <StkItemsModificar 
                                            clickmodificar={()=>this.toggle("modificar")} 
                                            // read={()=>this.read()}

                                            idStkItems={this.state.idStkItems}
                                            StkItemsGrupo={this.state.StkItemsGrupo}
                                            StkGrupoDesc={this.state.StkGrupoDesc}
                                            StkItemsRubro={this.state.StkItemsRubro}
                                            StkRubroDesc={this.state.StkRubroDesc}

                                            StkItemsDesc={this.state.StkItemsDesc}
                                            StkItemsCantidad={this.state.StkItemsCantidad}
                                            StkItemsCantDisp={this.state.StkItemsCantDisp}
                                            StkItemsMin={this.state.StkItemsMin}
                                            StkItemsMax={this.state.StkItemsMax}
                                            // StkItemsObserv={this.state.StkItemsObserv}

                                            // click={()=>this.toggle()} 
                                            leeStkItemsDetalles={()=>this.leeStkItemsDetalles()} 
                                            // read={()=>this.leeStkItems()}
                                        >
                                        
                                        </StkItemsModificar>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        <div></div>    
    }

            {this.state.toggle.seleccampos &&
                <SelecCampos 
                    datos={items} 
                    toggleImprimir={()=>this.toggle("seleccampos")} 
                    headerTabla={columns}
                />
            }

            {/* // FAB BEGIN  */}

                {/* Muesra los botones Flotantes en la parte inferior de la pantalla Agregar y Busqueda*/}

                <StkFab 
                    borraFiltered={this.borraFiltered} 
                    toggleAgregar={()=>this.toggle("agregar")} 
                    toggleImprimir={()=>this.toggle("seleccampos")}
                    toggleBusqueda={()=>this.toggle("busqueda")} 
                    toggle_busqueda={this.state.toggle.busqueda} 
                    search={this.search} 
                    filtered={this.state.filtered} />

            {/* // FAB END */}
            </div>
        )
    }
}

export default StkItems