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
