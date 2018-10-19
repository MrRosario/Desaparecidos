const mysql = require('mysql');

// Criar conexao
// const con = mysql.createConnection({
//     host     : 'us-cdbr-iron-east-01.cleardb.net',
//     user     : 'b06966b07a5956',
//     database : 'heroku_93c905e5e2cb8e0',
//     password : 'e4cb1f1b',
// });

const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'Desaparecidos',
    password : 'mysql1994' 
});
// // Criar conexao
// const con = mysql.createPool({
//     connectionLimit : 10,
//     host     : 'us-cdbr-iron-east-01.cleardb.net',
//     user     : 'b06966b07a5956',
//     database : 'heroku_93c905e5e2cb8e0',
//     password : 'e4cb1f1b',
//     insecureAuth: true,
//     port: 3306
// });

module.exports.connection = con;