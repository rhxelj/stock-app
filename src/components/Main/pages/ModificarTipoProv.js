
import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { stringify } from 'querystring';

class ModificarTipoProv extends Component {
    constructor(props){
        super(props)
        this.state = {
            idTipoProveed:'',
            TipoProveedDesc:'',
            tipoprov:[]
        }
        this.renderEditable = this.renderEditable.bind(this)
    }    
    
    //Read
    read = _ => {
        const url = 'http://localhost:4000/leertipoprov'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const tipoprov = JSON.parse(res.text)
            this.setState({tipoprov: tipoprov})
            })
    }

    //Update
    updateProduct = (params) => {
     
      const  tipoprov  = params;
     
    request                  
       .post('http://localhost:4000/modificartipoprov/'+tipoprov.idTipoProveed)
       .set('Content-Type', 'application/json')
       
    //    .send({ idtipotipoprov: this.state.idtipotipoprov})
       .send({ TipoProveedDesc: params.TipoProveedDesc})
       .set('X-API-Key', 'foobar')
       .then(function(res) {
      // res.body, res.headers, res.status
        });
       
        //this.getproveedores();
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
              const tipoprov = [...this.state.tipoprov];
              tipoprov[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ tipoprov });
              
            //   console.log('cellInfo: '+  JSON.stringify(cellInfo))
            //   console.log(cellInfo.original)
              this.updateProduct(cellInfo.original)
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.tipoprov[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render(){
        const tipoprov = this.state.tipoprov
        return( 
            <div>
                <h1>Actualiza Tipo Proveedor</h1>
                <ReactTable
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
                                    accessor: "TipoProveedDesc",
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

export default ModificarTipoProv