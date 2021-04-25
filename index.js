const { response } = require("express");
const express = require("express");
const { request } = require("http");
const Datastore = require("nedb");

const app = express();
app.listen(3400, () => {
  console.log("Listening at 3400");
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  const data = request.body;
  database.insert(data);
  response.json(data);
});
