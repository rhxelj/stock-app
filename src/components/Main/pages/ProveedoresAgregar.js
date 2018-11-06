import React, { Component} from 'react'
import request from 'superagent'
// import Dropdown from 'react-dropdown'
import IpServidor from './VariablesDeEntorno'

class ProveedoresAgregar extends Component {
    constructor(props){
        super(props)
        this.state = {
            provdesc:'',
            provtipo:1,
            provcuit:'',
            provcalle:'',
            provnrocalle:0,
            provpiso:'',
            provdto:'',
            provcodpostal:'',
            provlocalidad:'',
            provprovincia:'',
            provtelefono:'',
            provcontacto:'',
            provmail:'',
            provpagweb:'',
            provcodmon:'',
            
                products:[],
                tipoprov:[]
        }
        this.updateField = this.updateField.bind(this);
        this.submitProveedor = this.submitProveedor.bind(this);
       //  this.cargatipo = this.cargatipo.bind(this);
    }    
    
 // Create
    addProveedor = _=> { 
        const url = IpServidor + '/proveedoresagregar' 
        request
        .post(url)
        .set('Content-Type', 'application/json')
        .send({ provdesc: this.state.provdesc})
        .send({ provtipo: this.state.provtipo})
        .send({ provcuit: this.state.provcuit})        
        .send({ provcalle: this.state.provcalle})
        .send({ provnrocalle: this.state.provnrocalle})
        .send({ provpiso: this.state.provpiso})
        .send({ provdto: this.state.provdto})
        .send({ provcodpostal: this.state.provcodpostal})
        .send({ provlocalidad: this.state.provlocalidad})
        .send({ provprovincia: this.state.provprovincia})
        .send({ provtelefono: this.state.provtelefono})
        .send({ provcontacto: this.state.provcontacto})
        .send({ provmail: this.state.provmail})
        .send({ provpagweb: this.state.provpagweb})
        .send({ provcodmon: this.state.provcodmon})
        .set('X-API-Key', 'foobar')
        .then(function(res) {
        // res.body, res.headers, res.status
                // console.log(res.status);
            });

    }   
    

    
    leetprov = _ => {
        const url = IpServidor + '/stktipoproveedleer'; 
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            // const products = JSON.parse(res.text)
            // this.setState({products: products})
            const tipoprov = JSON.parse(res.text)
            this.setState({tipoprov: tipoprov})
            alert('oeoeoeoe  ' + this.state.tipoprov.StkTipoProveedDesc)
            })
    } 

   
    updateField(field){
        this.setState({
            [field.target.id]: field.target.value,
        })
        console.log('ESTADO :'+field.target.id + ' Valor :'+field.target.value)
    }

	toggleList = () => {
		this.setState({ isOpen: !this.state.isOpen });
	}

    submitProveedor(e){
        e.preventDefault()
        this.addProveedor()
       this.props.read()
       this.props.click()
    }


    componentDidMount(){
        this.leetprov()
    }
   
// cargatipo(tipos) {
//   const  tipo = _ => {const tipo = this.state.tipoprov.map(prov=>{
     
//         <option value={prov.TipoProveedDesc}>{prov.TipoProveedDesc}</option>
//         {console.log('dentro de tipo ' + prov.TipoProveedDesc)}
//     })
 
// }
// }
    render(){
      

        // const tipoproveedor = this.state.tipoprov

        return( 
            
            // <div className="section">
            // <h1>Nuevo Proveedoreee</h1>
            // <div className="row">
            //  <div className="input-field col s12">
            //     <label htmlFor='Tipdsdso'>Tipo</label>
            //     <Dropdown options={tipoproveedor} 
            //         onChange={this._onSelect} 
            //         value={defaultOption} placeholder="Select an option" />
            //      {/* <select name="Tipo" value={this.tipo} onChange={this.leetprov}  >
            //         <option value={this.tipo}></option> 
                  
            //     </select>  */}
            //     </div>
            // </div>

         
      
                    
                <div className="row">
                    <form className="col s12" onSubmit={this.submitPost}>
                            
                        {/* Bloque de select para hacer pruebas --INICIO */}
                            <div className="row">
                                <div className="input-field col s12">
                                    <h1>SELECT TABLE</h1>
                                    <select>
                                    <option value="0" >Choose your option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    </select>
                                    <label>Materialize Select</label>
                                </div>
                            </div>
                        {/* Bloque de select para hacer pruebas -- FIN*/}
                            
                            <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Descripción" 
                                    id="provdesc" 
                                    type="text" 
                                    value={this.state.provdesc} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provtipo').focus();}} />
                                </div> 
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Tipo" 
                                    id="provtipo" 
                                    type="number" 
                                    value={this.state.provtipo} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provcuit').focus();}}/>   
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="C.U.I.T." 
                                    id="provcuit" 
                                    type="text" 
                                    value={this.state.provcuit} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provcalle').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Calle" 
                                    id="provcalle" 
                                    type="text" 
                                    value={this.state.provcalle} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provnrocalle').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Nro" 
                                    id="provnrocalle" 
                                    type="number" 
                                    value={this.state.provnrocalle} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provpiso').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Piso" 
                                    id="provpiso" 
                                    type="text" 
                                    value={this.state.provpiso}
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provdto').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Dto" 
                                    id="provdto" 
                                    type="text" 
                                    value={this.state.provdto} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provcodpostal').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Cód.Postal" 
                                    id="provcodpostal" 
                                    type="text" 
                                    value={this.state.provcodpostal} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provlocalidad').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Localidad" 
                                    id="provlocalidad" 
                                    type="text" 
                                    value={this.state.provlocalidad} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provprovincia').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Provincia" 
                                    id="provprovincia" 
                                    type="text" 
                                    value={this.state.provprovincia} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provtelefono').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Teléfono" 
                                    id="provtelefono" 
                                    type="text" 
                                    value={this.state.provtelefono} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provcontacto').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Contacto" 
                                    id="provcontacto"
                                    type="text" 
                                    value={this.state.provcontacto} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provmail').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Mail" 
                                    id="provmail" 
                                    type="text" 
                                    value={this.state.provmail} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provpagweb').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Pág.web" 
                                    id="provpagweb" 
                                    type="text" 
                                    value={this.state.provpagweb} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('provcodmon').focus();}}/>
                                </div>
                                </div>
                                <div className="row">
                                <div className="input-field col s12">
                                    <input placeholder="Moneda" 
                                    id="provcodmon" 
                                    type="text" 
                                    value={this.state.provcodmon} 
                                    onChange={this.updateField}
                                    onKeyPress={(event) => {if (event.key === 'Enter') document.getElementById('bAgrProv').focus();}}/>
                                </div>
                                </div>
                                <div className="card-action">
                                <div className="row">
                                <div className="input-field col s12">
                                    <input 
                                        className="btn"
                                        id="bAgrProv"  
                                        type="button" 
                                        value="Agregar Proveedor" 
                                        onClick={this.submitProveedor}                                    
                                    />
                                    <a className="btn red"  onClick={this.props.click}>Cancelar</a>
                                </div>   
                                </div>
                                </div>
                             {/* <div className="row">
                            <div className="input-field col s12">
                                <button className="btn">Create Post</button>
                            </div>   
                        </div> */}
                           
                    </form>
                </div>
        )
    }
}

export default ProveedoresAgregar