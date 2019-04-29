import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import IpServidor from './VariablesDeEntorno'
class LeerProveedor extends Component {
    constructor(props){
        super(props)
        this.state = {
            proveedor:[]
        }
    }    
    
    //Read
    read = _ => {
        const url = IpServidor + '/leerproveedor' ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            // const products = JSON.parse(res.text)
            // this.setState({products: products})
            const proveedor = JSON.parse(res.text)
            this.setState({proveedor: proveedor})
            })
    }
    
    componentDidMount(){
        this.read()
    }
    
    render(){
        // const products = this.state.products
        const proveedor = this.state.proveedor

        return( 
            <div>
                <ul>
                    <ReactTable
                        // data={products}
                        data={proveedor}
                        columns={[
                             {                   
                                columns: [
                                    {
                                    Header: "Código",
                                    accessor: "idProveedores"
                                    
                                    },
                                    {
                                    Header: "Denomiación",
                                    accessor: "ProveedoresDesc"
                                    },
                                    {
                                    Header: "Tipo",
                                    accessor: "StkTipoProveedDesc"
                                    },
                                    {
                                    Header: "CUIT",
                                    accessor: "ProveedoresCUIT"
                                    },
                                    {
                                    Header: "Calle",
                                    accessor: "ProveedoresCalle"
                                    },
                                    {
                                    Header: "Nro",
                                    accessor: "ProveedoresNroCalle"
                                    },
                                    {
                                    Header: "Piso",
                                    accessor: "ProveedoresPiso"
                                    },
                                    {
                                    Header: "Dto",
                                    accessor: "ProveedoresDto"
                                    },
                                    {
                                    Header: "Cod.Postal",
                                    accessor: "ProveedoresCodPos"
                                    },
                                    {
                                    Header: "Localidad",
                                    accessor: "ProveedoresLoc"
                                    },
                                    {
                                    Header: "Provincia",
                                    accessor: "ProveedoresPcia"
                                    },
                                    {
                                    Header: "Teléfono",
                                    accessor: "ProveedoresTel"
                                    },
                                    {
                                    Header: "Contacto",
                                    accessor: "ProveedoresContacto"
                                    },
                                    {
                                    Header: "mail",
                                    accessor: "ProveedoresMail"
                                    },
                                    {
                                    Header: "Pág. Web",
                                    accessor: "ProveedoresWeb"
                                    },
                                    {
                                    Header: "Moneda",
                                    accessor: "ProveedoresCodMon"
                                    }
                            ]
                        }                
                            
                        ]}
                  
                    />
                 
                </ul>
            </div>
        )
    }
}

export default LeerProveedor