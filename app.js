let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let router = require('./routes/index')
let exphbs = require('express-secure-handlebars')
var socket = require('socket.io');
let app = express()

app.engine('.hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  helpers: {
    ifvalue: function (conditional, options) {
      if (options.hash.value === conditional) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    },
    dateFormat: require('handlebars-dateformat')
  }
}))
app.set('view engine', '.hbs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)

app.use(function (req, res, next) {
  res.status(404).send("Sorry, that item can't be found!")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Sorry, something is broken!')
})

let server = app.listen(8080, function () {
  console.log('App listening on port 8080!')
})

let io = socket(server)
module.exports.io = io
