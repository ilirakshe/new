const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

// Load User Model
require("./models/User");

//Passport config
require("./config/passport")(passport);

// Load routes
const auth = require("./routes/auth");
const index = require("./routes/index");
const stories = require("./routes/stories");

// Load keys from ./config
const keys = require("./config/keys");

//Map - global parametres
mongoose.Promise = global.Promise;

// Mongoose Connect
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo connected.."))
  .catch((err) => console.log(err));

const app = express();

// Express-Handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
//

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Set Static folder for css styles etc.
app.use(express.static(path.join(__dirname, "public")));

// Use routes
app.use("/", index);
app.use("/auth", auth);
app.use("/stories", stories);

const port = process.env.PORT || 5000;
// Server running
app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
