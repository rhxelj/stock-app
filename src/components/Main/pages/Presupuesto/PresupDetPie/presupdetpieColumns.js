import React from "react";
export function presupdetpieColumns() {
  return new Promise(function (resolve, reject) {
    resolve([
      // {
      //     title: "Presup.Pie(ID)",
      //     field: "idPresupDetPie",
      //     editable: "never",
      //     order: true,
      // },
      {
        title: "Leyenda",
        field: "PresupDetPieLeyenda",
        editComponent: (props) => (
          <input
            maxlength="120"
            size="120"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
          />
        ),
        order: true,
      },
    ]);
  });
}
