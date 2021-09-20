const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'p7_oc'
});

connexion.connect();

connexion.query('SELECT * from users', (error, result, fields) => {
    if(error) {
        throw error
    }
    // console.log(result);
});

connexion.end();