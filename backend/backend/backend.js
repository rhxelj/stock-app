var express = require('express');
var path = require('path');
var cors = require('cors');
//var favicon = require('serve-favicon');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//  var routes = require('./routes/index');

var proveedoresleer = require('./routes/proveedoresleer');
var proveedoresleercod = require('./routes/proveedoresleercod');
var proveedoresagregar = require('./routes/proveedoresagregar');
var proveedoresborrar = require('./routes/proveedoresborrar');
var proveedoresmodificar = require('./routes/proveedoresmodificar');


var stkmonedasleer = require('./routes/stkmonedasleer');
var stkmonedasleercod = require('./routes/stkmonedasleercod');
var stkmonedasagregar = require('./routes/stkmonedasagregar');
var stkmonedasmodificar = require('./routes/stkmonedasmodificar');
var stkmonedasborrar = require('./routes/stkmonedasborrar');


var stkbgsubrubroleer = require('./routes/stkbgsubrubroleer');

var stktipoproveedleer = require('./routes/stktipoproveedleer');
//var stktipoproveedleercod = require('./routes/stktipoproveedleercod');
// var stktipoproveedagregar = require('./routes/stktipoproveedagregar');
// var stktipoproveedmodificar = require('./routes/stktipoproveedmodificar');
// var stktipoproveedborrar = require('./routes/stktipoproveedborrar');

var stkunmedleer = require('./routes/stkunmedleer');
var stkunmedleercod = require('./routes/stkunmedleercod');
var stkunmedagregar = require('./routes/stkunmedagregar');
var stkunmedmodificar = require('./routes/stkunmedmodificar');
var stkunmedborrar = require('./routes/stkunmedborrar');

var stkgrupoleer = require('./routes/stkgrupoleer');
var stkgrupoleercod = require('./routes/stkgrupoleercod');
var stkgrupoagregar = require('./routes/stkgrupoagregar');
var stkgrupomodificar = require('./routes/stkgrupomodificar');
var stkgrupoborrar = require('./routes/stkgrupoborrar');

var stkrubroleer = require('./routes/stkrubroleer');
var stkrubroleermezcla = require('./routes/stkrubroleermezcla');
var stkrubroleercod = require('./routes/stkrubroleercod');
var stkrubroagregar = require('./routes/stkrubroagregar');
var stkrubromodificar = require('./routes/stkrubromodificar');
var stkrubroborrar = require('./routes/stkrubroborrar');
var stkrubroleecodgrupo = require('./routes/stkrubroleecodgrupo');
var stkrubroleecodrbygr = require('./routes/stkrubroleecodrbygr');




var stkitemsleer = require('./routes/stkitemsleer');
var stkitemsagregar = require('./routes/stkitemsagregar');
var stkitemsmodificar = require('./routes/stkitemsmodificar');
var stkitemsborrar = require('./routes/stkitemsborrar');
var stkitemsleecod = require('./routes/stkitemsleecod');
var stkitemsleecodgryrb = require('./routes/stkitemsleecodgryrb');
var stkitemsleecodgrrbit = require('./routes/stkitemsleecodgrrbit');
var stkitemsleedetalles = require('./routes/stkitemsleedetalles');


var stkitemsmodificacant = require('./routes/stkitemsmodificacant');
var stkitemsmoddisp = require('./routes/stkitemsmoddisp');
var stkverificadisp = require('./routes/stkverificadisp');
var stkitemsmodstock = require('./routes/stkitemsmodstock');

var stkitemsventa = require('./routes/stkitemsventa'); //una prueba

// var imprime1 = require('./routes/imprime1');
var stkmovvtaagregar = require('./routes/stkmovvtaagregar');
var stkenvaseagregar = require('./routes/stkenvaseagregar');
var stkenvaseleeimp = require('./routes/stkenvaseleeimp');
var clientesleer = require('./routes/clientesleer');


// function agregada por el error CROS
function perimitirCrossDomain(req, res, next) {
    //en vez de * se puede definir SÓLO los orígenes que permitimos
    res.header('Access-Control-Allow-Origin', '*');
    //metodos http permitidos para CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


var app = express();
app.use(cors());
// routes.initialize(app);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(perimitirCrossDomain);


app.use('/', proveedoresleer);

app.use('/proveedoresleer', proveedoresleer);
app.use('/proveedoresleercod', proveedoresleercod);
app.use('/proveedoresagregar', proveedoresagregar);
app.use('/proveedoresmodificar', proveedoresmodificar);
app.use('/proveedoresborrar', proveedoresborrar);

app.use('/stkmonedasleer', stkmonedasleer);
app.use('/stkmonedasleercod', stkmonedasleercod);
app.use('/stkmonedasagregar', stkmonedasagregar);
app.use('/stkmonedasmodificar', stkmonedasmodificar);
app.use('/stkmonedasborrar', stkmonedasborrar);


app.use('/stkbgsubrubroleer', stkbgsubrubroleer);

app.use('/stktipoproveedleer', stktipoproveedleer);
// app.use('/stktipoproveedleercod', stktipoproveedleercod);
// app.use('/stktipoproveedagregar', stktipoproveedagregar);
// app.use('/stktipoproveedmodificar', stktipoproveedmodificar);
// app.use('/stktipoproveedborrar', stktipoproveedborrar);

app.use('/stkunmedleer', stkunmedleer);
app.use('/stkunmedleercod', stkunmedleercod);
app.use('/stkunmedagregar', stkunmedagregar);
app.use('/stkunmedmodificar', stkunmedmodificar);
app.use('/stkunmedborrar', stkunmedborrar);

app.use('/stkgrupoleer', stkgrupoleer);
app.use('/stkgrupoleercod', stkgrupoleercod);
app.use('/stkgrupoagregar', stkgrupoagregar);
app.use('/stkgrupomodificar', stkgrupomodificar);
app.use('/stkgrupoborrar', stkgrupoborrar);

app.use('/stkrubroleer', stkrubroleer);
app.use('/stkrubroleermezcla', stkrubroleermezcla);
app.use('/stkrubroleercod', stkrubroleercod);
app.use('/stkrubroagregar', stkrubroagregar);
app.use('/stkrubromodificar', stkrubromodificar);
app.use('/stkrubroborrar', stkrubroborrar);
app.use('/stkrubroleecodgrupo', stkrubroleecodgrupo);
app.use('/stkrubroleecodrbygr', stkrubroleecodrbygr);


app.use('/stkitemsleer', stkitemsleer);
app.use('/stkitemsagregar', stkitemsagregar);
app.use('/stkitemsmodificar', stkitemsmodificar);
app.use('/stkitemsborrar', stkitemsborrar);
app.use('/stkitemsleecod', stkitemsleecod);
app.use('/stkitemsleecodgryrb', stkitemsleecodgryrb);
app.use('/stkitemsleecodgrrbit', stkitemsleecodgrrbit);
app.use('/stkitemsleedetalles', stkitemsleedetalles);



app.use('/stkitemsmodificacant', stkitemsmodificacant);
app.use('/stkitemsmoddisp', stkitemsmoddisp);
app.use('/stkverificadisp', stkverificadisp);
app.use('/stkitemsmodstock', stkitemsmodstock);

app.use('/stkitemsventa', stkitemsventa);
app.use('/stkenvaseagregar', stkenvaseagregar);
app.use('/stkenvaseleeimp', stkenvaseleeimp);

// app.use('/imprime1', imprime1);
app.use('/stkmovvtaagregar', stkmovvtaagregar);

app.use('/clientesleer', clientesleer);

app.use(function (req, res, next) {
    var err = new Error('El programa de backend no se encuentra');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');


});

module.exports = app;