import React from 'react'
import request from 'superagent'

import IpServidor from "../VariablesDeEntorno";

export const stkitemsred = (CodGrupo, CodRubro) => {
  return new Promise(resolve => {
    const url = IpServidor + "/stkitemsleecodgryrb/?idStkGrupo="+CodGrupo+'&idStkRubro='+CodRubro;
    request
    .get(url)
    .set('Content-Type', 'application/json')
        .then(res=> {
          const stkitems = JSON.parse(res.text);
          resolve(stkitems);
          
        })
    //}

  

  //   return (
  
  //   <div > 
  //       <Grid container>
  //         <Grid item xs={4} sm={4} lg={4}>
  //            <Table >
  //              <TableHead>
  //                <CustomTableCell>Detalle</CustomTableCell>
  //                <CustomTableCell>Cant.Disponible</CustomTableCell>
  //                <CustomTableCell>Cant.Stock</CustomTableCell>
  //              </TableHead>
  //              <TableBody>
  //              {stkitems.map((stkitem) => {
  //                return(
  //                  <TableRow key={stkitem.StkItemsDesc}>
  //                   <CustomTableCell >{stkitem.StkItemsDesc}</CustomTableCell>
  //                   <CustomTableCell numeric>{stkitem.StkItemsCantDisp}</CustomTableCell>
  //                   <CustomTableCell numeric>{stkitem.StkItemsCantidad}</CustomTableCell>
  //                   </TableRow>
  //              )
  //                })}
  //              </TableBody>
  //            </Table>
  //         </Grid>
  //       </Grid>       
  // </div>      
  //   )
       
  })
  }

