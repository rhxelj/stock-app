import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from './VariablesDeEntorno'

class AgregarUnidadMedidas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkunmedagregar',
            idStkUnMed:'',
            StkUnMedDesc:'',
        }
        this.updateField = this.updateField.bind(this);
        this.submitUnMed = this.submitUnMed.bind(this);
    }    

     
    // Agregar 
    add = _=> { 
        // const url = IpServidor +'/agregarstkunmed'
        request
        .post(this.state.url)
        .set('Content-Type', 'application/json')
        .send({ idStkUnMed: this.state.idStkUnMed})
        .send({ StkUnMedDesc: this.state.StkUnMedDesc})    
        .set('X-API-Key', 'foobar')
        .then(function(res) {
        // res.body, res.headers, res.status
            //     console.log('res.status  ' + res.status);
            //     console.log('esta aca');
            //     alert('Agrego correctamente');
        })

        .catch(err => {
            if (err.status === 409) 
                    {
                    alert('Código de Moneda EXISTENTE  ') 
                    }
                    else
                    {
                    if (err.status === 410) 
                            {
                            alert('Código de Moneda no puede tener más de 4 dígitos ') 
                            }     
               else { console.log('Error nro :  ' + err.status)}
                        }
            })
    }   
   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

    submitUnMed(e){
        e.preventDefault()
        this.add()
       this.props.read()
       this.props.click()
    }

          
    componentDidMount(){
    }


    render(){
      
        return( 
            <div className="section">
                <div className="row">
                    {/* <form className="col s12" onSubmit={this.submitUnMed}> */}
                    <form className="col s12" >
                        <div className="row">
                            <div className="input-field col s5">
                                <input 
                                    id="idStkUnMed"
                                    placeholder="Código"
                                    type="text"
                                    value={this.state.idStkUnMed} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkUnMedDesc').focus();}}
                                />
                            </div>
                            <div className="row">
                                 <div className="input-field col s12">
                                    <input 
                                        id="StkUnMedDesc"
                                        placeholder="Descripción"
                                        type="text"
                                        value={this.state.StkUnMedDesc}
                                        onChange={this.updateField}
                                        onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
                                    />
                                </div>
                            </div> 
                        </div>
                         
                        <div className="card-action">
                            <div className="row">
                                <div className="input-field col s12">
                                    {/* <button onClick={this.submitUnMed} className="btn">Agregar Moneda</button> */}
                                    {/* <button  onClick={this.submitUnMed} className="btn">Agregar Moneda</button> */}
                                    <input 
                                        className="btn"
                                        id="button--submit"  
                                        type="button" 
                                        value="Agregar" 
                                        onClick={this.submitUnMed}                                    
                                    />
                                    <a className="btn red"  onClick={this.props.click}>Cancelar</a>
                                </div>   
                            </div>
                        </div>
                           
                    </form>
                </div>
            </div>
        )
    }
}

export default AgregarUnidadMedidas