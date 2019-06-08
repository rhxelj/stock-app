import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from './VariablesDeEntorno';
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

class StkItemsBorrar extends Component {
    constructor(props){
        super(props)
        this.state = {
            url:'http://localhost:4000/stkgrupoborrar/',
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
      borrarGrupo = ()=> {
    //    const {id0,id1,id2} = {idprops}
       console.log("id0 id1 id2 ",this.props.StkItem[0],this.props.StkItem[1],this.props.StkItem[2])
       const url = IpServidor + '/stkitemsborrar/?id1=' + this.props.StkItem[0] + '&id2=' +this.props.StkItem[1]+'&id3='+this.props.StkItem[2]
        request
          .delete(url)
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
                        <DeleteIcon  />
                    </button>
                </div>
                :
                    <div className="center-align">
                        <p>Borrar ?</p>
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.borrarGrupo(this.props.idStkGrupo)}>check</i></button> */}
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.borrarGrupo(this.props.StkItem)}>check</i></button>
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                        <Button color="primary" onClick={()=>this.deleteProduct(this.props.idMonedas)}><DoneIcon/></Button>
                        <Button color="secondary" onClick={()=>this.toggle()}><ClearIcon/></Button>
                    </div>
                }
            </div>
        )
    }
}

export default StkItemsBorrar