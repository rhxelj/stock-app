import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from '../VariablesDeEntorno';
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CodigoError from '../../../lib/CodigoError'

class StkItemsBorrar extends Component {
    constructor(props){
        super(props)
        this.state = {
            url:'http://localhost:4000/stkgrupoborrar/',
            monedas:[],
            // filtrado:[],
            filtered:'',
            toggle: true,
            id:'',
            idStkItems: this.props.idStkItems,
            StkItemsGrupo: this.props.StkItemsGrupo,
            StkItemsRubro: this.props.StkItemsRubro


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
      borrarItem = ()=> {
    const url = IpServidor + '/stkitemsborrar/?id1=' + this.state.idStkItems + '&id2=' + this.state.StkItemsGrupo+'&id3=' + this.state.StkItemsRubro
        request
          .delete(url)
          .set('Content-Type', 'application/json')
          .then(function(res) {
          })
          .catch((err) => CodigoError(err))
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
                    <IconButton 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        <DeleteIcon  />
                    </IconButton>
                </div>
                :
                    <div className="center-align">
                        <p>Borrar ?</p>
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.borrarGrupo(this.props.idStkGrupo)}>check</i></button> */}
                        {/* <button className="green "><i className="material-icons" onClick={()=>this.borrarGrupo(this.props.StkItem)}>check</i></button>
                        <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                        <IconButton color="primary" onClick={()=>this.borrarItem()}><DoneIcon/></IconButton>
                        <IconButton color="secondary" onClick={()=>this.toggle()}><ClearIcon/></IconButton>
                    </div>
                }
            </div>
        )
    }
}

export default StkItemsBorrar