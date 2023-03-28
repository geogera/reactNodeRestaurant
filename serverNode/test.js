const express= require("express")
const app= express();
const bodyParser = require('body-parser')
const mongoose = require ("mongouse")
const ejs = require("ejs")
const Port= process.env.PORT||3000
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(bodyParser.json())
mongoose.set('strictQuery',false);

async function main(){
    mongoose.connect("mongodb+srv://admin-george:test123@cluster0.7ymppkt.mongodb.net/restaurantDB",{ useNewUrlParser: true })
}
const itemSchema= new mongoose.Schema({})

const Item= mongoose.model("Item",itemSchema)





app.get("/",async (req,res)=>{
    main().catch(e=>console.log(e))
Item.find({}).then((items)=>{
    if(items.length===0){
        Item.insertMany(docs).then(res.redirect("/"))
    }else{
        res.send(items)
    }
})

})

app.listen(Port,(req,res)=>{
    console.log("listning on ${Port}")
})



React.useEffect(()=>{
    fetch('/').then((res)=>res.json()).then((data)=>(data))
},[]
   
)
