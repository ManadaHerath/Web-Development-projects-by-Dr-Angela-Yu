const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const app = express();
var items = ["Guitar Practice", "Coding Practice", "Work out"];
var workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date.getDay()
    res.render("list", { listTitle: day, itemList: items })



});
app.get("/work", function (req, res) {


    res.render("list", { listTitle: "Work Tasks", itemList: workItems })



});
app.get("/about", function (req, res) {
    res.render("about")
})
app.post("/", function (req, res) {
    let item = req.body.todo

    if (req.body.button === "Work Tasks") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});




app.listen(3000, function () {

    console.log("server started on port 3000 yo")
})