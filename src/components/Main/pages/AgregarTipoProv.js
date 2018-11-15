import React, { Component} from 'react'
import request from 'superagent'

class AgregarTipoProv extends Component {
    constructor(props){
        super(props)
        this.state = {
            idTipoProveed:0,
            TipoProveedDesc:'',

                products:[],
                
        }
        this.updateField = this.updateField.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }    
    
 // Create
    addProduct = _=> { 
        const url = 'http://localhost:4000/agregartipoprov' 
        request
        .post(url)
        .set('Content-Type', 'application/json')
        // .send({ idTipoProveed: this.state.idTipoProveed})
        .send({ TipoProveedDesc: this.state.TipoProveedDesc})    

            
        .set('X-API-Key', 'foobar')
        .then(function(res) {
        // res.body, res.headers, res.status
                console.log(res.status);
            });

    }   
   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitPost(e){
         e.preventDefault()
        
        
        this.addProduct()
        alert("Agregado Correctamente")
        this.props.history.push('/');
        console.log('Ejecute Submit')
       

    }

    componentDidMount(){
  
    }


    render(){
      
        return( 
            <div className="section">
                <h1>Nuevo Tipo Proveedor</h1>
                    
                <div className="row">
                    <form className="col s12" onSubmit={this.submitPost}>
                        <div className="row">
                           {/*  <div className="input-field col s12">
                                <input placeholder="Código" id="idTipoProveed" type="text" value={this.state.idTipoProveed} onChange={this.updateField} />
                            </div> */}
                            <div className="row">
                                 <div className="input-field col s12">
                                    <input placeholder="Descripción" id="TipoProveedDesc" type="text" value={this.state.TipoProveedDesc} onChange={this.updateField}/>
                                </div>
                                </div> 
                                </div>
                         
                      
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="btn">Create Post</button>
                            </div>   
                        </div>
                           
                    </form>
                    </div>
                    
                    
            </div>
        )
    }
}

export default AgregarTipoProv