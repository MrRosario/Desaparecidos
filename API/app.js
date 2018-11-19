const express    = require('express');
const user       = require('./Routes/Users');
const database   = require('./Models/database');
const cors       = require('cors');
const bodyParser = require('body-parser');
const porta      = process.env.PORT || 3000;

//users.use(cors());

// database.connection.connect(function(err) {
//     if (err){
//         console.log(err.code); // 'ECONNREFUSED'
//         console.log(err.fatal); // true
//     }
//     console.log("Conectado ao banco de dados!");
// });

const app = express();
const router = express.Router();

app.use(cors());
app.options('*', cors()) // include before other routes
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

// app.all('*', function(req, res, next) {
//     var origin = req.get('origin'); 
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
//     next();
// });

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});

router.get('/', user.all);
router.get('/postMap/',user.postMap)
router.get('/:id', user.user);
router.get('/verificar/:email', user.checkEmail);
router.get('/comentarios/:id', user.comment);
router.get('/perfil/:id', user.perfil);
router.get('/perfilUsuario/:id', user.perfilUsuario);
router.get('/dadosPost/:id', user.getPostEdit);
router.get('/dadosPerfil/:id',user.getPerfilEdit);
router.put('/atualizarPost/', user.atualizarPost);
router.put('/atualizarPerfil/', user.atualizarPerfil);
router.put('/novaSenha/', user.novaSenha);
router.delete('/excluir/:id', cors() ,user.excluir);
router.get('/pesquisar/:titulo', user.pesquisar);
router.post('/comentar', user.comentar);
router.post('/cadastrar', user.register);
router.post('/login', user.login);
router.post('/publicar', user.publicar);

//router.use('/api', user.tokenAuthorize);

app.use('/api', router);

app.listen(porta,() => {
    console.log(`Servidor funcionando na porta ${porta}`) 
});