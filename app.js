const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer')
const mysql = require('mysql');

//creo conessione
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'YES',
    database : 'scoutmz10'
});

//connect (per login)
/*  questo non mi funziona
db.connect((err) => {           //funz di callback 
    if(err) {
        throw err;
    }
    console.log('MySql Connected...');
}); */

const app = express();



//view engine setup (per contact)
app.engine('handlebars', exphbs()); // --> mi dice che exphbs non è una funzione
app.set('view engine', 'handlebars');

//static folder (per contact)
app.use('/public', express.static(path.join(__dirname, 'public')));

//body-parser middleware(per contact)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//per contact form
app.get('/',(req,res) => {
    res.render('contatti');
});

//creo DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE scoutmz10';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

//creo tabelle
app.get('/createutentitable', (req,res) => {
    let sql = ' CREATE TABLE utenti(email int AUTO_INCREMENT, title VARCHAR(50), body VARCHAR(255), PRIMARY KEY (email)) '; //capire quali attributi mettere
    db.query(sql,(err) => {
        if(err) throw err;
        console.log(result);
        res.send('Utenti table created...');
    });
});

//insert utente1
app.get('/addutente1', (req,res) => {
    let post = {title:'Utente Uno', body:'Questo è il primo utente'};
    let sql = 'INSERT INTO utenti SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log('Utente 1 aggiunto')
    })
})

//porta 
app.listen('3000', () => {
    console.log('Server started on port 3000')
});