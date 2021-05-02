/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */

const express = require("express");
const fs = require("fs");
const handlebars = require("express-handlebars");
const session = require("express-session");

// server
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log("listen in the port", PORT));

// Middlwares

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
}));
app.set("views", __dirname);
app.engine("hbs", handlebars({
    defaultLayout: "main",
    layoutsDir: __dirname,
    extname: ".hbs",
}));
app.set("view engine", "hbs");

// Login

const login = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect("/login");
} else {
        next();
    }
};

// DB

const users = JSON.parse(fs.readFileSync("db.json"));

// routes
app.get("/home", login, (req, res) => {
    res.send("Home page, must be logged in to access");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (!user || user.password !== req.body.password) {
        return res.status(400).send("invalid credentials");
    }
    req.session.userId = user.id;
    console.log(req.session);
    res.redirect("/home");
});

app.get("/logout", login, (req, res) => {
  req.session.destroy();
  res.send("Logged Out");
});

app.get("/edit", login, (req, res) => {
    res.render("edit");
});

app.post("/edit", login, (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    user.email = req.body.email;
    console.log(`User ${user.id} email changed to ${user.email}`);
    res.send(`email changed to ${user.email}`);
});
