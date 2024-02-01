const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
var items = ["Guitar Practice", "Coding Practice", "Work out"];
var workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({   
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema ={
    name : String,
    items : [itemsSchema]
} 

const List = mongoose.model ("List",listSchema);


app.get("/", function (req, res) {

    Item.find({}).then (function(foundItems){

        if (foundItems.length === 0){
            Item.insertMany(defaultItems).then(function(){
                console.log("Successfully saved default items to DB.");
            }).catch(function(err){
                console.log(err);
            }
            );
            res.redirect("/");
        }
        else
            res.render("list", { listTitle: "Today", itemList: foundItems });

        
        
    });
    



});




app.get("/:customListName",function(req,res){
    
    const customName = _.capitalize(req.params.customListName);
    
    List.findOne({name:customName }).then(function(foundList){
        if (!foundList){
            const list = new List({
                name: customName,
                items: defaultItems
            
            });
            list.save();

            res.redirect("/" + customName);
        }
        else{
            res.render("list",{ listTitle: foundList.name, itemList: foundList.items })
        }
    }).catch(function(err){
        console.log(err);
   
});
    
    

    
    
});

app.get("/about", function (req, res) {
    res.render("about")
})
app.post("/", function (req, res) {

    let itemName = req.body.newItem;
    let listName = req.body.list;
    
    const item = new Item({
        name: itemName
    });

    if (listName === "Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name:listName }).then(function(foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });

    }
    

});

app.post("/delete",function(req,res){ 
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    if (listName === "Today"){
        Item.findByIdAndDelete(checkedItemId).then(function(){
            console.log("Successfully deleted default items to DB.");
        }).catch(function(err){
            console.log(err);
        }
        );
        res.redirect("/");
    }
    else{
        List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}}).then(function(foundList){
            res.redirect("/" + listName);
    }).catch(function(err){
        console.log(err);
    });
    }
});





app.listen(3000, function () {

    console.log("server started on port 3000 yo")
})