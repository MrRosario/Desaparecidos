const express    = require('express');
const user       = require('./Routes/Users');
const database   = require('./Models/database');
const cors       = require('cors');
const bodyParser = require('body-parser');
const porta      = process.env.PORT || 3000;
const multer     = require('multer')

// cria uma instância do middleware configurada
// destination: lida com o destino do arquivo
// filenane: permite definir o nome do arquivo gravado
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

// utiliza a storage para configurar a instância do multer
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

router.get('/', user.all);
router.get('/:id', user.user);
router.get('/comentarios/:id', user.comment);
router.get('/perfil/:id', user.perfil);
router.get('/dadosPost/:id', user.getPostEdit);
router.put('/atualizarPost/', user.atualizarPost);
router.delete('/excluir/', user.excluir);
router.get('/pesquisar/:titulo', user.pesquisar);
router.post('/comentar', user.comentar);
router.post('/cadastrar', user.register);
router.post('/login', user.login);
router.post('/publicar', upload.single('file') ,user.publicar);
router.use(user.tokenAuthorize);

app.use('/api', router);
app.listen(porta,() => {
    console.log(`Servidor funcionando na porta ${porta}`) 
});