import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class BorrarStkRubro extends Component {
    constructor(props){
        super(props)
        this.state = {
            stkrubro:[],
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
        const url = 'http://localhost:4000/leerstkrubro'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkrubro = JSON.parse(res.text)
            this.setState({stkrubro: stkrubro})
            // this.setState({filtrado: stkrubro})
            })
    }

    // //Delete
      deleteProduct = (id)=> {
        
 //       const { stkgrp } = this.state;
        request
          .delete('http://localhost:4000/borrarstkrubro/'+id)
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
        let stkrubro = this.state.stkrubro.filter((stkgrp)=>{
            return stkgrp.TipoMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
        })
        const listado = stkrubro.map((stkgrp)=> 
                <tr>
                    <td>{stkgrp.idStkRubro}</td>
                    <td>{stkgrp.StkRubroCodGrp}</td>
                    <td>{stkgrp.StkRubroDesc}</td>
                    <td>{stkgrp.StkRubroAbr}</td>
                    <td>{stkgrp.StkRubroProv}</td>
                    <td>{stkgrp.StkRubroAncho}</td>
                    <td>{stkgrp.StkRubroPres}</td>
                    <td>{stkgrp.StkRubroUM}</td>
                    <td>{stkgrp.StkRubroCosto}</td>
                    <td>{stkgrp.StkRubroTM}</td>
                    <td>
                        <button className=" red accent-4" onClick={()=>{
                        // this.setState({id:stkgrp.id})
                        this.setState({id:stkgrp.idStkRubro})
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
                <h1>Borrar Rubro Stock</h1>
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

export default BorrarStkRubro