const http = require("http");
const express = require("express");
const morgan = require("morgan");
const expressHandlebars = require("express-handlebars");
const routes = require("./routes/index.routes.js");

const HTTP_PORT_NUMBER = process.env.port || 3000;

const app = express();

app.engine("handlebars", expressHandlebars());
app.set("view engine", "handlebars");

app.use(morgan("dev"));
app.use("/", routes);

app.use(express.static("public"));

const server = http.createServer(app);
server.listen(HTTP_PORT_NUMBER, function () {
  console.log(`💀 ::Malicious:: Server started on port: ${server.address().port}`);
});
