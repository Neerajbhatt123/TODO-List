const express = require("express");
const bodyParser = require("body-parser");
const date= require(__dirname + "/date.js");

console.log(date());
const app = express();

let items = ["Buy Food", "Eat Food"];
let workItem = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {

  let day = date()
  res.render("list", { ListTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItem.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    console.log(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work List", newListItems: workItem });
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function () {
  console.log("working !! 3000");
});
