import React, { Component} from 'react'
import request from 'superagent'
import Select from 'react-select'
/*
import  'materialize-css/dist/css/materialize.min.css'
import $ from 'jquery'
import M from 'materialize-css/dist/js/materialize.min.js'

*/

class AgregarStkRubro extends Component {
    preventDefault
    
    constructor(props){
        super(props)
        this.state = {
            idStkRubro : 0,
            StkRubroCodGrp :0,
            StkRubroDesc : '',
            StkRubroAbr : '',
            StkRubroProv : 0,
            StkRubroAncho : 0.00,
            StkRubroPres : 0.00,
            StkRubroUM : '',
            StkRubroCosto : 0.00,
            StkRubroTM : '',
                products:[],
            idStkGrupo : 0,
            StkGrupoDesc : '',
            StkGrupoAbr : '',
            StkGrupoContRubro : 0
                  }
        
        this.updateField = this.updateField.bind(this);
        this.submitPost = this.submitPost.bind(this);

     
    }    
    read = _ => {
        const url = 'http://192.168.2.102:4000/leerstkgrupo' ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            // const products = JSON.parse(res.text)
            // this.setState({products: products})
            const stkgrupo = JSON.parse(res.text)
            this.setState({stkgrupo: stkgrupo})
            alert(stkgrupo.StkGrupoDesc.target)
            for(var i=0; i < this.state.stkgrupo.length; i++) {
            var grupodesc = this.state.stkgrupo[i].StkGrupoDesc
            alert(grupodesc)
            }
            })
    }
 // Create
    addProduct = _=> { 
        const url = 'http://localhost:4000/agregarstkrubro' 
        request
        .post(url)
        .set('Content-Type', 'application/json')
     //   .send({ idStkGrupo: this.state.idStkGrupo})

        .send({ idStkRubro : this.state.idStkRubro})
        .send({ StkRubroCodGrp : this.state.StkRubroCodGrp})
        .send({ StkRubroDesc : this.state.StkRubroDesc})
        .send({ StkRubroAbr : this.state.StkRubroAbr})
        .send({ StkRubroProv : this.state.StkRubroProv})
        .send({ StkRubroAncho : this.state.StkRubroAncho})
        .send({ StkRubroPres : this.state.StkRubroPres})
        .send({ StkRubroUM : this.state.StkRubroUM})
        .send({ StkRubroCosto : this.state.StkRubroCosto})
        .send({ StkRubroTM : this.state.StkRubroTM})
       
            
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


/*
StkRubroCodGrp
StkRubroDesc
StkRubroAbr
StkRubroProv
StkRubroAncho
StkRubroPres
StkRubroUM
StkRubroCosto
StkRubroTM
*/

    render(){
        
        return( 
            <div className="section">
                <h1>Nuevo Rubro Stock</h1>
                
                <div className="row">
                    <form className="col s12" onSubmit={this.submitPost}>

   {/* <select className="custom-select" id="grupodesc" onSelect="bindDropDowns()">
      this.state.stkgrupo.map((stkgrupo) => 
      <option key={stkgrupo.grupodesc}>{stkgrupo.grupodesc}</option>
      );
   </select> */}



                 <div className="row">
                            <div className="input-field col s12">
                           


                            </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Código Grupo" id="StkRubroCodGrp" type="number" value={this.state.StkRubroCodGrp} onChange={this.updateField} />
                            </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Descripción" id="StkRubroDesc" type="text" value={this.state.StkRubroDesc} onChange={this.updateField}/>
                            </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Abreviatura" id="StkRubroAbr" type="text" value={this.state.StkRubroAbr} onChange={this.updateField}/>
                            </div>   
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Nro. Proveedor" id="StkRubroProv" type="number" value={this.state.StkRubroProv} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>


                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Ancho" id="StkRubroAncho" type="number" value={this.state.StkRubroAncho} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Presentación" id="StkRubroPres" type="number" value={this.state.StkRubroPres} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Unidad de Medida" id="StkRubroUM" type="number" value={this.state.StkRubroUM} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Costo" id="StkRubroCosto" type="number" value={this.state.StkRubroCosto} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Moneda" id="StkRubroTM" type="number" value={this.state.StkRubroTM} onChange={this.updateField} step="any"/>  
                            </div>
                        </div>

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

export default AgregarStkRubro