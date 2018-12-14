import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';

// import AgregarProveedor from './ProveedoresAgregar'
import ProveedoresAgregar from './ProveedoresAgregar';
import ProveedoresModificar from './ProveedoresModificar';
import ProveedoresBorrar from './ProveedoresBorrar'

import IpServidor from './VariablesDeEntorno'



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





class Proveedores extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            togglemodificar: false,
            provdesc:'',
            idProveedores:'',
            provtipo:1,
            provcuit:'',
            provcalle:'',
            provnrocalle:'',
            provpiso:'',
            provdto:'',
            provcodpostal:'',
            provlocalidad:'',
            provprovincia:'',
            provtelefono:'',
            provcontacto:'',
            provmail:'',
            provpagweb:'',
            provcodmon:'',
            proveedores:[],
              direction: { // direccion del ordenamiento asc o desc

              }
        }
        this.renderEditable = this.renderEditable.bind(this)
        this.toggle = this.toggle.bind(this);
        this.funcionTest = this.funcionTest.bind(this);
    }    
    
    
   //Funcion ordernar Begin

    // Ordena Numeros
    sortByNumero(key) {
        this.setState({
          proveedores: this.state.proveedores.sort((a, b) =>
            this.state.direction[key] === "asc" ? a[key] - b[key] : b[key] - a[key]
          ),
          direction: {
            [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
          }
        });
      }

      sortBy(key) {
        this.setState({
          Proveedores: this.state.proveedores.sort((a, b) =>
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
        const url = IpServidor + '/proveedoresleer'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const proveedores = JSON.parse(res.text)
            this.setState({proveedores: proveedores})
            })
    }

    //Update
    ActualizaProveedor = (params) => {
     
      const  proveedores  = params;
     
    request                  
       .post(IpServidor + '/proveedoresmodificar/'+proveedores.idProveedores)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})

        .send({ provdesc: this.state.provdesc})
        .send({ provtipo: this.state.provtipo})
        .send({ provcuit: this.state.provcuit})        
        .send({ provcalle: this.state.provcalle})
        .send({ provnrocalle: this.state.provnrocalle})
        .send({ provpiso: this.state.provpiso})
        .send({ provdto: this.state.provdto})
        .send({ provcodpostal: this.state.provcodpostal})
        .send({ provlocalidad: this.state.provlocalidad})
        .send({ provprovincia: this.state.provprovincia})
        .send({ provtelefono: this.state.provtelefono})
        .send({ provcontacto: this.state.provcontacto})
        .send({ provmail: this.state.provmail})
        .send({ provpagweb: this.state.provpagweb})
        .send({ provcodmon: this.state.provcodmon})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
     }
    
     deleteProduct = (id)=> {
        
        //       const { moneda } = this.state;
               request
                 .delete(IpServidor + '/proveedoresborrar/'+id)
                 .set('Content-Type', 'application/json')
                 //.set('X-API-Key', 'foobar')
                 .then(function(res) {
               // res.body, res.headers, res.status
                 })
                 .catch(err => {
                    if (err.status === 411) 
                            {
                            alert('Código de Proveedor Usado no se puede borrar  ') 
                            }
                        })
                 //alert("Borrado")
                //  this.toggle()
                 this.read()
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
        this.read()
    }
    componentDidMount(){
        this.read()
    }
    
    renderEditable(cellInfo) {
        return (
          <div
            style={{ backgroundColor: "#fafafa" }}
            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
              const proveedores = [...this.state.proveedores]
              proveedores[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
              this.setState({ proveedores })
              this.ActualizaProveedor(cellInfo.original)
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.proveedores[cellInfo.index][cellInfo.column.id]
            }}
          />
        )
      }


      funcionTest(){ 
        alert('ggggg')
        
      }

    render(){
        const proveedores = this.state.proveedores.map( (rowData,index) => 
        Object.assign(rowData, { borrar: 
            <div className="center-align"><ProveedoresBorrar idProveedores={rowData.idProveedores} read={()=>this.read()}></ProveedoresBorrar></div>})
         
        );
        return( 
            <div>
                {/* <BorrarMonedas ></BorrarMonedas> */}
                <h1>ABM DE Proveedores</h1>
                
                
                {this.state.toggle
                ?
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    <ProveedoresAgregar click={()=>this.toggle()} read={()=>this.read()}> </ProveedoresAgregar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                // <p onClick={()=>this.toggle()} className='btn'>AGREGAR Proveedores</p>
                <Button onClick={()=>this.toggle()} variant="contained" color="primary">AGREGAR PROVEEDORES</Button>
                }

                  {!this.state.toggle
                ?
                <Paper >
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell onClick={() => this.sortBy("idProveedores")}  >Código</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresDesc")}  >Denomiación</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresTipo")}  >Tipo</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresCUIT")}  >CUIT</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresCalle")}  >Calle</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("ProveedoresNroCalle")} >Nro</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("ProveedoresPiso")}  >Piso</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresDto")}  >Dto</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresCodPos")} >Cod.Postal</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresLoc")}  >Localidad</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresPcia")}  >Provincia</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortByNumero("ProveedoresTel")}  >Teléfono</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresContacto")} >Contacto</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresMail")}  >mail</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresWeb")}  >Pág. Web</CustomTableCell>
                                        <CustomTableCell onClick={() => this.sortBy("ProveedoresCodMon")}>Moneda</CustomTableCell>
                                        <CustomTableCell ></CustomTableCell> {/* Borrar*/}
                                    </TableRow>
                                </TableHead>
                             
                                <TableBody>
                                    {proveedores.map(row => {
                                    return (
                                        <TableRow onDoubleClick={()=>{
                                            console.log("actualizo variables")
                                            this.setState({idProveedores : row.idProveedores},()=>
                                            {
                                                
                                                console.log('row.idProveedores '+row.idProveedores)
                                                console.log('idProveedores'+ this.state.idProveedores)})
                                            
                                            this.setState({provdesc : row.ProveedoresDesc})
                                            this.setState({StkTipoProveedDesc : row.StkTipoProveedDesc}) //ver
                                            this.setState({provcuit : row.ProveedoresCUIT})
                                            this.setState({provcalle : row.ProveedoresCalle})
                                            this.setState({provnrocalle : row.ProveedoresNroCalle})//ver
                                            this.setState({provpiso : row.ProveedoresPiso})
                                            this.setState({provdto : row.ProveedoresDto})
                                            this.setState({provcodpostal : row.ProveedoresCodPos})
                                            this.setState({provlocalidad : row.ProveedoresLoc})
                                            this.setState({provprovincia : row.ProveedoresPcia})
                                            this.setState({provtelefono : row.ProveedoresTel})
                                            this.setState({provcontacto : row.ProveedoresContacto})
                                            this.setState({provmail : row.ProveedoresMail})
                                            this.setState({provpagweb : row.ProveedoresWeb})
                                            this.setState({provcodmon : row.ProveedoresCodMon})
                                            this.togglemodificar()
                                            // this.setState({state: this.state})
                                            // console.log("row.ProveedoresWeb "+row.ProveedoresWeb)
                                            // console.log("ProveedoresWeb "+ this.state.ProveedoresWeb)
                                            // console.log('row.idProveedores '+row.idProveedores)
                                            // console.log('idProveedores'+ this.state.idProveedores)
                                            
                                        }
                                            }  key={row.idProveedores}>
                                            
                                            <CustomTableCell >{row.idProveedores}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresDesc}</CustomTableCell>
                                            <CustomTableCell >{row.StkTipoProveedDesc}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresCUIT}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresCalle}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresNroCalle}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresPiso}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresDto}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresCodPos}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresLoc}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresPcia}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresTel}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresContacto}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresMail}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresWeb}</CustomTableCell>
                                            <CustomTableCell >{row.ProveedoresCodMon}</CustomTableCell>
                                            <CustomTableCell >{row.borrar}</CustomTableCell>
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
                                    <ProveedoresModificar 
                                        clickmodificar={()=>this.togglemodificar()} 
                                        read={()=>this.read()}
                                        idProveedores={this.state.idProveedores}
                                        provdesc={this.state.provdesc}
                                        provtipo={this.state.provtipo}
                                        provcuit={this.state.provcuit}
                                        provcalle={this.state.provcalle}
                                        provnrocalle={this.state.provnrocalle}
                                        provpiso={this.state.provpiso}
                                        provdto={this.state.provdto}
                                        provcodpostal={this.state.provcodpostal}
                                        provlocalidad={this.state.provlocalidad}
                                        provprovincia={this.state.provprovincia}
                                        provtelefono={this.state.provtelefono}
                                        provcontacto={this.state.provcontacto}
                                        provmail={this.state.provmail}
                                        provpagweb={this.state.provpagweb}
                                        provcodmon={this.state.provcodmon}
                                        idStkTipoProveed={this.state.idStkTipoProveed}
                                        StkTipoProveedDesc={this.state.StkTipoProveedDesc}
                                    >
                                    
                                    </ProveedoresModificar>
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

export default Proveedores


// <ReactTable
//                         data={proveedores}

//                         filterable
//                         defaultSorted={[
//                             {
//                                 id: "codigo",
//                                 desc: true
//                             }
//                         ]}

//                         columns={[
//                              {                   
//                                 columns: [
//                                     {
//                                     Header: "Código",
//                                     id:"codigo",
//                                     accessor: "idProveedores",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Denomiación",
//                                     accessor: "ProveedoresDesc",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Tipo",
//                                     accessor: "StkTipoProveedDesc",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "CUIT",
//                                     accessor: "ProveedoresCUIT",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Calle",
//                                     accessor: "ProveedoresCalle",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Nro",
//                                     accessor: "ProveedoresNroCalle",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Piso",
//                                     accessor: "ProveedoresPiso",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Dto",
//                                     accessor: "ProveedoresDto",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Cod.Postal",
//                                     accessor: "ProveedoresCodPos",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Localidad",
//                                     accessor: "ProveedoresLoc",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Provincia",
//                                     accessor: "ProveedoresPcia",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Teléfono",
//                                     accessor: "ProveedoresTel",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Contacto",
//                                     accessor: "ProveedoresContacto",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "mail",
//                                     accessor: "ProveedoresMail",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Pág. Web",
//                                     accessor: "ProveedoresWeb",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                     Header: "Moneda",
//                                     accessor: "ProveedoresCodMon",
//                                     Cell: this.renderEditable
//                                     },
//                                     {
//                                         Header: "",
//                                         accessor: "borrar",
//                                         // Cell: this.renderEditable
//                                     }
                                        
//                             ]
//                         }                
                            
//                         ]}
//                         defaultPageSize={20}
//                         className="-striped -highlight"
//                     />