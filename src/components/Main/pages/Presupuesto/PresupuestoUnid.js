import React, {useEffect, useState}  from 'react';
import MaterialTable,  { MTableToolbar }  from 'material-table';
import { tableIcons } from "../../../lib/material-table/tableIcons";
import { localization } from "../../../lib/material-table/localization";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import WavesIcon from '@material-ui/icons/Waves';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import { presuunid } from "./PresupCalculador";

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function PresupuestoUnid() {
  const options = ['Uno', 'Dos', 'Tres'];
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [nameError, setNameError] = useState({
    error: false,
    label: "",
    helperText: "",
  });
  var [totalpresup, setTotalPresup] = useState(0)


  const [presunid, setPresUnid] = useState({
    
  columns : [
    {
      title: 'Tipo Presup.',
      field: 'PresUnidTP',
      lookup : 
      { 
        1:'Por Unidad',
        2:'Paño Unido',
        3:'Fajas',
        4:'Enrollable',
        5:'Confeccionada',
      },
     
    },
    
    {
    title: "Cantidad",
    field: "PresUnidCant",
    type: 'numeric',
    initialEditValue : 1,
    headerStyle:{
     fontWeight: 200  },
  },
  {
    title: "Descripción",
    field: "StkRubroDesc",
    cellStyle: data => {
      if (data === "N/A") {
        {console.log('pepe')}
        return {
          color: "#aaa"
        };
      }
    },
     },
  {
  title: "Largo",
  field: "PresUnidLargo",
    },
  {
  title: "Ancho",
  field: "PresUnidAncho",
//  hidden : 'true',
    },
  
{
  title: "Imp. Unit.",
  field: "PresUnidImpUn",
  type: 'currency',

},
{
  title: "Imp. Item",
  field: "PresUnidImpItem",
  type: 'currency',
  editable: 'never',
}],
  data: [],
})
  

// async function presuunidad() {
//   const result = await presuunid();
//   setPresUnid(() => result);
// }


// async function initialFetch() {
//   presuunidad();
// }

// useEffect(() => {
//   initialFetch();
// }, []);

const handleMenuItemClick = (
  event,
  index,
) => {
  setSelectedIndex(index);
  console.log('index  ', index)
  
  if (index === 1) {
    // setRubro({ ...rubro, data: result });
    // presunid.columns[4].hidden = 'true'
  }
  console.log('columns en handle ' ,
          presunid.columns)
  setOpen(false);
};

const calculototal = () => {
 // newData.PresUnidImpItem = (newData.PresUnidCant * newData.PresUnidImpUn)
  console.log('en calculototal  ', presunid.data)
}

const openApp = (event, PresUnidTP) => {
  console.log('PresUnidTP   ',PresUnidTP)
 }
  return (
  <div>
    {console.log('presunid.columns ', presunid.columns)}
       <MaterialTable
        icons={tableIcons}
        title="Tabla PresUnids"
       columns={presunid.columns} 
        data={presunid.data}
        localization={localization}
        actions={[
          {
           icon: () => <WavesIcon/>,
           onClick: (event, rowData) => openApp(event, rowData.PresUnidTP )
          
          }
    
       ]}
        options={{
          addRowPosition: "first",
          actionsColumnIndex : -1,
          tableLayout : 'auto',
          headerStyle:{
            backgroundColor:'grey', 
            padding: '5px',
            detailPanelColumnAlignment : 'left',
            fontStyle: 'italic',
            boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
            justifyContent: 'space-evenly'
          }
        }}
        
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
              <div style={{padding: '0px 10px'}}>
                <TextField
                  value = {totalpresup}
                  />  
                 
              </div>
            </div>
          ),
        }}
        editable={{
          onRowAdd:    
          (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setPresUnid((prevPresUnid) => {
                const data = [...prevPresUnid.data];
                newData.PresUnidImpItem = (newData.PresUnidCant * newData.PresUnidImpUn)
                setTotalPresup(totalpresup + newData.PresUnidImpItem  )
                console.log(totalpresup)
                data.push(newData);
                return { ...prevPresUnid, data };
              });
            }, 600);
          }),
         

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.PresUnidDesc === "") {
                  setNameError({
                    error: true,
                    label: "required",
                    helperText: "Required helper text",
                  });
                  reject();
                  return;
                }
                resolve();
                if (oldData) {
                  setPresUnid((prevPresUnid) => {
                    const data = [...prevPresUnid.data];
                    data[data.indexOf(oldData)] = newData;
                    console.log(newData);
                    return { ...prevPresUnid, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setPresUnid((prevPresUnid) => {
                  const data = [...prevPresUnid.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevPresUnid, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}
