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
                length: 120,
                order: true,
            },
            {
                title: "Por Defecto S/N",
                field: "PresupDetPieSelec",
                length: 10,
                order: true,
            },
        ]);
    });
}
