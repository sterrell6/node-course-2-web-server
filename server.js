const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.PORT || 3000;;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();


});
//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});
app.get('/', (req, res) => {
    res.render('maintenace.hbs', {
        pageTitle: 'Maintenace Page',
        welcomeMessage: 'We will be back soon'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});
