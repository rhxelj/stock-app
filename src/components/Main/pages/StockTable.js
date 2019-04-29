import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'



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
// import Paper from '@materialrow.StkMonedasDescripcion-ui/core/Paper';

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

class StockTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            togglemodificar:false,
            data: this.props.data,
            columns: this.props.columns,
            filtered:'',
            direction: {}// direccion del ordenamiento asc o desc
        }
        this.toggle = this.toggle.bind(this);
        this.togglemodificar = this.togglemodificar.bind(this);
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


    
    
    toggle(event){
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
    
    
    componentWillUnmount(){
        this.setState({ state: this.state });
    }
    componentDidMount(){
    }
     search=(event)=>{
            var name  = event.target.name
            var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
            this.setState({filtered: value})
        }
        
        // <input onChange={this.search} type="text" value={this.state.filtered}/>

    render(){
        
        var data = this.state.data
        var columns = this.state.columns
        console.log('Contenido de data '+ data)
                
        // data = this.state.data.map( (rowData,index) => 
        // Object.assign(rowData, { borrar: 
        //     <div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={()=>this.read()}></StkMonedasBorrar></div>})
        // );
        
        // data = this.state.data.filter((rowData)=>{
        //     console.log("contenidos de DATA",rowData)
        //     // return rowData.StkMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        // })
       
        var tableHeader = columns.map((column,index)=>
        <CustomTableCell onClick={() => this.sortBy((column.accessor))} >{column.header}</CustomTableCell>
        // console.log('custom table ', column.header)
        ) 
        var tableBody = data.map(row =>
                // <TableRow 
                    // onDoubleClick={()=>{
                    // console.log("actualizo variables")
                    // this.setState({idStkMonedas:row.idStkMonedas})
                    // this.setState({StkMonedasDescripcion:row.StkMonedasDescripcion})
                    // this.setState({StkMonedasCotizacion:row.StkMonedasCotizacion})
                    // this.togglemodificar()}}  key={row.id}
                // >
                    {console.log("dentro de tablewBody :"+row.StkMonedasDescripcion)}
                //     <CustomTableCell>{row.idStkMonedas}</CustomTableCell>
                //     <CustomTableCell >{row.StkMonedasDescripcion}</CustomTableCell>
                //     <CustomTableCell  numeric>{row.StkMonedasCotizacion}</CustomTableCell>
                //     {/* <CustomTableCell numeric>{row.borrar}</CustomTableCell> */}
                // </TableRow>
        )

        return( 
            <div>
                <h1>ABM DE StockTable</h1>
               
                <input onChange={this.search} type="text" value={this.state.filtered}/> 
                         
                        {/* <Paper > */}
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        {tableHeader}
                                    </TableRow>
                                </TableHead>
                             
                                <TableBody>
                                    {tableBody}
                                </TableBody>
                            </Table>
                        {/* </Paper> */}
                {this.state.togglemodificar
                    ?  
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
                
            </div>
        )
    }
}

export default StockTable	



// listado = _=>{
//     let products = this.state.products.filter((product)=>{
//         return product.name.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
//     })
//     const listado = products.map((product)=> 
//             <tr>
//                 <td>{product.name}</td>
//                 <td>{product.price}</td>
//                 <td>
//                     <button className=" red accent-4" onClick={()=>{
//                     this.setState({id:product.id})
//                     this.toggle()}}>Borrar</button>
//                 </td>
//             </tr>
                
//     )
//     return listado
// }


// search(event){
//     var name  = event.target.name
//     var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
//     this.setState({filtered: value})
// }

// <input onChange={this.search} type="text" value={this.state.filtered}/>