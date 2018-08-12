const database = require('../Models/database');

exports.all = function(req, res){

    let sql = `SELECT Posts.PostId, Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
    Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID`;
    database.connection.query(sql, (err, result) => {
        if(err){
            console.log("Ocorreu um erro",error);
            res.send({
                "code":400,
                "failed":"erro"
            })
        } 
        else{ 
            return res.send(result);
        }
        
    });
}

exports.user = function(req, res){
    let id = req.params.id;

    let sql = `SELECT Posts.PostId, Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
    Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID where Posts.PostId = ${id}`;
    database.connection.query(sql, (err, result) => {
        if(err){
            throw err;
        } 
        else{ 
            return res.send(result);
        }
        
    });
}

exports.comment = function(req, res){
    let id = req.params.id;

    let sql = `select C.ComentarioID, P.PostID, U.Nome as Nome_Usuario, U.Sobre_nome, C.Comentario FROM Comentarios C
    INNER JOIN Usuarios U ON C.UsuarioID = U.UsuarioID
    INNER JOIN Posts P ON C.PostID = P.PostID where P.PostId = ${id}`;

    database.connection.query(sql, (err, result) => {
        if(err){
            throw err;
        } 
        else{ 
            return res.send(result);
        }
        
    });
}

exports.register = function(req,res) {

    console.log("req",req.body); 
    // const hoje = new Date();

    let Usuarios = {
      "Nome": req.body.Nome,
      "Sobre_nome": req.body.Sobre_nome,
      "Email": req.body.Email,
      "Senha": req.body.Senha,
      "Criado_aos": req.body.Criado_aos
    }

    database.connection.query('INSERT INTO Usuarios SET ?', Usuarios, function (error, results, fields) {

        if (error) {
        console.log("Ocorreu um erro",error);
        res.send({
            "code":400,
            "failed":"erro"
        })
        }else{
        console.log('Resultado: ', results);
        res.send({
            "code":200,
            "success":"Usuario registrado com sucesso"
            });
        }
    });
}

exports.login = function(req,res){

  const Email= req.body.Email;
  const Senha = req.body.Senha;

  console.log(Email + ' ' + Senha);

  database.connection.query('SELECT * FROM Usuarios WHERE Email = ?',[Email], function (error, results, fields) {
    if (error) {
        console.log("Ocorreu um erro ",error);
        res.send({
        "code":400,
        "failed":"erro"
        })
    }
    else { 
        //console.log('Resultado: ', results);
        if(results.length > 0){
            if(results[0].Senha == Senha){
                res.send({
                    results,
                "code":200,
                "success":"Usuario Logado com sucesso"
                });
            }
            else {
                res.send({
                "code":204,
                "success":"Email ou senha nao combinam"
                });
            }
        }
        else {
            res.send({
                "code":204,
                "success":"Este email nao existe"
            });
        }
    }
  });
}