const mysql = require('mysql');

// Criar conexao
const pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b0ed2151f8fc3e',
    database : 'heroku_a1ffcb76dd01492',
    password : '2dfda0d9',
});

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
