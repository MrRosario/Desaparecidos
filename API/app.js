const express    = require('express');
const user       = require('./Routes/Users');
const database   = require('./Models/database');
const cors       = require('cors');
const bodyParser = require('body-parser');
const porta      = process.env.PORT || 3000;
const multer     = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // error first callback
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {

        // error first callback
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({ 
    storage: storage
});

// users.use(cors());

database.connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
});

const app = express();
const router = express.Router();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

//CHAT
let http = require('http').Server(app);
let io           = require('socket.io')(http);

io.on('connection', (socket) => {
  
    socket.on('disconnect', function(){
      io.emit('users-changed', {user: socket.nickname, event: 'left'});   
    });
   
    socket.on('set-nickname', (nickname) => {
      socket.nickname = nickname;
      io.emit('users-changed', {user: nickname, event: 'joined'});    
    });
    
    socket.on('add-message', (message) => {
      io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
    });
});

router.get('/', user.all);
router.get('/postMap/',user.postMap)
router.get('/:id', user.user);
router.get('/comentarios/:id', user.comment);
router.get('/perfil/:id', user.perfil);
router.get('/perfilUsuario/:id', user.perfilUsuario);
router.get('/dadosPost/:id', user.getPostEdit);
router.get('/dadosPerfil/:id',user.getPerfilEdit);
router.put('/atualizarPost/', user.atualizarPost);
router.put('/atualizarPerfil/', user.atualizarPerfil);
router.delete('/excluir/', user.excluir);
router.get('/pesquisar/:titulo', user.pesquisar);
router.post('/comentar', user.comentar);
router.post('/cadastrar', user.register);
router.post('/login', user.login);
router.post('/publicar', upload.array("uploads[]", 12), user.publicar);
router.use(user.tokenAuthorize);

app.use('/api', router);
app.listen(porta,() => {
    console.log(`Servidor funcionando na porta ${porta}`) 
});