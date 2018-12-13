import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'



import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

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
            fab: {
                position: 'absolute',
                bottom: '50px',
                right: '50px',
              },
              direction: { // direccion del ordenamiento asc o desc

              }
              
        }
        this.toggle = this.toggle.bind(this);
        this.togglemodificar = this.togglemodificar.bind(this);
        // this.funcionTest = this.funcionTest.bind(this);
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
            .then(res=> {
            const monedas = JSON.parse(res.text)
            this.setState({monedas: monedas})
            })
    }

    // //Update
    ActualizaMoneda = (params) => {
      const  monedas  = params;
     
    request                  
       .post('http://localhost:4000/stkmonedasmodificar/'+monedas.idStkMonedas)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkMonedasDescripcion: params.StkMonedasDescripcion})
       .send({ StkMonedasCotizacion: params.StkMonedasCotizacion})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
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
        this.read()
    }
  

    render(){
        console.log("render en StkMonedas")
        const monedas = this.state.monedas.map( (rowData,index) => 
        // Object.assign(rowData, { borrar: <button className=" red accent-4" onClick={()=>this.deleteProduct(rowData.idStkMonedas)}>Borrar</button> })
        Object.assign(rowData, { borrar: 
            <div className="center-align"><StkMonedasBorrar idMonedas={rowData.idStkMonedas} read={()=>this.read()}></StkMonedasBorrar></div>})
            // <button 
            //     className=" red accent-4" 
            //     onClick={this.funcionTest}
            //     >
            //     Borrar
            // </button> })
        );
        return( 
            <div>
                <h1>ABM DE Monedas</h1>
                
                {this.state.toggle
                ?
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
                // <p onClick={()=>this.toggle()} className='btn'>  AGREGAR MONEDAS </p>
                <Button onClick={()=>this.toggle()} variant="contained" color="primary">AGREGAR MONEDAS</Button>
                // <Button variant="fab" color="primary" aria-label="Add" className={this.state.fab}>
                // <AddIcon /> </Button>
                }

                {!this.state.toggle
                ?
                        <Paper >
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell onClick={() => this.sortBy("idStkMonedas")} >Código</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("StkMonedasDescripcion")} >Descripción</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("StkMonedasCotizacion")} numeric>Cotización</CustomTableCell>
                                        <CustomTableCell ></CustomTableCell>
                                    </TableRow>
                                </TableHead>
                             
                                <TableBody>
                                    {monedas.map(row => {
                                    return (
                                        <TableRow onDoubleClick={()=>{
                                            console.log("actualizo variables")
                                            this.setState({idStkMonedas:row.idStkMonedas})
                                            this.setState({StkMonedasDescripcion:row.StkMonedasDescripcion})
                                            this.setState({StkMonedasCotizacion:row.StkMonedasCotizacion})
                                            this.togglemodificar()}}  key={row.id}>
                                            
                                            <CustomTableCell>{row.idStkMonedas}</CustomTableCell>
                                            <CustomTableCell >{row.StkMonedasDescripcion}</CustomTableCell>
                                            <CustomTableCell  numeric>{row.StkMonedasCotizacion}</CustomTableCell>
                                            <CustomTableCell numeric>{row.borrar}</CustomTableCell>
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

export default Monedas	