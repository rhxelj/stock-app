
import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
// import { stringify } from 'querystring';

import IpServidor from './VariablesDeEntorno'

class ModificarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion: 0,
            monedas:[]
        }
        this.renderEditable = this.renderEditable.bind(this)
    }    
    
    //Read
    read = _ => {
        const url = IpServidor + '/leermonedas'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const monedas = JSON.parse(res.text)
            this.setState({monedas: monedas})
            })
    }

    //Update
    ActualizaMoneda = (params) => {
     
      const  monedas  = params;
     
    request                  
       .post('http://localhost:4000/modificarmonedas/'+monedas.idStkMonedas)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkMonedasDescripcion: params.StkMonedasDescripcion})
       .send({ StkMonedasCotizacion: params.StkMonedasCotizacion})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        })
        .catch(err => {
                if (err.status === 412) 
                        {
                        alert('El campo Cotización tiene más dígitos de los que corresponde ') 
                        }     
                else {
                    if (err.status === 410) 
                    {
                    alert('El campo Descripción tiene más dígitos de los que corresponde ') 
                    }  
                    else { console.log('Error nro :  ' + err.status)}
                }
              
                      
            
        //this.getproveedores();
     })
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
              const monedas = [...this.state.monedas]
              monedas[cellInfo.index][cellInfo.column.id] = e.target.innerHTML
               this.setState({ monedas })
              this.ActualizaMoneda(cellInfo.original)
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.monedas[cellInfo.index][cellInfo.column.id]
            }}
          />
        )
      }

    render(){
        const monedas = this.state.monedas
        return( 
            <div>
                <h1>Actualiza Monedas</h1>
                <ReactTable
                        data={monedas}
                        columns={[
                             {                   
                            columns: [
                                    {
                                    Header: "Código",
                                    accessor: "idStkMonedas"
                                    
                                    },
                                    {
                                    Header: "Denomiación",
                                    accessor: "StkMonedasDescripcion",
                                    Cell: this.renderEditable,
                                    resizable: true,
                                    sortable: true,
                                    filterable: true
                                    },
                                    
                                    {
                                    Header: "Cotización",
                                    accessor: "StkMonedasCotizacion",
                                    Cell: this.renderEditable
                                    },
                                    
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

export default ModificarMonedas