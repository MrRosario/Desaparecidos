const mysql = require('mysql');

// Criar conexao
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'Desaparecidos',
    password : 'mysql1994' 
});

module.exports.connection = con;