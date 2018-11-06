import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from './VariablesDeEntorno'

class AgregarMonedas extends Component {
    constructor(props){
        super(props)
        this.state = {
            url: IpServidor +'/stkmonedasagregar',
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion:0.00,
        }
        this.updateField = this.updateField.bind(this);
        this.submitMoneda = this.submitMoneda.bind(this);
    }    

    // Agregar Moneda
    addMoneda = _=> { 
        // const url = IpServidor +'/agregarmonedas' 
        request
        .post(this.state.url)
        .set('Content-Type', 'application/json')
        .send({ idStkMonedas: this.state.idStkMonedas})
        .send({ StkMonedasDescripcion: this.state.StkMonedasDescripcion})    
        .send({ StkMonedasCotizacion: this.state.StkMonedasCotizacion})
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

    submitMoneda(e){
        e.preventDefault()
        this.addMoneda()
       this.props.read()
       this.props.click()
    }

          
    componentDidMount(){
    }


    render(){
      
        return( 
            <div className="section">
                <div className="row">
                    {/* <form className="col s12" onSubmit={this.submitMoneda}> */}
                   
                   
                    <form className="col s12" >
                        <div className="row">
                            <div className="input-field col s5">
                                <input 
                                    id="idStkMonedas"
                                    placeholder="Código"
                                    type="text"
                                    value={this.state.idStkMonedas} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasDescripcion').focus();}}
                                />
                            </div>
                            <div className="row">
                                 <div className="input-field col s12">
                                    <input 
                                        id="StkMonedasDescripcion"
                                        placeholder="Descripción"
                                        type="text"
                                        value={this.state.StkMonedasDescripcion}
                                        onChange={this.updateField}
                                        onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('StkMonedasCotizacion').focus();}}
                                    />
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input 
                                            id="StkMonedasCotizacion"  
                                            placeholder="Cotización" 
                                            type="number" 
                                            value={this.state.StkMonedasCotizacion} 
                                            onChange={this.updateField} 
                                            step="any"
                                            onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('button--submit').focus();}}
                                        />  
                                    </div>
                                </div>
                            </div> 
                        </div>
                         
                        <div className="card-action">
                            <div className="row">
                                <div className="input-field col s12">
                                    {/* <button onClick={this.submitMoneda} className="btn">Agregar Moneda</button> */}
                                    {/* <button  onClick={this.submitMoneda} className="btn">Agregar Moneda</button> */}
                                    <input 
                                        className="btn"
                                        id="button--submit"  
                                        type="button" 
                                        value="Agregar Moneda" 
                                        onClick={this.submitMoneda}                                    
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

export default AgregarMonedas