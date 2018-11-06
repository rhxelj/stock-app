import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

// import AgregarProveedor from './ProveedoresAgregar'
import BorrarProveedores from './ProveedoresBorrar'

import IpServidor from './VariablesDeEntorno'
import ProveedoresAgregar from './ProveedoresAgregar';

class Proveedores extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            provdesc:'',
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
            proveedores:[]
        }
        this.renderEditable = this.renderEditable.bind(this)
        this.toggle = this.toggle.bind(this);
        this.funcionTest = this.funcionTest.bind(this);
    }    
    
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
            <div className="center-align"><BorrarProveedores idProveedores={rowData.idProveedores} read={()=>this.read()}></BorrarProveedores></div>})
         
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
                <p onClick={()=>this.toggle()} className='btn'>AGREGAR Proveedores</p>
                }
               
                <ReactTable
                        data={proveedores}

                        filterable
                        defaultSorted={[
                            {
                                id: "codigo",
                                desc: true
                            }
                        ]}

                        columns={[
                             {                   
                                columns: [
                                    {
                                    Header: "Código",
                                    id:"codigo",
                                    accessor: "idProveedores",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Denomiación",
                                    accessor: "ProveedoresDesc",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Tipo",
                                    accessor: "StkTipoProveedDesc",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "CUIT",
                                    accessor: "ProveedoresCUIT",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Calle",
                                    accessor: "ProveedoresCalle",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Nro",
                                    accessor: "ProveedoresNroCalle",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Piso",
                                    accessor: "ProveedoresPiso",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Dto",
                                    accessor: "ProveedoresDto",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Cod.Postal",
                                    accessor: "ProveedoresCodPos",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Localidad",
                                    accessor: "ProveedoresLoc",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Provincia",
                                    accessor: "ProveedoresPcia",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Teléfono",
                                    accessor: "ProveedoresTel",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Contacto",
                                    accessor: "ProveedoresContacto",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "mail",
                                    accessor: "ProveedoresMail",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Pág. Web",
                                    accessor: "ProveedoresWeb",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Moneda",
                                    accessor: "ProveedoresCodMon",
                                    Cell: this.renderEditable
                                    },
                                    {
                                        Header: "",
                                        accessor: "borrar",
                                        // Cell: this.renderEditable
                                    }
                                        
                            ]
                        }                
                            
                        ]}
                        defaultPageSize={20}
                        className="-striped -highlight"
                    />
            </div>
        )
    }
}

export default Proveedores