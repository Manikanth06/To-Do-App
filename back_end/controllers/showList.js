const mongoose = require("mongoose");
const _ = require("lodash");

mongoose.connect("mongodb://localhost:27017/newtodoDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

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

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


exports.showList = (req, res) => {
    Item.find({}, function(err, foundItems){

        if (foundItems.length === 0) {
          Item.insertMany(defaultItems, function(err){
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully savevd default items to DB.");
            }
          });
          res.redirect("http://localhost:3000");
        } else {
          res.json(foundItems);
        }
      });
};

exports.new = (req, res) =>{

  const itemName = req.body.newItem;

  console.log(itemName);
  const item = new Item({
    name: itemName
  });

  
    item.save();
    res.redirect("http://localhost:3000");

};

exports.delete = (req, res) =>{
  const checkedItemId = req.body.del;
  console.log(checkedItemId);
  
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err) {
        console.log("Successfully deleted checked item.");
        res.redirect("http://localhost:3000");
      }
    });

  };