const eventRouter = require("./routes/event-router");
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var expressValidator = require('express-validator');
app.locals.baseURL = "http://localhost:4001";
var cookieParser = require('cookie-parser')
var session = require('express-session');
var flash = require('req-flash');

app.use(cookieParser());
app.use(expressValidator());
app.use(express.json());
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));
app.use(flash());
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/',eventRouter);
app.use( express.static( "public" ) );

app.use('*', function (req, res) {
  res.status(404).send({error: "This url is not defined."})
});

const port = process.env.PORT || 4001;
app.listen(port,()=>console.log(`Listening on port ${port}...`));