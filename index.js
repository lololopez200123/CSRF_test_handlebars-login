/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */

const express = require("express");
const fs = require("fs");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 3000;

// server

app.listen(PORT, () => console.log("listen in the port", PORT));

// Middlwares

app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname);
app.engine("hbs", handlebars({
    defaultLayout: "main",
    layoutsDir: __dirname,
    extname: ".hbs",
}));
app.set("view engine", "hbs");

// DB

const users = JSON.parse(fs.readFileSync("db.json"));

// routes
app.get("/home", (req, res) => {
    res.send("Home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    console.log(req.body);
});
