import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'


class LeerStkGrupo extends Component {
    constructor(props){
        super(props)
        this.state = {
            stkgrupo:[]
        }
    }    
    
    //Read
    read = _ => {
        const url = 'http://192.168.2.102:4000/leerstkgrupo' ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            // const products = JSON.parse(res.text)
            // this.setState({products: products})
            const stkgrupo = JSON.parse(res.text)
            this.setState({stkgrupo: stkgrupo})
            })
    }
    
    componentDidMount(){
        this.read()
    }
    
    render(){
        // const products = this.state.products
        const stkgrupo = this.state.stkgrupo
        return( 
            <div>
                <ul>
                    <ReactTable
                        // data={products}
                        data={stkgrupo}
                        columns={[
                             {                   
                                columns: [
                                    {
                                        Header: "Código",
                                        accessor: "idStkGrupo"
                                        
                                        },
                                        {
                                        Header: "Denomiación",
                                        accessor: "StkGrupoDesc",
                                        },
                                        {
                                        Header: "Abreviatura",
                                        accessor: "StkGrupoAbr",
                                        },
                                        {
                                        Header: "Contador Rubro",
                                        accessor: "StkGrupoContRubro",
                                        },
                                    
                            ]
                        }                
                            
                        ]}
                      /*   pivotBy={["ProveedoresDesc", "TipoProveedDesc"]}
                        defaultPageSize={20}
                        className="-striped -highlight" */
                    />
                    {/* {listado}  */}
                </ul>
            </div>
        )
    }
}

export default LeerStkGrupo