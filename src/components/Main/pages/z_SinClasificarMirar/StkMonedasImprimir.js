import React, { Component} from 'react'
import request from 'superagent'
//import 'react-table/react-table.css'
import IpServidor from '../VariablesDeEntorno'
import ReactToPrint from "react-to-print";
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print'
// para usar las tablas de MUI start
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import purple from '@material-ui/core/colors/purple';



const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      fontSize: 18,
    },
    body: {
      fontSize: 14,
    },
   
    palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
      },   
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  
    
  });



//para usar las tablas de MUI end

class Monedas extends Component {
    constructor(props){
        
        super(props)
        var today = new Date(),
        date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        this.state = {
            url: IpServidor + '/stkmonedasleer',
            toggle: false,
            idStkMonedas:'',
            StkMonedasDescripcion:'',
            StkMonedasCotizacion: 0,
            monedas:[],
            fab: {
                position: 'absolute',
                bottom: '50px',
                right: '50px',
              },
              date: date, 
        }
       
       
        this.toggle = this.toggle.bind(this);
    }    
   
    //Read
    read = _ => {
        // const url = IpServidor + '/leermonedas'; //'http://192.168.2.102:4000/indexprov'
        request
        .get(this.state.url)
        .set('Content-Type', 'application/json')
            .then(res=> {
            const monedas = JSON.parse(res.text)
            this.setState({monedas: monedas})
            })
    }

    
    toggle(event){
        this.setState(prevState => ({
        toggle: !prevState.toggle
        }))
    }
    
    
    
    componentWillUnmount(){
        this.setState({ state: this.state });
    }
    componentDidMount(){
        this.read()
    }
  

   
    
    render(){
        return( 
            <div>
                 <Paper >
                    <h3>Listado de monedas {this.state.date}</h3>
                            <Table >
                            
                                <TableHead color="primary"> 
                                    <TableRow className="secondary" >
                                        <CustomTableCell >Código   </CustomTableCell>
                                        <CustomTableCell>Descripción</CustomTableCell>
                                        <CustomTableCell numeric>Cotización</CustomTableCell>
                                        <CustomTableCell ></CustomTableCell>
                                    </TableRow>
                                </TableHead>
                             
                                <TableBody>
                                    {this.state.monedas.map(row => {
                                    return (
                                        <TableRow >
                                            <CustomTableCell >{row.idStkMonedas}         </CustomTableCell>
                                            <CustomTableCell >{row.StkMonedasDescripcion}</CustomTableCell>
                                            <CustomTableCell numeric>{row.StkMonedasCotizacion}</CustomTableCell>
                                            <CustomTableCell numeric>{row.borrar}</CustomTableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
            </div>
        )
    }
}
class StkMonedasImprimir extends React.Component {
    render() {
      return (
        <div>
          <ReactToPrint
            trigger={() => <IconButton ><PrintIcon></PrintIcon></IconButton> }
            content={() => this.componentRef}
          />
          <Monedas ref={el => (this.componentRef = el)} />
          
        </div>
      );
    }
  }
export default StkMonedasImprimir	