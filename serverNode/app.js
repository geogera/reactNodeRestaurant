const express = require("express");
const ejs = require("ejs")
const mongoose = require("mongoose");
const { Int32 } = require("mongodb");
const Port = process.env.PORT || 3000;
const bodyParser = require("body-parser")
const app = express();
const https = require("https")
require('dotenv').config();
const path = require('path');

app.set("view engine", 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json())
mongoose.set('strictQuery', false);


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../clientReact/build')));

//connect to db
async function main() {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true },);

}

//create models and schemas
const itemSchema = new mongoose.Schema({
  name: String,
  price: { type: Number }
});

function getPrice(num) {
  return (num / 100).toFixed(2);
}

function setPrice(num) {

  return num * 100;
}
const Item = mongoose.model("Item", itemSchema);



const menuSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});


const Category = mongoose.model("Category", menuSchema);

const orderSchema = new mongoose.Schema({

  items: [itemSchema]
});


const Order = mongoose.model("Order", orderSchema);

//default docs
const docs = [{ name: "Appetizers", items: [{ name: "French Fries", price: 3.5 }, { name: "Tzatziki", price: 3 }] },
{ name: "Drinks", items: [{ name: "Coca Cola", price: 1.5 }, { name: "Beer", price: 2 }] },
{ name: "MainDishes", items: [{ name: "Chicken Parm", price: 6 }, { name: "Carbonara", price: 5 }] }]


app.get("/api", async (req, res) => {
  main().catch(err => console.log(err));

  Category.find({}).then((foundCategories) => {
    //if collection is empty insert docs
    if (foundCategories.length == 0) {

      Category.insertMany(docs).then(() => {
        res.redirect("/")
      });

    } else {
      //send docs 
      res.send(foundCategories)
    }
  }).catch((error) => {
    //When there are errors We handle them here

    console.log(error);

  });
});

//send the order items
app.get("/apiOrderItems", async (req, res) => {
  main().catch(err => console.log(err));

  Order.find({}).then((items) => {

    res.send(items)

  }).catch((error) => {
    //When there are errors We handle them here

    console.log(error);

  });
});

//save the order items when a user makes an order
app.post("/apiOrderItems", async function (req, res) {
  main().catch(err => console.log(err));
  // ******************************insert new item in th db*********************************
  const items = req.body.data
  console.log(items)
  const order = new Order({
    items: items
  })

  await order.save().catch((err) => {
    console.log(err)
  })


})


//delete order items from collection if the order is done
app.post("/apiDelete", async (req, res) => {
  main().catch((e) => { console.log(e) });
  const orderId = req.body.id;
  Order.findByIdAndRemove(orderId).then(res.redirect('/orderItems')).catch(e => { console.log(e) })
})


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../clientReact/build/public', 'index.html'));
});



app.listen(3001, function () {
  console.log("Server started on port 3001");
});


