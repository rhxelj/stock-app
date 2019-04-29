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

import StkItemsAgregar from './StkItemsAgregar'
import StkItemsBorrar from './StkItemsBorrar'
import StkItemsModificar from './StkItemsModificar'

import IpServidor from './VariablesDeEntorno'

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
            StkItemsObserv:'',
            items:[],
            itemsdetalles:[],
            stkgrupoitem:[],
        }
        this.toggle = this.toggle.bind(this);
    }    
    
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
          console.log(this.state.stkgrupoitem)
          console.log('StkGrupoDesc'+this.state.stkgrupoitem.StkGrupoDesc)
          return this.state.stkgrupoitem.StkGrupoDesc
        }

    
    
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
        const items = this.state.items.map( (rowData,index) => 
        // Object.assign(rowData, { borrar: <button className=" red accent-4" onClick={()=>this.deleteProduct(rowData.idStkMonedas)}>Borrar</button> })
        Object.assign(rowData, { borrar: 
            <div className="center-align"><StkItemsBorrar idStkItems={rowData.idStkItems} leeStkItems={()=>this.leeStkItems()} read={()=>this.leeStkItems()}></StkItemsBorrar></div>})
            // <button 
            //     className=" red accent-4" 
            //     onClick={this.funcionTest}
            //     >
            //     Borrar
            // </button> })
        );
        // Tengo que hacer otro Object.assin para  StkItemsGrupo para mostrar la descripcion o lo hacemos desde el backend?    

// Encabezado de la Tabla

        var columns =[
            {
                Header: "Items(ID)",
                accessor: "idStkItems",
                tipo:"numero"  
            },
            {
                Header: "Grupo",
                accessor: "StkItemsGrupo",
                tipo:"numero"  
            },
            {
                Header: "Rubro",
                accessor: "StkItemsRubro",
                tipo:"numero"  
            },
            {
                Header: "Descripción",
                accessor: "StkItemsDesc",
                tipo:"numero"  
            },
            {
                Header: "Cantidad",
                accessor: "StkItemsCantidad",
                tipo:"numero"  
            },
            {
                Header: "Fecha de Actualización",
                accessor: "StktemsFAct",
                tipo:"numero"  
            },
            {
                Header: "Stock Mínimo",
                accessor: "StkItemsMin",
                tipo:"numero"  
            },
            {
                Header: "Stock Máximo",
                accessor: "StkItemsMax",
                tipo:"numero"  
            },
            {
                Header: "Observaciones",
                accessor: "StkItemsObserv",
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
                {/* <BorrarMonedas ></BorrarMonedas> */}
                <h1>ABM DE items</h1>
                
                {this.state.toggle
                ?
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    <StkItemsAgregar click={()=>this.toggle()} leeStkItems={()=>this.leeStkItems()} read={()=>this.leeStkItems()}> </StkItemsAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                // <p onClick={()=>this.toggle()} className='btn'>AGREGAR ITEM</p>
                <Button onClick={() => this.toggle()} variant="contained" color="primary">AGREGAR ITEM</Button>
                }
               
                

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
                                return (<CustomTableCell key={index} onClick={() => this.sortBy(row.accessor,row.tipo)} >{row.Header}</CustomTableCell>)
                                })
                            }
                        </TableRow>
                    </TableHead>
                 
                    <TableBody>
                        {items.map(row => {
                        return (
                            <TableRow key={row.idStkItems} 
                                onDoubleClick={()=>{
                                console.log("actualizo variables")
                               
                                
                                this.setState({StkGrupoDesc:row.StkGrupoDesc})
                                this.setState({StkRubroDesc:row.StkRubroDesc})
                                this.setState({StkItemsDesc:row.StkItemsDesc})
                                this.setState({StkItemsCantidad:row.StkItemsCantidad})
                                this.setState({StkItemsMin:row.StkItemsMin})
                                this.setState({StkItemsMax:row.StkItemsMax})
                                this.setState({StkItemsObserv:row.StkItemsObserv})

                                this.togglemodificar()}}
                                >
                                                              
                                {console.log("row ")}
                                {console.log(row)}
                                
                                <CustomTableCell>{row.idStkItems}</CustomTableCell>
                                <CustomTableCell>{row.StkGrupoDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkRubroDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsDesc}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsCantidad}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsFAct}</CustomTableCell> 
                                <CustomTableCell>{row.StkItemsMin}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsMax}</CustomTableCell>
                                <CustomTableCell>{row.StkItemsObserv}</CustomTableCell>
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
                                        <StkItemsModificar 
                                            clickmodificar={()=>this.togglemodificar()} 
                                            // read={()=>this.read()}
                                           
                                            StkItemsGrupo={this.state.StkGrupoDesc}
                                            StkItemsRubro={this.state.StkRubroDesc}
                                            StkItemsDesc={this.state.StkItemsDesc}
                                            StkItemsCantidad={this.state.StkItemsCantidad}
                                            StkItemsMin={this.state.StkItemsMin}
                                            StkItemsMax={this.state.StkItemsMax}
                                            StkItemsObserv={this.state.StkItemsObserv}

                                            // click={()=>this.toggle()} 
                                            leeStkItems={()=>this.leeStkItems()} 
                                            read={()=>this.leeStkItems()}
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

            </div>
        )
    }
}

export default StkItems