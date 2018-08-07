const express    = require('express');
const mysql      = require('mysql');
const cors       = require('cors');
const bodyParser = require('body-parser');
const porta = process.env.PORT || 3000;


// Criar conexao
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : 'Desaparecidos',
    password : 'mysql1994' 
});

//Verificar a conexao com o banco Mysql
con.connect(function(err) {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
});

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
    let sql = `SELECT Posts.PostId, Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
    Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID`;
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        } 
        else{ 
            return res.send(result);
        }
        
    });
});

app.get('/:id', (req, res) => {
    let id = req.params.id;
    let sql = `SELECT Posts.PostId, Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
    Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID where Posts.PostId = ${id}`;
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        } 
        else{ 
            return res.send(result);
        }
        
    });
});

app.listen(porta,() => {
    console.log(`Servidor funcionando na porta ${porta}`);
});