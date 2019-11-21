import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';

// const Mensajes = ({title, action, children, truncate}) =>(
const Mensajes = (props) =>(

    // <div className="card blue-grey darken-1">
    <div>
         <Dialog
              open={true}
              // onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
             <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
              {props.msg}
              {/* {props} */}
              {/* {props.children} */}
              <button onClick={props.toggle}>OK</button>
            </Dialog>
    </div>
);



export default Mensajes;




