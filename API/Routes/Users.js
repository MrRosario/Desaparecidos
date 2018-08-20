const jwt      = require('jsonwebtoken');
const database = require('../Models/database');

process.env.SECRET_KEY = "jsehmagico";

exports.all = function(req, res){

    let sql = `SELECT Posts.PostId, Usuarios.UsuarioID as Usuario, Posts.Titulo, Posts.Descricao, Posts.Imagem1, Posts.Imagem2, 
    Posts.Imagem3 FROM Posts INNER JOIN Usuarios ON Usuarios.UsuarioID = Posts.UsuarioID ORDER BY Posts.Criado_aos DESC`;
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

exports.comentar = function(req, res){

    console.log("req",req.body); 

    let Comentarios = {
      "Comentario": req.body.Comentario,
      "PostId": req.body.PostId,
      "UsuarioID": req.body.UsuarioID,
      "Criado_aos": req.body.Criado_aos
    }

    database.connection.query('INSERT INTO Comentarios SET ?', Comentarios, function (error, results, fields) {

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
            "success":"Comentario feito com sucesso"
            });
        }
    });
}

exports.publicar = function(req, res){

    console.log("req",req.body); 

    let Publicar = {
      "Titulo": req.body.Titulo,
      "Descricao": req.body.Descricao,
      "Visto_encontrado": req.body.Visto_encontrado,
      "Telefone": req.body.Telefone,
      "Email": req.body.Email, 
      "Imagem1": req.body.Imagem1,
      "Imagem2": req.body.Imagem2,
      "Imagem3": req.body.Imagem3,
      "Criado_aos": req.body.Criado_aos,
      "UsuarioID": req.body.UsuarioID
    }

    database.connection.query('INSERT INTO Posts SET ?', Publicar, function (error, results, fields) {

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
            "success":"Publicado com sucesso"
            });
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
                const token = jwt.sign({ Usuario: results.UsuarioID }, process.env.SECRET_KEY, { expiresIn: 24 * 60 * 60 });
                
                res.status(200)
                    .send({ 'token': token, results } );
                    //.send({ 'token': token, 'IDusuario': results.UsuarioID, 'Nome': results.Nome, 'SobreNome': results.Sobre_nome } );
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

exports.tokenAuthorize = function(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
     if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error', err);
                return res.status(403).send(err);
            } else {
                req.decoded = decoded;
                return next();
            }
        });
     } 
     else {
        res.status(403).send('Token not provided');
     }
}