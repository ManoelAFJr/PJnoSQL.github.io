const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const flash = require("connect-flash");
const passport = require("passport");
const path = require("path");
const setUpPassport = require("./setup");
const session = require("express-session");

const routeDelet = require('./APP/routes/delete');
const routeEdit = require('./APP/routes/edit');
const routeIndex = require('./APP/routes/index');
const routeLogin = require('./APP/routes/login');
const routeSingup = require('./APP/routes/singup');

const app = express();
dotenv.config();
setUpPassport();

app.set("port", process.env.API_PORT || 8000);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", __dirname + "'./public/style'");
app.set("views", path.join(__dirname, "APP/views"));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use( routeIndex);
app.use( routeLogin);
app.use( routeDelet);
app.use( routeEdit);
app.use( routeSingup);

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});
