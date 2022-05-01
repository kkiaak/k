//importo 
const express = require('express');
const cors = require('cors');   //cross-origin resource sharing
const path = require('path');
const nodemailer = require('nodemailer');
const multiparty = require('multiparty');
const fs = require('fs');
const axios = require('axios');
require("dotenv").config();


//moduli locali
const twit = require('./script/twit')

const port = 3000;

//installo express app
const app = express();
// cors
app.use(cors({ origin: "*"}));

//inizializzo la variabile delle api a null
var twitAPI = null;

//Static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

//set views
//app.set('views','./views' )
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//renderizzo
app.get('/monza10.html', (req,res) => {
    res.render('monza10');
})

app.get('/scoutismo.html', (req,res) => {
    res.render('scoutismo');
})

app.get('/Mz10.html', (req,res) => {
    res.render('Mz10');
})

app.get('/unita.html', (req,res) => {
    res.render('unita');
})

app.get('/branco.html', (req,res) => {
    res.render('branco');
})

app.get('/reparto.html', (req,res) => {
    res.render('reparto');
})

app.get('/clan.html', (req,res) => {
    res.render('clan');
})

app.get('/capi.html', (req,res) => {
    res.render('capi');
})

app.get('/contatti.html', (req,res) => {
    res.render('contatti');
})

app.get('/documenti.html', (req,res) => {
    res.render('documenti');
})



//twitter
    exports.getTweet = () => {
    var T = new Twit({
        consumer_key: 'rHN5uDnuB6ACWf8FaIe6h34ZU',
        consumer_secret: '6UmmQoGrM6SVjBanocZX5xBz2pL5P2g3R2eZWN6dLiljJtbjpw',
        app_only_auth: true,
        
    });

    T.get('search/tweets', { q: 'agesci', count: 15 }, function (err, data, response) {
        fs.writeFile(__dirname + '/json/twitt.json', JSON.stringify(data), 'utf8', (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Json Tweet -agesci- Saved")
            }
        });
    });
    T.get('search/tweets', { q: 'scouting', count: 15 }, function (err, data, response) {
        fs.writeFile(__dirname + '/json/twitt.json', JSON.stringify(data), 'utf8', (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Json Tweet -scouting- Saved")
            }
        });
    });
};



//creo oggetto transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    auth : {
        user: 'progettopwm@outlook.com',    //qui ci sarebbe da usare process.env.EMAIL e .PASS 
        pass: 'project2022pwM',
    },
});

//verifico la connessione per rendere le credenziali corrette e nodemailer è autorizzato a inviare email da quell'indirizzo
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server è pronto a prendere i messaggi");
    }
});

//creiamo infine il percorso POST 
app.post("/send", (req,res) => {
    console.log('Got body:', req.body);    
    //accetta i dati del modulo inviati e li analizza usando .multiparty
    let form = new multiparty.Form();
    let data = {};
    form.parse(req, function (err, fields) {
        console.log(fields);
        Object.keys(fields).forEach(function (property) {
            data[property] = fields[property].toString();
            console.log("ciao" + data[property].toString());
        });
        console.log(data);
    //dopo averlo analizzato, creo ogg con proprietà .mail 
        const mail = {
            from: data.email,
            to: process.env.EMAIL,
            subject: 'FORM DI CONTATTO',
            text: "${data.name} <${data.email}> \n${data.message}",
    };

    //uso transporter.sendMail() per inviare email
    transporter.sendMail(mail, (err,data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Qualcosa non va"); 
        } else {
            res.status(200).send("Email inviata con successo");
        }
    });
  });
});

// invio email
app.route("/contatti.html").get(function (req,res) {
    res.sendFile(process.cwd() + "public/contatti")
});



/*
app.route("/public").get(function (req,res) {
    res.sendFile(process.cwd() + "/contatti");
}); */

//twitter

const update = async() => {
    twit.getTweet()
    try {
        twitAPI = JSON.parse(await fs.readFile(__dirname + '/script/json/twitt.json', 'utf8', (err,data) => {
                if (err) {
                    console.error(err)
                }
                return data
            }));       
    } catch(err) {
        console.error('Error: ', err)
    }
}

const renderHome = async (req, res) => {
    await update() //aspetto che tutti i file vengano scaricati
    
    try {
        res.render('/', { twit:
            twitAPI.statuses
        })
    } catch (err) {
        res.render('/', { twit:
            null
        })
        console.error('Error: ', err)
    }
}

//gestisco monza.ejs
app.get('/', renderHome);



//Listen on port 3000
//app.listen(port, () => console.info('Listening on port ${port}...'));

app.listen(port, () => {
    console.log('Listening');
});
