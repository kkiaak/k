var Twit = require('twit')
const fs = require('fs')

exports.getTweet = () => {
    var T = new Twit({
        consumer_key: 'inserisci la consumer key',
        consumer_secret: 'inserisci la secret key',
        app_only_auth: true,
        strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    T.get('search/tweets', { q: 'agesci', count: 15 }, function (err, data, response) {
        fs.writeFile(__dirname + '/json/twitt.json', JSON.stringify(data), 'utf8', (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Json Tweet -agesci- Saved")
            }
        })
    })
    T.get('search/tweets', { q: 'scounting', count: 15 }, function (err, data, response) {
        fs.writeFile(__dirname + '/json/twitt.json', JSON.stringify(data), 'utf8', (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Json Tweet -scounting- Saved")
            }
        })
    })
}
