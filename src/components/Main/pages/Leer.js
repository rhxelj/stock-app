import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from './VariablesDeEntorno'

class Leer extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: false,
            Datos:[]
        }
        this.renderEditable = this.renderEditable.bind(this)
        this.toggle = this.toggle.bind(this);
        // this.funcionTest = this.funcionTest.bind(this);
    }    
    
    //Read
    read = _ => {
        const url = IpServidor + '/stkmonedasleer'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const Datos = JSON.parse(res.text)
            this.setState({Datos: Datos})
            })
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
            <div className="center-align"><BorrarMonedas idMonedas={rowData.idStkMonedas} read={()=>this.read()}></BorrarMonedas></div>})
            // <button 
            //     className=" red accent-4" 
            //     onClick={this.funcionTest}
            //     >
            //     Borrar
            // </button> })
        );
        return( 
            <div>
                {/* <BorrarMonedas ></BorrarMonedas> */}
                <h1>ABM DE UnidadMedidas</h1>
                
                
                {this.state.toggle
                ?
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="">
                                <div className="card-content  white-text">
                                    <AgregarMonedas click={()=>this.toggle()} read={()=>this.read()}> </AgregarMonedas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <p onClick={()=>this.toggle()} className='btn'>AGREGAR monedas</p>
                }
               
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
            </div>
        )
    }
}

export default Leer