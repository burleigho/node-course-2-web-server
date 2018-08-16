const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');
const app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    welcomePage: 'Welcome to my Page',
    pageTitle: 'Home Page',
    })
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    welcomePage: 'Welcome to my Projects Page',
    pageTitle: 'Projects Page',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    welcomePage: 'Welcome to my Page',
    pageTitle: 'About Page',
  })
});

app.get('/bad', (req, res) => {
  res.send({
      errorMessage: 'Unable to handle this'
  })
});

app.listen(port, () => {
  console.log(`Server is up on Port ${port}`)
});