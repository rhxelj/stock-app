import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

class BorrarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            monedas:[],
            // filtrado:[],
            filtered:'',
            toggle: true,
            id:''
        }
        // this.search = this.search.bind(this)
        this.toggle = this.toggle.bind(this);
    }    
    

    toggle(event){
        this.setState(prevState => ({
            toggle: !prevState.toggle
          }))
    }
    
    //Read
    // read = _ => {
    //     const url = 'http://localhost:4000/leermonedas'; //'http://192.168.2.102:4000/indexprov'
    //     request
    //     .get(url)
    //     .set('Content-Type', 'application/json')
    //         .then(res=> {
    //         const monedas = JSON.parse(res.text)
    //         this.setState({monedas: monedas})
    //         // this.setState({filtrado: monedas})
    //         })
    // }

    // //Delete
      deleteProduct = (id)=> {
       
 //       const { moneda } = this.state;
        request
          .delete('http://localhost:4000/borrarmonedas/'+id)
          .set('Content-Type', 'application/json')
          //.set('X-API-Key', 'foobar')
          .then(function(res) {
        // res.body, res.headers, res.status
          })
         
          .catch(err => {
            if (err.status === 411) 
                    {
                    alert('Código de Moneda Usado no se puede borrar  ') 
                    }
                })
                this.props.read()
                this.toggle()
          
        
      }
    
    // listado = _=>{
    //     let monedas = this.state.monedas.filter((moneda)=>{
    //         return moneda.name.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
    //     })
    //     const listado = monedas.map((moneda)=> 
           
    //             <li key={moneda.id}>{moneda.name}  
    //                 {/* <button onClick={()=>this.deleteProduct(moneda.id)}>Borrar</button> */}
    //                 <button className=" red accent-4" onClick={()=>{
    //                     this.setState({id:moneda.id})
    //                     this.toggle()}}>Borrar</button>

    //             </li>
              
           
    //     )
    //     return listado
    // } 
    // listado = _=>{
    //     let monedas = this.state.monedas.filter((moneda)=>{
    //         return moneda.TipoMonedasDescripcion.toLowerCase().indexOf(this.state.filtered.toLowerCase()) !== -1
    //     })
    //     const listado = monedas.map((moneda)=> 
    //             <tr>
    //                 <td>{moneda.idTipoMonedas}</td>
    //                 <td>{moneda.TipoMonedasDescripcion}</td>
    //                 <td>{moneda.TipoMonedasCotizacion}</td>
    //                 <td>
    //                     <button className=" red accent-4" onClick={()=>{
    //                     // this.setState({id:moneda.id})
    //                     this.setState({id:moneda.idTipoMonedas})
    //                     this.toggle()}}>Borrar</button>
    //                 </td>
    //             </tr>
                    
    //     )
    //     return listado
    // }
    
    // search(event){
    // //    var TipoMonedasDescripcion  = event.target.TipoMonedasDescripcion
    //     var value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value
    //     this.setState({filtered: value})
    // }

    componentDidMount(){
        // this.read()
    }

    render(){
        
        return( 
            // <div>
            //     <button 
            //     className=" red accent-4" 
            //     onClick={()=>console.log('Dentro del componente BorrarMonedas')}
            //     >
            //     Borrar
            // </button>
            //     {}
            // </div>
            <div>
                {/* <h1>Borrar Monedas</h1>
                <input onChange={this.search} type="text" value={this.state.filtered}/> 
                */}
                {this.state.toggle
                ?
                <div>
                    <button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        Borrar
                    </button>
                </div>
                :
                    // <div className="card small">
                    // <div className="col s6 l6"> Esta seguro que desea Borrar ? no se puede volver atras ...</div>
                    <div className="center-align">
                        {/* <i class="material-icons">add</i> */}
                        <p>Borrar ?</p>
                        <button className="green "><i className="material-icons" onClick={()=>this.deleteProduct(this.props.idMonedas)}>check</i></button>
                        {/* <button className=" red accent-4" onClick={()=>this.deleteProduct(this.props.idMonedas)}>Borrar</button> */}
                        {/* <button className=" blue accent-4" onClick={()=>this.toggle()}>Cancelar</button> */}
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button>
                    </div>
                // </div> 
                }
            </div>
        )
    }
}

export default BorrarMonedas