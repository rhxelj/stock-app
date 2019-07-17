
import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { stringify } from 'querystring';

class ModificarStkGrupo extends Component {
    constructor(props){
        super(props)
        this.state = {
            idStkGrupo:'',
            StkGrupoDesc:'',
            StkGrupoAbr:'',
            StkGrupoContRubro:0,
            stkgrupo:[]


                       
  
        }
        this.renderEditable = this.renderEditable.bind(this)
    }    
    
    //Read
    read = _ => {
        const url = 'http://192.168.2.102:4000/leerstkgrupo'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkgrupo = JSON.parse(res.text)
            this.setState({stkgrupo: stkgrupo})
            })
    }

    //Update
    updateProduct = (params) => {
     
      const  stkgrupo  = params;
     
    request                  
       .post('http://localhost:4000/modificarstkgrupo/'+stkgrupo.idStkGrupo)
       .set('Content-Type', 'application/json')
         /*
                idStkGrupo : req.body.idStkGrupo,
    StkGrupoDesc : req.body.StkGrupoDesc,
    StkGrupoAbr : req.body.StkGrupoAbr,
    StkGrupoContRubro : req.body.StkGrupoContRubro
    
                */
    //    .send({ idtipomonedas: this.state.idtipomonedas})
       .send({ StkGrupoDesc: params.StkGrupoDesc})
       .send({ StkGrupoAbr: params.StkGrupoAbr})
       .send({ StkGrupoContRubro: params.StkGrupoContRubro})
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
              const stkgrupo = [...this.state.stkgrupo];
              stkgrupo[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
              this.setState({ stkgrupo });
              console.log('esto es  ', stkgrupo);
            //   console.log('cellInfo: '+  JSON.stringify(cellInfo))
            //   console.log(cellInfo.original)
              this.updateProduct(cellInfo.original)
            }}
            dangerouslySetInnerHTML={{
              __html: this.state.stkgrupo[cellInfo.index][cellInfo.column.id]
            }}
          />
        );
      }

    render(){
        const stkgrupo = this.state.stkgrupo
        return( 
            <div>
                <h1>Actualiza Grupo Stock</h1>
                <ReactTable
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
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Abreviatura",
                                    accessor: "StkGrupoAbr",
                                    Cell: this.renderEditable
                                    },
                                    {
                                    Header: "Contador Rubro",
                                    accessor: "StkGrupoContRubro",
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

export default ModificarStkGrupo