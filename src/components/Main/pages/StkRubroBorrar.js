import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'
import IpServidor from './VariablesDeEntorno'

class StkRubroBorrar extends Component {
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
   

        //Delete
    rubroborrar = (idrubro,idgrupo)=> {
        // console.log("id a borrar :"+id)
        // const { product } = this.state;
        request
            // .delete(IpServidor + '/stkrubroborrar/?idrubro='+idrubro+'&idgrupo='+idgrupo)
            .get(IpServidor + '/stkrubroborrar/?idrubro='+idrubro+'&idgrupo='+idgrupo)
            .set('Content-Type', 'application/json')
            .then(function(res) {
                // res.body, res.headers, res.status
            })
                //alert("Borrado")
            .catch(err => {
                if (err.status === 411) 
                        {
                        alert('Código de Rubro Usado no se puede borrar  ') 
                        }
                    })
                    this.props.read()
                    this.toggle()
    }
    

    // componentDidMount(){
    //      this.read()
    // }

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
                    <button className="green "><i className="material-icons" onClick={()=>this.rubroborrar(this.props.idrubro,this.props.idgrupo)}>check</i></button>
                    {/* <button className=" red accent-4" onClick={()=>this.rubroborrar(this.props.idMonedas)}>Borrar</button> */}
                    {/* <button className=" blue accent-4" onClick={()=>this.toggle()}>Cancelar</button> */}
                    <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button>
                </div>
            // </div> 
            }
        </div>
    )
    }
}

export default StkRubroBorrar