import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Apps from "@material-ui/icons/Apps"
import { withStyles } from "@material-ui/core/styles";
import { throws } from "assert";

import ProveedoresModificar from "./ProveedoresModificar"

const defaultToolbarSelectStyles = {
  iconButton: {
    marginRight: "24px",
    top: "50%",
    display : "inline-block",
    position: "relative",
    transform: "translateY(-50%)"
  },
  deleteIcon: {
    color: "#000",
  }
};

class CustomToolbarSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        toggle: true,
        codele: this.props.codele,
    }
  }

  toggle(event){
    this.setState(prevState => ({
    toggle: !prevState.toggle
    }))
  }
  
  clickborra = () => {
    console.log("hizo click en borrar", this.props.selectedRows);
  }

  clickmodif = () => {
      console.log('hizo click en modificar ' )
      console.log(this.state.codele)
      this.toggle()
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={"custom-toolbar-select"}>
      {/* {contenido} */}
        <Tooltip title={"Modifica"}>
          <IconButton className={classes.iconButton} onClick={this.clickmodif}  >
            <Apps className={classes.Apps} />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Borra"}>
          <IconButton className={classes.iconButton} onClick={this.clickborra}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title={"Agrega"}>
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
          <AddIcon className={classes.AddIcon} />
          </IconButton>
        </Tooltip> */}
          {!this.state.toggle
             ?
             <div>
             <ProveedoresModificar click = {()=>this.toggle()} codigoeleg = {this.state.codele}/>
             </div>
            :
            <div></div>
            } 
      </div>
    );
  }

}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(CustomToolbarSelect);