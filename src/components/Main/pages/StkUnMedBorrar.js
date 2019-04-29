import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from './VariablesDeEntorno'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

class BorrarUnidadMedidas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkunmedborrar/',
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

    // //Delete
      delete = (id)=> {
       
 //       const { moneda } = this.state;
        request
          .delete(this.state.url+id)
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

    componentDidMount(){
        // this.read()
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
                        <p>Borrar ?</p>
                        <button className="green "><i className="material-icons" onClick={()=>this.delete(this.props.id)}>check</i></button>
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button>
                    </div>
                }
            </div>
        )
    }
}

export default BorrarUnidadMedidas