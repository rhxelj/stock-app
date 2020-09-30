// import { presupConfTipoAgregar } from "./presupConfTipoAgregar";
import { presupcalculador } from "../../../PresupCalculador";
export function onRowAdd(newData, datosanexo, setDatosAnexo) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const datosrenglon1 = presupcalculador(
                "", "",
                newData.PresupConfTipoDesc
            );
            newData.importea = 8585
            setDatosAnexo([...datosanexo, newData]);

            resolve();
            // {

            //     // presupConfTipoAgregar(newData);
            //     const datosrenglon1 = presupcalculador(
            //         "", "",
            //         newData.PresupConfTipoDesc
            //     );
            //     var medida = newData.AnexoMedida
            //     //   var impunidad = datosrenglon1[0].ImpItem
            //     console.log('en el calculador impunidad  ', datosrenglon1)
            //     newData.importea = 8585
            //     // var importeanexoeleg = impunidad * medida
            //     // console.log('en el calculador importeanexoeleg  ', importeanexoeleg)
            console.log('en el calculador newData  ', newData)
            // }
            // resolve(newData);
        }, 1000);
    });
}
