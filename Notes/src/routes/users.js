const express = require('express');
const router = express.Router();

router.get('/users/singin', function(request,response){
    response.render('users/singin');
});

router.get('/users/singup', function(request,response){
    response.render('users/singup');
});

module.exports = router;