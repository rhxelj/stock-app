import React, { Component} from 'react'
import request from 'superagent'
// import ReactTable from 'react-table'
import 'react-table/react-table.css'

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

import IpServidor from '../VariablesDeEntorno'

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
    rubroborrar = (idStkRubro,StkRubroCodGrp)=> {
        var url = IpServidor + '/stkrubroborrar/'        
        request
            // .delete(IpServidor + '/stkrubroborrar/?idStkRubro='+idStkRubro+'&StkRubroCodGrp='+StkRubroCodGrp)
            .get(url + '?idStkRubro='+idStkRubro+'&StkRubroCodGrp='+StkRubroCodGrp)
            .set('Content-Type', 'application/json')
            .then(function(res) {
                // res.body, res.headers, res.status
            })
                //alert("Borrado")
            .catch(err => {
                if (err.status === 411) 
                        {
                        alert('Código de Rubro Usado no se puede borrar') 
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
                <IconButton 
                    className=" red accent-4" 
                    onClick={()=>this.toggle()}
                    >
                    <DeleteIcon  />
                </IconButton>
            </div>
            :
                <div className="center-align">
                    {/* <i class="material-icons">add</i> */}
                    <p>Borrar ?</p>
                    {/* <button className="green "><i className="material-icons" onClick={()=>this.rubroborrar(this.props.idrubro,this.props.idgrupo)}>check</i></button> */}
                    {/* <button className=" red accent-4" onClick={()=>this.rubroborrar(this.props.idMonedas)}>Borrar</button> */}
                    {/* <button className=" blue accent-4" onClick={()=>this.toggle()}>Cancelar</button> */}
                    {/* <button className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></button> */}
                    <IconButton color="primary" onClick={()=>this.rubroborrar(this.props.idStkRubro,this.props.StkRubroCodGrp)}><DoneIcon/></IconButton>
                        <IconButton color="secondary" onClick={()=>this.toggle()}><ClearIcon/></IconButton>
                </div>
            // </div> 
            }
        </div>
    )
    }
}

export default StkRubroBorrar