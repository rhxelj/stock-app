var express = require("express");
var router = express.Router();
var path = require("path");
var moment = require("moment");
var conexion = require('../conexion');
var PdfPrinter = require('../../node_modules/pdfmake/src/printer');
var pdfmake = require('../../node_modules/pdfmake')
var dateFormat = require('dateformat');


conexion.connect(function (err) {
    if (!err) {
        console.log("base de datos conectada en imppresup");
    } else {
        console.log("no se conecto en imppresup");
    }
});

var router = express();
var Cliente = ''
var TotalPresup = 0
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
})

router.post("/", function (req, res, next) {

    var datospresup = req.body.datospresup

    var descrip = req.body.descrip
    var Presupuestonro = req.body.nroPresupuesto
    var d = new Date();
    var Fecha = dateFormat(d, "dd-mm-yyyy ");

    var indice = req.body.idcliente;
    Cliente = req.body.nomCliente

    TotalPresup = req.body.suma
    if (indice != 0) {
        var q = ['SELECT ClientesDesc FROM BasesGenerales.Clientes where idClientes = ' + indice].join(' ')
        conexion.query(q,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                    Cliente = result[0].ClientesDesc
                }
            });
    }
    var nombrepresup = 'Presupuesto nro ' + Presupuestonro + ' ' + Cliente + ' ' + Fecha + '.pdf'
    var rows = [];
    var encabcolum = [];
    var ac1 = 0, ac2 = 0, ac3 = 0, ac4 = 0, ac5 = 0, ac6 = 0, ac7 = 0
    var opciones = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
    var i = 0;
    var a = 'N'

    if (TotalPresup === 0) {
        if (descrip === ' ') {
            rows.push([{ text: 'Opc.', style: 'header' }, { text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Largo', style: 'header' }, { text: 'Ancho', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);
            datospresup.map(reng => {
                var Opcion = { text: opciones[i], style: 'tableDatosD' }
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var Largo = { text: reng.PresupLargo.toString(), style: 'tableDatosD' }
                var Ancho = { text: reng.PresupAncho.toString(), style: 'tableDatosD' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Opcion, Cantidad, Descripcion, Largo, Ancho, ImpUnit, ImpItem])
                i++
            })
            ac1 = 25, ac2 = 25, ac3 = 200, ac4 = '*', ac5 = '*', ac6 = 70, ac7 = 70
        }
        else {
            rows.push([{ text: 'Opc.', style: 'header' }, { text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);
            datospresup.map(reng => {
                var Opcion = { text: opciones[i], style: 'tableDatosD' }
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Opcion, Cantidad, Descripcion, ImpUnit, ImpItem])
                i++
            })
            ac1 = 25, ac2 = 25, ac3 = 200, ac4 = '*', ac5 = '*', ac6 = 70, ac7 = 70
        }
    }
    else {
        if (descrip === ' ') {
            rows.push([{ text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Largo', style: 'header' }, { text: 'Ancho', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);

            datospresup.map(reng => {
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var Largo = { text: reng.PresupLargo.toString(), style: 'tableDatosD' }
                var Ancho = { text: reng.PresupAncho.toString(), style: 'tableDatosD' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Cantidad, Descripcion, Largo, Ancho, ImpUnit, ImpItem])
            })
            var Descripcion = { text: 'Total', colSpan: 5, style: 'tableDatosTot' }
            var ImpItem = { text: formatter.format(TotalPresup).toString(), style: 'textoDTot' }
            rows.push([Descripcion, '', '', '', '', ImpItem])
            ac1 = 25, ac2 = 200, ac3 = 40, ac4 = 40, ac5 = 70, ac6 = 70, ac7 = '*'

        }
        else {
            rows.push([{ text: 'Cant', style: 'header' }, { text: 'Descripción', style: 'header' }, { text: 'Imp. Unit.', style: 'header' }, { text: 'Imp. Item.', style: 'header' }]);

            datospresup.map(reng => {
                var Cantidad = { text: reng.PresupCantidad.toString(), style: 'tableDatosD' }
                var Descripcion = { text: reng.StkRubroDesc, style: 'tableDatosI' }
                var ImpUnit = { text: formatter.format(reng.ImpUnitario).toString(), style: 'tableDatosD' }
                var ImpItem = { text: formatter.format(reng.ImpItem).toString(), style: 'tableDatosD' }
                rows.push([Cantidad, Descripcion, ImpUnit, ImpItem])
            })
            var Descripcion = { text: 'Total', colSpan: 3, style: 'tableDatosTot' }
            var ImpItem = { text: formatter.format(TotalPresup).toString(), style: 'textoDTot' }
            rows.push([Descripcion, '', '', ImpItem])
            ac1 = 25, ac2 = 200, ac3 = 70, ac4 = 70, ac5 = '*', ac6 = '*', ac7 = '*'

        }
    }
    pdfmake.addFonts
    var chartLines = [];
    var chartText = [];
    var chart = [{ stack: chartText }, { canvas: chartLines }];
    var height = 130;
    var yAxisWidth = 30;
    var xAxisHeight = 30;
    var tickSize = 5;
    var left = 10;
    var width = 480;
    var top = 30;
    var fonts = {
        Roboto: {
            normal: '../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Regular.ttf',
            bold: '../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Medium.ttf',
            italics: '../backend/node_modules/pdfmake/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: '../backend/node_modules/pdfmake/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
    };
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');
    var docDefinition = {
        pageMargins: [40, 130, 40, 40],
        header: {
            margin: 10,
            columns: [
                {
                    image: path.resolve('.') + '/routes/impresion/encabpresup.png',
                    width: 520,
                    height: 100,
                },
            ],
        },

        content: [
            {
                text: 'Bahía Blanca, ' + Fecha,
                style: 'textoD',
            },

            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                text: 'Sr. ',
                style: 'textoI',
            },
            {
                text: Cliente,
                style: 'textoI',
            },
            {
                text: ' ',
                style: 'textoD',
            },

            {
                text: 'Cotización Nro. : ' + Presupuestonro,
                style: 'textoD',
            },
            {
                text: ' ',
                style: 'textoD',
            },
            {
                style: 'tableDatos',
                table: {
                    headerRows: 1,
                    widths: [ac1, ac2, ac3, ac4, ac5, ac6, ac7],
                    body: rows,
                }
            },
        ],
        styles: {
            header: {
                fontSize: 12,
                italics: true,
                alignment: 'center',
                bold: true
            },
            subheader: {
                fontSize: 15,
                bold: true,
                italics: true,
                alignment: 'center',

            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            textoCI: {
                fontSize: 14,
                alignment: 'center',
            },
            textoD: {
                fontSize: 12,
                alignment: 'right',
            },
            textoI: {
                fontSize: 12,
                alignment: 'left',

            },
            tableEncabColumn: {
                margin: [0, 0, 0, 0],
                alignment: 'center',
                bold: true
            },
            tableDatos: {
                margin: [0, 0, 30, 0],
                alignment: 'center',
            },
            tableDatosI: {
                margin: [0, 0, 0, 15],
                alignment: 'left',
            },
            tableDatosD: {
                margin: [0, 0, 0, 15],
                alignment: 'right',
            },
            tableDatosTot: {
                margin: [0, 0, 0, 15],
                alignment: 'right',
                bold: true
            },
            textoDTot: {
                fontSize: 12,
                alignment: 'right',
                bold: true
            },
        }

    };
    //esto funciona
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    // pdfDoc.pipe(fs.createWriteStream(path.resolve('.') + '/routes/impresion/basics.pdf'));
    pdfDoc.pipe(fs.createWriteStream('/home/sandra/SistOLSA/OlsaSG/src/components/Main/pages/Presupuesto/Presup-Impresion/basics.pdf'));
    pdfDoc.pipe(fs.createWriteStream(path.resolve('.') + '/Presupuestos/' + nombrepresup));
    pdfDoc.end();


});

conexion.end;
module.exports = router;


// function horizontalLine(x, y, length) {
//     return { type: 'line', x1: x, y1: y, x2: x + length, y2: y };
// }

// function verticalLine(x, y, height) {
//     return { type: 'line', x1: x, y1: y, x2: x, y2: y + height };
// }

