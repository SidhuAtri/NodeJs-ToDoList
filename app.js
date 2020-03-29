const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Buy food", "Cook Food"];
let workItems = [];

let today = new Date();

let options = {
  weekday: "long",
  day: "numeric",
  month: "long"
};

let day = today.toLocaleDateString("en-US", options);

app.get("/", function(req, res) {
  res.render("list", {
    weekday: day,
    general: "General List",
    newListItems: items
  });
});

app.get("/work", function(req, res) {
  res.render("work", {
    weekday: day,
    work: "Work",
    newListItems: workItems
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("server is up and running on port 3000");
});
