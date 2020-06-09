import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
import CodigoError from "../../../../lib/CodigoError";

// import "react-table/react-table.css";
// // import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Grid from '@material-ui/core/Grid';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

// class StkItemsAgregar extends Component {
export function StkItemsAgregar(props) {
  const {
    StkItemsGrupo,
    StkItemsRubro,
    StkItemsDesc,
    StkItemsCantidad,
    StkItemsFAct,
    StkItemsMin,
    StkItemsMax,
    stkrubro,
    stkgrupo,
  } = props;

  // Create

  //  const  add = _ => {
  //     const url = IpServidor + '/stkitemsagregar/?StkItemsGrupo=' + this.state.StkItemsGrupo + '&StkItemsRubro=' + this.state.StkItemsRubro

  //     request
  //       .post(url)
  //       // .put(url)
  //       .set("Content-Type", "application/json")
  //       .send({ StkItemsDesc: this.state.StkItemsDesc})
  //       .send({ StkItemsCantidad: this.state.StkItemsCantidad})
  //       .send({ StkItemsMin: this.state.StkItemsMin})
  //       .send({ StkItemsMax: this.state.StkItemsMax})
  //       // .send({ StkItemsObserv: this.state.StkItemsObserv})
  //       // .set("X-API-Key", "foobar")
  //       .then(function(res) {})
  //       .catch((err) => CodigoError(err))
  //   };

  // Lee tipo Grupo inicio
  // const leestkgrupo = _ => {
  //   // const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
  //   const url = IpServidor + "/stkgrupoleer";
  //   request
  //   .get(url)
  //   .set('Content-Type', 'application/json')
  //   .then(res=> {
  //       const stkgrupo = JSON.parse(res.text);
  //       this.setState(()=>{ return {stkgrupo: stkgrupo}});

  //       })

  //   }
  // Lee tipo Grupo Fin

  // Lee tipo Rubro inicio

  // const stkrubroleecodgrupo = (id) => {
  //   // const url = 'http://localhost:4000/stkgrupoleer' ; //'http://localhost:3000/data'
  //   const url = IpServidor + "/stkrubroleecodgrupo/"+id;
  //   request
  //   .get(url)
  //   .set('Content-Type', 'application/json')
  //       .then(res=> {
  //         const stkrubro = JSON.parse(res.text);
  //         this.setState(()=>{ return {stkrubro: stkrubro}});

  //         console.log('dentro de leestkrubro')
  //         console.log(this.state.stkrubro)
  //       })
  //   }

  // Lee tipo Rubro Fin

  // updateField(field) {
  //   this.setState({
  //     [field.target.id]: field.target.value
  //   });
  //   console.log("ESTADO :" + field.target.id + " Valor :" + field.target.value);
  // }

  // toggleList = () => {
  //   this.setState({ isOpen: !this.state.isOpen });
  // };

  // submitItem = (e) => {
  //   e.preventDefault();
  //   this.add();
  //   // aca pongo mensaje de error
  //   // alert("aca grabo!!!")
  //   this.props.leeStkItemsDetalles()
  //   // this.leeStkItemsDetalles()
  //   // window.location.reload() //esto hace que rrecargue la pagina no se por que no anda con la funcion que le estoy pasando ( this.props.leeStkItemsDetalles())
  //   this.props.toggleAgregar();
  // }

  // return (
  /* Grupo INICIO*}
              {/* <Grid item  xs={6} sm={6} lg={6}>
              <TextField
                SelectProps={{
                  native: true,
                }}
                id="StkItemsGrupo"
                select={true}
                fullWidth={true}
                label="Grupo"
                autoFocus={true}
                InputLabelProps={{ shrink: true }}
                value={this.state.StkItemsGrupo}
                // onChange={this.handleChange("StkItemsGrupo")}
                onChange={this.handleChangeGrupo("StkItemsGrupo")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsRubro").focus();
                }}
              >
                 <option></option>
                 {this.state.stkgrupo.map(option => (  
                  
                  <option
                  id="tipogrupo"
                  key={option.idStkGrupo}
                  value={option.idStkGrupo}
                  >
                      {option.StkGrupoDesc} 
                  </option>))} 
              </TextField>
              </Grid> */
  // {/* Grupo FIN */}

  // {/* Rubro INICIO */}

  /* <Grid item  xs={6} sm={6} lg={6}>
              <TextField
                SelectProps={{
                  native: true,
                }}
                id="StkItemsRubro"
                select={true}
                label="Rubro"
                fullWidth={true}
                InputLabelProps={{ shrink: true }} 
                value={this.state.StkItemsRubro}
                onChange={this.handleChange("StkItemsRubro")}
                onKeyPress={event => {
                  if (event.key === "Enter")
                    document.getElementById("StkItemsDesc").focus();
                }}
              >
                 <option></option>
                 {this.state.stkrubro.map(option => (  
                  // <MenuItem
                  <option
                  id="tiporubro"
                  key={option.idStkRubro}
                  value={option.idStkRubro}
                  onClick={()=>console.log("Hizo Click")}
                  >
                      {option.StkRubroDesc} 
                  {/* </MenuItem>))}  */
  // {/* </option>))}  */}
  // {/* </TextField> */}
  // {/* </Grid> */}

  // );
}
// }

// export default StkItemsAgregar;
