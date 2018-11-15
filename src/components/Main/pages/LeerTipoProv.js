import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'


class LeerTipoProv extends Component {
    constructor(props){
        super(props)
        this.state = {
            tipoprov:[]
        }
    }    
    
    //Read
    read = _ => {
        const url = 'http://localhost:4000/leertipoprov' ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            // const products = JSON.parse(res.text)
            // this.setState({products: products})
            const tipoprov = JSON.parse(res.text)
            this.setState({tipoprov: tipoprov})
            })
    }
    
    componentDidMount(){
        this.read()
    }
    
    render(){
        // const products = this.state.products
        const tipoprov = this.state.tipoprov
        return( 
            <div>
                <ul>
                    <ReactTable
                        // data={products}
                        data={tipoprov}
                        columns={[
                             {                   
                                columns: [
                                    {
                                    Header: "Código",
                                    accessor: "idTipoProveed"
                                    
                                    },
                                    {
                                    Header: "Denomiación",
                                    accessor: "TipoProveedDesc"
                         
                                    },
                                                                      
                            ]
                        }                
                            
                        ]}
                  
                    />
                 
                </ul>
            </div>
        )
    }
}

export default LeerTipoProv