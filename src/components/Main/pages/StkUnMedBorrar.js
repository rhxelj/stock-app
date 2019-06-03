import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from './VariablesDeEntorno'
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
// import IpServidor from './VariablesDeEntorno'

class BorrarUnidadMedidas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkunmedborrar/',
            monedas:[],
            // filtrado:[],
            filtered:'',
            toggle: true,
            idStkUnMed:props.idStkUnMed
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
       
       const url = IpServidor +'/stkunmedborrar/' + id
        request
          .delete(url)
          .set('Content-Type', 'application/json')
          .then(function(res) {
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
                    {/* <button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        Borrar
                    </button> */}
                     <Button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        <DeleteIcon  />
                    </Button>
                </div>
                :
                   
                    <div className="center-align">
                        <p>Borrar ?</p>
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.delete(this.props.id)}>check</i></button>
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                        <Button color="primary" onClick={()=>this.delete(this.props.idStkUnMed)}><DoneIcon/></Button>
                        <Button color="secondary" onClick={()=>this.toggle()}><ClearIcon/></Button>
                    </div>
                }
            </div>
        )
    }
}

export default BorrarUnidadMedidas