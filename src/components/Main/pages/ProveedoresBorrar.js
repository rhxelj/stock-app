import React, { Component} from 'react'
import request from 'superagent'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'

class ProveedoresBorrar extends Component {
    constructor(props){
        super(props)
        this.state = {
            proveedores:[],
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
    read = _ => {
        const url = IpServidor + '/proveedoresleer'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const proveedores = JSON.parse(res.text)
            this.setState({proveedores: proveedores})
            // this.setState({filtrado: proveedores})
            })
    }

    // //Delete
      deleteProduct = (id)=> {
        
        const { product } = this.state;
        request
          .delete(IpServidor + '/proveedoresborrar/'+id)
          .set('Content-Type', 'application/json')
          //.set('X-API-Key', 'foobar')
          .then(function(res) {
        // res.body, res.headers, res.status
          })
          //alert("Borrado")

          .catch(err => {
            if (err.status === 411) 
                    {
                    alert('Código de Proveedor Usado no se puede borrar  ') 
                    }
                })
          this.toggle()
          this.read()
      }
    

    componentDidMount(){
         this.read()
    }

    render(){
        
        return( 
            <div>
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
                <div className="center-align">
                    {/* <i class="material-icons">add</i> */}
                    <p>Borrar ?</p>
                    <button className="green "><i className="material-icons" onClick={()=>this.deleteProduct(this.props.idProveedores)}>check</i></button>
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

export default ProveedoresBorrar