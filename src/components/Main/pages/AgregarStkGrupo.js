import React, { Component} from 'react'
import request from 'superagent'
// import 'materialize-css/sass/components/forms/_select.scss';

class AgregarStkGrupo extends Component {
    constructor(props){
        super(props)
        this.state = {
            // idStkGrupo:0,
            StkGrupoDesc:'',
            StkGrupoAbr:'',
            StkGrupoContRubro:0,
                products:[],
                
                  }
        this.updateField = this.updateField.bind(this);
        this.submitPost = this.submitPost.bind(this);

    }   



    // Create
    addProduct = _=> { 
        const url = 'http://localhost:4000/agregarstkgrupo' 
        request
        .post(url)
        .set('Content-Type', 'application/json')
        // .send({ idStkGrupo: this.state.idStkGrupo})
        .send({ StkGrupoDesc: this.state.StkGrupoDesc})    
        .send({ StkGrupoAbr: this.state.StkGrupoAbr})    
        .send({ StkGrupoContRubro: this.state.StkGrupoContRubro})
            
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
            <h1>Nuevo Grupo Stockfffff</h1>     
            

      

            <div class="input-field col s12">
          
                <div className="row">
                    <form className="col s12" onSubmit= {this.submitPost}>


                          {/* <div className="row">
                              <div className="input-field col s12">
                                  <input placeholder="Código" id="idStkGrupo" type="number" value={this.state.idStkGrupo} onChange={this.updateField} />
                              </div> */}
                              <div className="row">
                                   <div className="input-field col s12">
                                      <input placeholder="Descripción" id="StkGrupoDesc" type="text" value={this.state.StkGrupoDesc} onChange={this.updateField}/>
                                  </div>
                               <div className="row">
                                   <div className="input-field col s12">
                                      <input placeholder="Abreviatura" id="StkGrupoAbr" type="text" value={this.state.StkGrupoAbr} onChange={this.updateField}/>
                                  </div>   
                              <div className="row">
                                  <div className="input-field col s12">
                                      <input placeholder="Nro. Subrubro" id="StkGrupoContRubro" type="number" value={this.state.StkGrupoContRubro} onChange={this.updateField} step="any"/>  
                         
                                  </div>
 
                                  </div>
                        
                                  </div> 
                                  </div>
                                  {/* </div> */}
                                  
                                  <div className="row">
                            <div className="input-field col s12">
                                <button className="btn">Agregar</button>
                            </div>   
                        </div>
                           
                    </form>
                    </div>
                    
                    
            </div>
   
            </div>
        )
    }
}

export default AgregarStkGrupo