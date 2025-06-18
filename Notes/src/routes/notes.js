const express = require('express');
const router = express.Router();

const Nota = require('../model/notes');

router.get('/notes', function(request, response){
    response.send("Notas de la base de datos");
});

router.get('/notes/add', function(request, response){
    response.render("notes/nueva-nota");
});

//Cuando el formulario presione enviar
router.post('/notes/nueva-nota', async function(request, response){

    //obtenemos los datos en constantes
    const {titulo, descripcion} = request.body;
    const errores = [];

    if(!titulo){
        errores.push({text: "Por favor inserta el nombre"});
    }
    if(!descripcion){
        errores.push({text: "Por favor insertar la descripción"})
    }

    if(errores.length > 0){
        response.render('notes/nueva-nota', {
            errores,
            titulo,
            descripcion
        });
    }else{
        const nuevaNota = new Nota({titulo, descripcion});
        await nuevaNota.save();
        response.redirect('/notes');
    }
});

module.exports = router;