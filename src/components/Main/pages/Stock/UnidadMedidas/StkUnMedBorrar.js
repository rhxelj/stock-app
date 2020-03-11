import React, { Component } from "react";
import request from "superagent";
import IpServidor from "../../VariablesDeEntorno";
// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
// import IpServidor from './VariablesDeEntorno'
import CodigoError from "../../../../lib/CodigoError";

class BorrarUnidadMedidas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: IpServidor + "/stkunmedborrar/",
      monedas: [],
      // filtrado:[],
      filtered: "",
      toggle: true,
      idStkUnMed: props.idStkUnMed
    };
    // this.search = this.search.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  }

  // //Delete
  delete = id => {
    const url = IpServidor + "/stkunmedborrar/" + id;
    request
      .delete(url)
      .set("Content-Type", "application/json")
      .then(function(res) {})

      .catch(err => CodigoError(err));
    this.props.read();
    this.toggle();
  };

  componentDidMount() {
    // this.read()
  }

  render() {
    return (
      <div>
        {this.state.toggle ? (
          <div>
            {/* <button 
                        className=" red accent-4" 
                        onClick={()=>this.toggle()}
                        >
                        Borrar
                    </button> */}
            <IconButton className=" red accent-4" onClick={() => this.toggle()}>
              <DeleteIcon />
            </IconButton>
          </div>
        ) : (
          <div className="center-align">
            <p>Borrar ?</p>
            {/* <Iconbutton className="green "><i className="material-icons" onClick={()=>this.delete(this.props.id)}>check</i></Iconbutton>
                        <Iconbutton className="red "><i className="material-icons" onClick={()=>this.toggle()}>cancel</i></Iconbutton> */}
            <IconButton
              color="primary"
              onClick={() => this.delete(this.props.idStkUnMed)}
            >
              <DoneIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => this.toggle()}>
              <ClearIcon />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
}

export default BorrarUnidadMedidas;
