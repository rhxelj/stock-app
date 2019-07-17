import React, { Component} from 'react'
import request from 'superagent'
import IpServidor from './VariablesDeEntorno'

class AgregarComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            idTipoMonedas:'',
            TipoMonedasDescripcion:'',
            TipoMonedasCotizacion:0.00,
                products:[],
                
        }
        this.updateField = this.updateField.bind(this);
        this.submitPost = this.submitPost.bind(this);
    }    

// alert(ipservidor);
    // Create
    addProduct = _=> { 
        const url = IpServidor + '/agregarmonedas' 
        request
        .post(url)
        .set('Content-Type', 'application/json')
        .send({ idTipoMonedas: this.state.idTipoMonedas})
        .send({ TipoMonedasDescripcion: this.state.TipoMonedasDescripcion})    
        .send({ TipoMonedasCotizacion: this.state.TipoMonedasCotizacion})
            
        .set('X-API-Key', 'foobar')
        
        .then(function(res) {
        // res.body, res.headers, res.status
                console.log('res.status  ' + res.status);
                console.log('esta aca');
                alert('Agrego correctamente');
            })
        .catch(err => {
            if (err.status === 409) 
                    {
                    alert('Código de Moneda ya Cargado  ') 
                    }
                    else
                    {
                    if (err.status === 410) 
                            {
                            alert('Código de Moneda no puede tener más de 3 dígitos ') 
                            }     
            
               else { 'Error nro :  ' + err.status}
                        }
            })
             

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
      //  alert("Agregado Correctamente")
        this.props.history.push('/');
        console.log('Ejecute Submit')
       

    }

    componentDidMount(){
  
    }


    render(){
      
        return( 
            <div className="section">
                <h1>Nuevo Moneda</h1>
                    
                <div className="row">
                    <form className="col s12" onSubmit={this.submitPost}>
                        <div className="row">
                            <div className="input-field col s5">
                                <input placeholder="Código" id="idTipoMonedas" type="text" value={this.state.idTipoMonedas} onChange={this.updateField} />
                            </div>
                            <div className="row">
                                 <div className="input-field col s12">
                                    <input placeholder="Descripción" id="TipoMonedasDescripcion" type="text" value={this.state.TipoMonedasDescripcion} onChange={this.updateField}/>
                                </div>
                                 
                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Cotización" id="TipoMonedasCotizacion" type="number" value={this.state.TipoMonedasCotizacion} onChange={this.updateField} step="any"/>  
                         
                                </div>
 
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

export default AgregarComponent