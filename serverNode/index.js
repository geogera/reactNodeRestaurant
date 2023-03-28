const express = require("express");
const ejs =require ("ejs")
const mongoose = require("mongoose");
const { Int32 } = require("mongodb");
const Port = process.env.PORT || 3000;
const bodyParser= require ("body-parser")
const app = express();

app.set("view engine",'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery',false);

 async function main() {
  mongoose.connect("mongodb+srv://admin-george:test123@cluster0.7ymppkt.mongodb.net/restaurantDB",{ useNewUrlParser: true }, );

}


    const itemSchema = new mongoose.Schema({
        name: String,
        price:Number
      });
      
      const Item = mongoose.model("Item",itemSchema);


       
      const menuSchema = new mongoose.Schema({
        name:String,
        items:[itemSchema]
      });


      const Category= mongoose.model("Category",menuSchema);

      
      const docs=[{name:"Appetizers",items:[{name:"French Fries",price:3.5},{name:"Tzatziki",price:3}]},
      {name:"Drinks",items:[{name:"Coca Cola",price:1.5},{name:"Beer",price:2}]},
      {name:"MainDishes",items:[{name:"Chicken Parm",price:6},{name:"Carbonara",price:5}]}]

     
      app.get("/", async (req,res)=>{
        main().catch(err => console.log(err));
       
       Category.find({}).then((foundCategories)=>{
            if (foundCategories.length==0){
              
               Category.insertMany(docs).then(()=>{
                  res.redirect("/")
                });
                 
            }else{
              console.log(foundCategories)
                res.render("home",{newListItems: foundCategories})
            }
        }).catch((error) => {
            //When there are errors We handle them here
     
     console.log(error);
            
        });
      });


      app.post("/",async (req,res)=>{
        const order =req.body.order
       console.dir(req.body)
       const orderArray=order.split(',');
        console.log(orderArray[1]);
        res.redirect("/");
      });

      app.listen(3000, function() {
        console.log("Server started on port 3000");
      });
      