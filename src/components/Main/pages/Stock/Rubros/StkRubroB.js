import React, { useEffect, useState } from "react";
import MaterialTable, { Column } from "material-table";
import IpServidor from "../../VariablesDeEntorno";
import request from "superagent";
import Button from "@material-ui/core/Button";
import StkRubroAgregar from "./StkRubroAgregar";
import { lookup } from "dns";
import { stkrubroleermezcla } from "./StkRubroLeerMezcla";
import { stkgrupoleerredrubro } from "../Grupos/StkGrupoLeerRedRubro";
import { ClickAwayListener } from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
// interface Row {

//     idStkRubro: number;
//     StkGrupoDesc: string;
//     StkRubroDesc: string;
//     StkRubroAbr: string;
//     ProveedoresDesc: string;
//     StkRubroAncho: string;
//     StkRubroPresDes: string;
//     StkRubroPres: string;
//     StkRubroUM: number;
//     StkRubroCosto: number;
//      StkRubroTM: string;

//   }
//   name: string;
//   surname: string;
//   idStkRubro: number;
//   birthCity: number;
// }

// interface TableState {
//   columns: Array<Column<Row>>;
//   data: Row[];
// }

// var lookconst = {}
//   {2: "TEJIDOS VARIOS",
//  3: "TELAS NO PLASTICAS",
//  4: "PVC",
//  5: "POLIETILENO",
//  6: "ACCESORIOS PARA TOLDOS",
//  7: "ACCESORIOS VARIOS",
//  8: "OJALES Y OTROS",
//  9: "ACCESORIOS PARA PILETAS",
//  10: "PEGAMENTOS",
//  11: "HILOS",
//  12: "ABROJOS Y CINTAS",
//  13: "ARTICULOS PARA CARGAS",
//  14: "ARTICULO PARA LATERALES CORREDIZOS",
//  15: "SOGAS",
//  16: "PRODUCTOS ELABORADOS"}

export default function StkRubroB(props) {
  const { lookconst } = props;

  const [nameError, setNameError] = useState({
    error: false,
    label: "",
    helperText: "",
  });
  const [rubro, setRubro] = useState({
    columns: [
      {
        title: "Rubro(ID)",
        field: "idStkRubro",
      },
      {
        title: "Descripción",
        field: "StkRubroDesc",
      },
      {
        title: "Grupo",
        field: "StkRubroCodGrp",
        lookup: lookconst,
        native: true,
      },
      {
        title: "Abreviatura",
        field: "StkRubroAbr",
      },
      {
        title: "Proveedor",
        field: "ProveedoresDesc",
      },
      {
        title: "Ancho",
        field: "StkRubroAncho",
        emptyValue: "false",
        // initialEditValue: "0",
        // required : true,
        //    type : 'currency'
      },
      {
        title: "Presentación",
        field: "StkRubroPresDes",
      },
      {
        title: "Presentacion",
        field: "StkRubroPres",
      },
      {
        title: "Unidad De Medida",
        field: "StkRubroUM",
      },
      {
        title: "Costo",
        field: "StkRubroCosto",
      },
      {
        title: "Moneda",
        field: "StkRubroTM",
      },
    ],

    data: [],
  });

  async function stkrubroleemezcla() {
    const result = await stkrubroleermezcla();
    setRubro({ ...rubro, data: result });
  }

  useEffect(() => {
    stkrubroleemezcla();
  }, []);

  useEffect(() => {}, [rubro.data]);

  return (
    <div>
      <MaterialTable
        title="Tabla Rubros"
        columns={rubro.columns}
        data={rubro.data}
        localization={{
          body: {
            editRow: {
              saveTooltip: "Salvar",
              cancelTooltip: "Cancelar",
              deleteText: "Seguro quieres borrar este registro?",
            },
            addTooltip: "Adicionar",
            deleteTooltip: "Borrar",
            editTooltip: "Editar",
          },
          toolbar: {
            searchPlaceholder: "Buscar",
          },
          grouping: {
            groupedBy: "Agrupado por : ",
            placeholder: "Arrastre los encabezados aquí para agrupar por",
          },
          pagination: {
            firstTooltip: "1° Pág.",
            firstAriaLabel: "Primera",
            previousTooltip: "Anterior",
            previousAriaLabel: "Anterior",
            nextTooltip: "Próxima",
            nextAriaLabel: "Próxima",
            labelRowsPerPage: "filas/pág",
            lastTooltip: "Ult.Pág.",
            lastAriaLabel: "Filas",
            labelRowsSelect: "Filas",
          },
        }}
        // icons = {{
        //   Add : 'ii'
        // }}
        options={{
          grouping: true,
          addRowPosition: "first",
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setRubro((prevRubro) => {
                  const data = [...prevRubro.data];
                  console.log(newData);
                  data.push(newData);
                  return { ...prevRubro, data };
                });
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (newData.StkRubroDesc === "") {
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
                  setRubro((prevRubro) => {
                    const data = [...prevRubro.data];
                    data[data.indexOf(oldData)] = newData;
                    console.log(newData);
                    return { ...prevRubro, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setRubro((prevRubro) => {
                  const data = [...prevRubro.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevRubro, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}
