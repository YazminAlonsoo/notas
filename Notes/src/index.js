const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override');
const session = require('express-session');

//Inicializaciones
const app = express();
require('./database')

//Configuraciones
app.set('puerto', process.env.Port || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    defaultDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
    extname: '.hbs'
}));

app.set('view engine', '.hbs')

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));


//Variable Global

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Servidor
app.listen(app.get('puerto'), function(){
    console.log('Servidor corriendo en el puerto:' + app.get('puerto'))
});