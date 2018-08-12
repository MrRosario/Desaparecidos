const express    = require('express');
const user       = require('./Routes/Users');
const database   = require('./Models/database');
const cors       = require('cors');
const bodyParser = require('body-parser');
const porta      = process.env.PORT || 3000;

// users.use(cors());

database.connection.connect(function(err) {
    if (err) throw err;
    console.log("Conectado ao banco de dados!");
});

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


router.get('/', user.all);
router.get('/:id', user.user);
router.get('/comentarios/:id', user.comment);
router.post('/cadastrar',user.register);
router.post('/login',user.login);

app.use('/api', router);
app.listen(porta,() => {
    console.log(`Servidor funcionando na porta ${porta}`) 
});