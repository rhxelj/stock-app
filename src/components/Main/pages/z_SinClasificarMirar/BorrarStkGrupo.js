import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class BorrarStkGrupo extends Component {
    constructor(props){
        super(props)
        this.state = {
            stkgrupo:[],
            // filtrado:[],
            filtered:'',
            toggle: true,
            id:''
        }
        this.search = this.search.bind(this)
        this.toggle = this.toggle.bind(this);
    }    
    

    toggle(event){
        this.setState(prevState => ({
            toggle: !prevState.toggle
          }))
    }
    
    //Read
    read = _ => {
        const url = 'http://localhost:4000/leerstkgrupo'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkgrupo = JSON.parse(res.text)
            this.setState({stkgrupo: stkgrupo})
            // this.setState({filtrado: stkgrupo})
            })
    }

    // //Delete
      deleteProduct = (id)=> {
        
 //       const { stkgrp } = this.state;
        request
          .delete('http://localhost:4000/borrarstkgrupo/'+id)
          .set('Content-Type', 'application/json')
          //.set('X-API-Key', 'foobar')
          .then(function(res) {
        // res.body, res.headers, res.status
          })
          //alert("Borrado")
          this.toggle()
          this.read()
      }
    
  
    listado = _=>{
        let stkgrupo = this.state.stkgrupo.filter((stkgrp)=>{
            return stkgrp.StkGrupoDesc.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        })
        const listado = stkgrupo.map((stkgrp)=> 
                <tr>
                    <td>{stkgrp.idStkGrupo}</td>
                    <td>{stkgrp.StkGrupoDesc}</td>
                    <td>{stkgrp.StkGrupoAbr}</td>
                    <td>{stkgrp.StkGrupoContRubro}</td>
                    <td>
                        <button className=" red accent-4" onClick={()=>{
                        // this.setState({id:stkgrp.id})
                        this.setState({id:stkgrp.idStkGrupo})
                        this.toggle()}}>Borrar</button>
                    </td>
                </tr>
           
        )
        return listado
    }
    
    search(event){
        var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
        this.setState({filtered: value})
    }

    componentDidMount(){
        this.read()
    }

    render(){
        
        return( 
            <div>
                <h1>Borrar Grupo Stock</h1>
                <input onChange={this.search} type="text" value={this.state.filtered}/>
                
                {this.state.toggle 
                ?
                    <table className="striped">
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Abreviatura</th>
                            <th>Cód. Rubro</th>
                            <th></th>
                        </tr>
                        </thead>

                        <tbody>
                            {this.listado()}
                        </tbody>
                    </table>
                :
                <div className="row s12  card-panel hoverable">
                    <div className="col s6"> Esta seguro que desea Borrar ? no se puede volver atras ...</div>
                    <div className="col s6 offset-s10">
                        <button className=" red accent-4" onClick={()=>this.deleteProduct(this.state.id)}>Borrar</button>
                        <button className=" blue accent-4" onClick={()=>this.toggle()}>Cancelar</button>
                    </div>
                </div> 
                }
                {/* <ul>
                    {this.state.toggle ?
                        this.listado() :
                        <div>Esta seguro que desea Borrar ? no se puede volver atras ...
                        <button className=" red accent-4" onClick={()=>this.deleteProduct(this.state.id)}>Borrar</button>
                        <button className=" blue accent-4" onClick={()=>this.toggle()}>Cancelar</button>
                        </div>
                    }
                </ul> */}
            </div>
        )
    }
}

export default BorrarStkGrupo