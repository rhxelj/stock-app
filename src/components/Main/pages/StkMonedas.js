import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'

import StkMonedasAgregar from './StkMonedasAgregar'
import StkMonedasBorrar from './StkMonedasBorrar'


class Monedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor + '/stkmonedasleer',
            toggle: false,
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion: 0,
            monedas:[]
        }
        this.renderEditable = this.renderEditable.bind(this)
        this.toggle = this.toggle.bind(this);
        // this.funcionTest = this.funcionTest.bind(this);
    }    
    
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


    //   funcionTest(){ 
    //     alert('ggggg')
        
    //   }

    render(){
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
                {/* <MonedasBorrar ></MonedasBorrar> */}
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
                <p onClick={()=>this.toggle()} className='btn'>  AGREGAR MONEDAS </p>
                }

                {!this.state.toggle
                ?
                <ReactTable
                        data={monedas}

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
                                    accessor: "idStkMonedas"
                                    
                                    },
                                    {
                                    Header: "Denomiación",
                                    accessor: "StkMonedasDescripcion",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Cotización",
                                    accessor: "StkMonedasCotizacion",
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
                :
                    <div></div>
                }
            </div>
        )
    }
}

export default Monedas