import React, { Component} from 'react'
import request from 'superagent'

import IpServidor from "../VariablesDeEntorno";

import Table from  '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { withStyles } from '@material-ui/core/styles';


import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
    maxWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);




class StkItemsRed extends Component {
  
    constructor(props){
      super()
        this.state = {
          stkitems:[],
          grupostk:0,
          rubrostk:0,
          itemsstk:0,
          open: true,
  }
}
  leeitemsred = _ => {
    const url = IpServidor + "/stkitemsleecodgryrb/?idStkGrupo="+this.props.CodGrupo+'&idStkRubro='+this.props.CodRubro;
    request
    .get(url)
    .set('Content-Type', 'application/json')
        .then(res=> {
          const stkitems = JSON.parse(res.text);
          this.setState(()=>{ return {stkitems: stkitems}});
        })
    }

  componentDidMount() {
    this.leeitemsred()  
  }      

   


 


render () {

    return (
  
    <div > 
        <Grid container>
          <Grid item xs={4} sm={4} lg={4}>
             <Table >
               <TableHead>
                 <CustomTableCell>Detalle</CustomTableCell>
                 <CustomTableCell>Cant.Disponible</CustomTableCell>
                 <CustomTableCell>Cant.Stock</CustomTableCell>
               </TableHead>
               <TableBody>
               {this.state.stkitems.map((stkitem) => {
                 return(
                   <TableRow key={stkitem.StkItemsDesc}>
                    <CustomTableCell >{stkitem.StkItemsDesc}</CustomTableCell>
                    <CustomTableCell numeric>{stkitem.StkItemsCantDisp}</CustomTableCell>
                    <CustomTableCell numeric>{stkitem.StkItemsCantidad}</CustomTableCell>
                    </TableRow>
               )
                 })}
               </TableBody>
             </Table>
          </Grid>
        </Grid>       
  </div>       
    )
       
    }
   
  }

export default withStyles(styles)(StkItemsRed)	