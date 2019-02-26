import React, { Component} from 'react'
import request from 'superagent'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { QRCode } from "react-qr-svg";

  
class StkMovimiento extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            grupostk:0,
            rubrostk:0,
            itemsstk:0,
            stkgrupo:[],
            stkrubro:[],
            stkrubroRyG:[],
            stkitemsRyG:[],
            stkitemsRGI:[],
            StkRubroAbr1:'',
            StkRubroAncho:0.0,
            StkRubroAncho1:0.0,
            StkRubroPres1:'',
            StkRubroUM1: '', 
            StkRubroCosto1: 0.0,
            StkRubroTM1:'',
            StkItemsCantidad1:0.0,
            StkItemsFAct1: '', //new Date(),
            StkItemsMin1:0.0,
            StkItemsMax1:0.0,
            proveedor:[],
            StkRubroProv1:0,
            DescProv:'',
            CantMod:-0.00,
            NuevaCant:0.0,
            marcagrupo : false,
            marcarubro : false,
            marcarubroRyG : false,
            marcaitems : false,
           
        }
        this.updateField = this.updateField.bind(this);
    } 
    marcagrupo(event){
        this.setState(prevState => ({
            marcagrupo: !prevState.marcagrupo
          }))
    }
    marcarubro(event){
        this.setState(prevState => ({
            marcarubro: !prevState.marcarubro
          }))
    }
    marcarubroRyG(event){
        this.setState(prevState => ({
            marcarubroRyG: !prevState.marcarubroRyG
          }))
                    
    }
    marcaitems(event){
        this.setState(prevState => ({
            marcaitems: !prevState.marcaitems
          }))
                    
    }
    leestkgrupo = _ => {
        const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkgrupo = JSON.parse(res.text)
            this.setState({stkgrupo: stkgrupo})
            
            })
        this.marcagrupo()
           
    }

    leestkrubro = _ => {
        const url = 'http://localhost:4000/stkrubroleecodgrupo/'+this.state.grupostk ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkrubro = JSON.parse(res.text)
            this.setState({stkrubro: stkrubro})
            })
            this.marcagrupo()
            this.marcarubro()
    }
    leestkrubropRyG = _ => {
        //desde Postman http://localhost:4000/stkrubroleecodgryrb/?id1=10&id2=1
        const url = 'http://localhost:4000/stkrubroleecodgryrb/?id1='+this.state.rubrostk+'&id2='+this.state.grupostk ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkrubroRyG = JSON.parse(res.text)
            this.setState({stkrubroRyG: stkrubroRyG})
            this.setState({StkRubroAbr1: this.state.stkrubroRyG[0].StkRubroAbr}) 
            this.setState({StkRubroAncho1: this.state.stkrubroRyG[0].StkRubroAncho}) 
            this.setState({StkRubroPres1: this.state.stkrubroRyG[0].StkRubroPres}) 
            this.setState({StkRubroUM1: this.state.stkrubroRyG[0].StkRubroUM}) 
            this.setState({StkRubroCosto1: this.state.stkrubroRyG[0].StkRubroCosto}) 
            this.setState({StkRubroTM1: this.state.stkrubroRyG[0].StkRubroTM}) 
            this.setState({StkRubroProv1: this.state.stkrubroRyG[0].StkRubroProv}) 
            this.leeproveedor()
            this.leestkitems()
            })
           
            this.marcarubro()

    }

    leeproveedor = _ => {
        if (this.state.StkRubroProv1 !== 0) {
        const url = 'http://localhost:4000/proveedoresleercod/'+this.state.StkRubroProv1 ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const proveedor = JSON.parse(res.text)
            this.setState({proveedor: proveedor})
            this.setState({DescProv: this.state.proveedor[0].ProveedoresDesc}) 
            })
            
        }
    }

    leestkitems = _ => {
        //desde Postman http://localhost:4000/stkrubroleecodgryrb/?id1=10&id2=1
        const url = 'http://localhost:4000/stkitemsleecodgryrb/?id2='+this.state.grupostk+'&id3='+this.state.rubrostk  ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkitemsRyG = JSON.parse(res.text)
            this.setState({stkitemsRyG: stkitemsRyG})
            })
            this.marcaitems()
    }

    leestkitemscodgrrbit = _ => {
        
      
        if (this.state.itemsstk !== 0) {
            
        //desde Postman //stkitemsleecodgrrbit/?id1=3&id2=1&id3=1
        const url = 'http://localhost:4000/stkitemsleecodgrrbit/?id1='+this.state.itemsstk+'&id2='+this.state.grupostk +'&id3='+this.state.rubrostk ; //'http://localhost:3000/data'
        request
        .get(url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const stkitemsRGI = JSON.parse(res.text)
            this.setState({stkitemsRGI: stkitemsRGI})
            this.setState({StkItemsCantidad1: this.state.stkitemsRGI[0].StkItemsCantidad}) 
            this.setState({StkItemsFAct1: this.state.stkitemsRGI[0].StkItemsFAct}) 
            this.setState({StkItemsMin1: this.state.stkitemsRGI[0].StkItemsMin}) 
            this.setState({StkItemsMax1: this.state.stkitemsRGI[0].StkItemsMax}) 
            var recorte = this.state.StkItemsFAct1.substr(0,10);
            this.setState({StkItemsFAct1: recorte})
          
            })

            
            
            this.marcaitems()
    }
}

modcantstkitem = _ => {
    // console.log('modcantstkitem')
    var CantAct = Number(this.state.StkItemsCantidad1) 
    var CantMode = Number(this.state.CantMod)
    CantAct = CantAct + CantMode
    // var fecha = new Date()
//     console.log('fecha 2 ' + fecha)
//    var options = {year: 'numeric', month: '2-digit', day: '2-digit' };
//    var dia = fecha.getDate() + 1
//    var mes =  parseInt(fecha.getMonth())
//    var anio = fecha.getFullYear()
//    fecha = new Date(Date.UTC(anio, mes, dia))
//    fecha = fecha.toLocaleDateString('en-US', options)

//     console.log('fecha  ' + fecha)
    // var fecha = new Date();
    // console.log( fecha.getFullYear() + "/" + (fecha.getMonth() +1) + "/" +  fecha.getDate())
    const url = 'http://localhost:4000/stkitemsmodificacant/?id1='+this.state.itemsstk+'&id2='+this.state.grupostk +'&id3='+this.state.rubrostk ; //'http://localhost:3000/data'
    request
    .post(url)
    .set('Content-Type', 'application/json')
    .send({StkItemsCantidad: CantAct})
    // .send({StkItemsFAct: fecha})
    .then(function(res) {
        // res.body, res.headers, res.status
            });
          
        this.leestkitemscodgrrbit()   
}

handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    if (prop === 'grupostk') 
    {
    if (this.state.grupostk !== 0) {
        this.setState({rubrostk : 0})
        this.marcarubro()
        this.leestkrubro()
    }
    }
    if (prop === 'rubrostk') 
    {
    if (this.state.rubrostk !== 0) {    
        this.leestkrubropRyG()
        this.setState({itemsstk : 0})
        this.leestkitems()
    }
        }
    if (prop === 'itemsstk')
    {
        this.leestkitemscodgrrbit()
        
    }
   
   }
 
updateField(field){
    this.setState({
        [field.target.id]: field.target.value,
    })
    this.setState({CantMod : field.target.value})
}

  
componentDidMount(){
   this.leestkgrupo()  
}    

cargarubro() {
    this.leestkrubro()
 }

 cargarubropRyG() {
    this.leestkrubropRyG()
 }

  DatePickers(props) {
    const { classes } = props
  }

render () {
        if (this.state.grupostk !== 0 && this.state.marcagrupo)
        {
            this.leestkrubro()
        }
       
        if (this.state.grupostk !== 0 && this.state.rubrostk !== 0 && this.state.marcarubro)
        {
            this.cargarubropRyG()
        }
        if (this.state.grupostk !== 0 && this.state.rubrostk !== 0 && this.state.itemsstk !== 0 && this.state.marcaitems)
        {
        
            this.leestkitemscodgrrbit()
           
        }
    return (
      
        <div>
        <form>
                <FormControl>
                    <InputLabel >Grupo</InputLabel>
                    <Select
                        value={this.state.grupostk}
                        onChange={this.handleChange('grupostk')}
                        inputProps={{
                            name: 'grupo',
                            id: 'grupoeleg',
                        }} 
                        >
                        {this.state.stkgrupo.map(option => (
                            <MenuItem 
                            key={option.idStkGrupo}
                            value={option.idStkGrupo}>
                                {option.StkGrupoDesc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel >Rubro</InputLabel>
                    <Select
                        value={this.state.rubrostk}
                        onChange={this.handleChange('rubrostk')}
                        >
                        {this.state.stkrubro.map(option => (
                            <MenuItem
                            key={option.idStkRubro}
                            value={option.idStkRubro}>
                                {option.StkRubroDesc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>  
                <FormControl>        
                    <InputLabel >Items</InputLabel>
                    <Select
                        value={this.state.itemsstk}
                        onChange={this.handleChange('itemsstk')}
                        >
                        {this.state.stkitemsRyG.map(option => (
                            <MenuItem 
                            key={option.idStkItems}
                            value={option.idStkItems}>
                                {option.StkItemsDesc}
                            </MenuItem>
                        ))}
                       
                    </Select>
                  
                </FormControl>
             
                <FormControl>
                    <TextField
                        id="Abrev"
                        label="Abrev"
                        value={this.state.StkRubroAbr1}
                        disabled
                    >
                    </TextField>
                    <TextField
                        id="Ancho"
                        label="Ancho"
                        value={this.state.StkRubroAncho1}
                        disabled
                            >
                    </TextField>
                    <TextField
                        id="Presentacion"
                        label="Presentación"
                        value={this.state.StkRubroPres1}
                        disabled
                            >
                    </TextField>
                    <TextField
                        id="Un.Med."
                        label="Un.Med."
                        value={this.state.StkRubroUM1}
                        disabled
                            >
                    </TextField>
                    <TextField
                        id="Proveedor"
                        label="Proveedor"
                        value={this.state.DescProv}
                        disabled                          
                            >
                    </TextField>
                    <TextField
                        id="Costo"
                        label="Costo"
                        value={this.state.StkRubroCosto1}
                        disabled
                            >
                    </TextField>             
                    <TextField
                        id="Moneda"
                        label="Moneda"
                        value={this.state.StkRubroTM1}
                        disabled    
                            >
                    </TextField>   
                </FormControl>  
                <FormControl>
                    <TextField
                        id="Cantidad"
                        label="Cant.Act."
                        value={this.state.StkItemsCantidad1}
                        disabled
                            >
                    </TextField>
                    <TextField
                        id="FechaAct"
                        label="Fecha Actualización"
                        type="date"
                        value={this.state.StkItemsFAct1}
                        InputLabelProps={{
                            shrink: true,
                            }}
                        disabled
                        >
                    </TextField>
                    <TextField
                        id="MinStock"
                        label="Mín.Stock"
                        value={this.state.StkItemsMin1}
                        disabled
                            >
                    </TextField>
                    {this.state.StkItemsCantidad1 > this.state.StkItemsMax1
                    ?
                    <TextField
                        id="MaxStock"
                        label="Máx.Stock"
                        value={this.state.StkItemsMax1}
                        style={{background:"red"}}
                        disabled
                            >
                    </TextField>
                    :
                    <TextField
                    id="MaxStock"
                    label="Máx.Stock"
                    value={this.state.StkItemsMax1}
                    style={{background:"blue"}}
                    disabled
                        >
                </TextField>
                    }
                </FormControl>    
                <FormControl>
                    <TextField
                        id="CantMod"
                        label="Cantidad + o -"
                        type="number"
                        fullWidth
                        placeholder="Descripción"
                        onChange={this.updateField}
                        value={this.state.CantMod}
                    >
                    </TextField>
                    <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="L"
            style={{ width: 100 }}
            value={this.state.CantMod + this.state.grupostk + ' ' + this.state.rubrostk + ' rogelio '}
        />
                        <DialogActions>
                        <Button variant="contained" color="primary"  onClick={this.modcantstkitem}>
                            Confirmar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.props.click}>
                            Cancelar
                        </Button>
                        </DialogActions>
                </FormControl>         


      </form>
      </div>
      
    )
       
    }
   
}

{/* <TextField
id="grupostk" 
select 
label= 'Grupo'
value={this.state.grupostk}
onChange = {this.handleChange('grupostk')}> 
{this.state.stkgrupo.map(option => (
    <MenuItem
    key={option.idStkGrupo}
    value={option.idStkGrupo}>
          {option.StkGrupoDesc}
    </MenuItem>
))}
</TextField>
<TextField
id="rubrostk" 
select 
label= 'Rubro'
value={this.state.rubrostk}
onChange = {this.handleChange('rubrostk')}>
{this.state.stkrubro.map(option => (
    <MenuItem
    key={option.idStkRubro}
    value={option.idStkRubro}>
          {option.StkRubroDesc}
    </MenuItem>
))}
</TextField> */}

{/* <FormControl>
<InputLabel >Grupo</InputLabel>
<Select
  value={this.state.grupostk}
  onChange={this.handleChange('grupostk')}
  inputProps={{
    name: 'grupo',
    id: 'grupo-eleg',
  }} >
  {this.state.stkgrupo.map(option => (
      <MenuItem 
      key={option.idStkGrupo}
      value={option.idStkGrupo}>
          {option.StkGrupoDesc}
      </MenuItem>
  ))}
  {this.marcaleerubro}
</Select>
</FormControl>
<FormControl>
<InputLabel >Rubro</InputLabel>
<Select
  value={this.state.rubrostk}
  onChange={this.handleChange('rubrostk')}
  input={<Input name="grupo" id="grupo-eleg" />}
  
  inputProps={{
    name: 'rubro',
    id: 'rubro-eleg',
  }} >
 
  {this.state.stkrubro.map(option => (
      <MenuItem
      key={option.idStkRubro}
      value={option.idStkRubro}>
          {option.StkRubroDesc}
      </MenuItem>
  ))}
</Select>
</FormControl> */}
   {/* <Moment
                     //   label="Fecha.Act."
                        format="DD-MM-YYYY" 
                        id="FechaAct"
                        withTitle= {true}
                        disabled
                        >{this.state.StkItemsFAct1}
                    </Moment> */}
export default StkMovimiento