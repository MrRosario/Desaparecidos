const mysql = require('mysql');

// Criar conexao
// const con = mysql.createConnection({
//     host     : 'us-cdbr-iron-east-01.cleardb.net',
//     user     : 'b0ed2151f8fc3e',
//     database : 'heroku_a1ffcb76dd01492',
//     password : '2dfda0d9',
// });

// function handleDisconnect() {
//     // Recreate the connection, since
//     // the old one cannot be reused.
  
//     con.connect(function(err) {              // The server is either down
//       if(err) {                                     // or restarting (takes a while sometimes).
//         console.log('error when connecting to db:', err);
//         setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//       }
//       console.log("Conectado ao banco de dados!");
//     });                                        // to avoid a hot loop, and to allow our node script to
//                                              // process asynchronous requests in the meantime.
//                                             // If you're also serving http, display a 503 error.
//     con.on('error', function(err) {
//       console.log('db error', err);
//       if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//         handleDisconnect();                         // lost due to either server restart, or a
//       } else {                                      // connnection idle timeout (the wait_timeout
//         throw err;                                  // server variable configures this)
//       }
//     });
//   }
  
//   handleDisconnect();

// const con = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     database : 'Desaparecidos',
//     password : 'mysql1994' 
// });

// // Criar conexao
const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b0ed2151f8fc3e',
    database : 'heroku_a1ffcb76dd01492',
    password : '2dfda0d9',
});

// pool.on('release', () => console.log('pool => conexão retornada'));
// pool.on('acquire', function (connection) {
//     console.log('Connection %d acquired', connection.threadId);
// });
// pool.on('connection', function (connection) {
//     connection.query('SET SESSION auto_increment_increment=1')
// });

// pool.on('release', () => console.log('pool => conexão retornada')); 

// process.on('SIGINT', () => 
//     pool.end(err => {
//         if(err) return console.log(err);
//         console.log('pool => fechado');
//         process.exit(0);
//     })
// ); 

// pool.getConnection(function(err, connection) {
//     if(err) { 
//       console.log(err); 
//       callback(true); 
//       return; 
//     }
//     var sql = "SELECT UsuarioID, Nome, Sobre_nome, Email FROM Usuarios";
//     connection.query(sql, [], function(err, results) {
//       connection.release(); // always put connection back in pool after last query
//       if(err) { 
//         console.log(err); 
//         callback(true); 
//         return; 
//       }
//       callback(false, results);
//     });
//   });

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release(); // always put connection back in pool after last query
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};