const Express = require("express")
const app = Express()
const Cors = require("cors")
app.use(Cors())
app.use(Express.json())

const Mongoose = require("mongoose")

const ProductSchema = new Mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image_url: String
})

const Product = Mongoose.model("products", ProductSchema)

Mongoose.connect("mongodb+srv://mary:Welcome1234@cluster0.9nw5aik.mongodb.net/productsdatabase?retryWrites=true&w=majority&appName=Cluster0")

app.get("/fetch/products", async function(req, res){
    const readProducts = await Product.find()
    res.json({data: readProducts})
})

app.post("/collect/product", async function(req, res){
    const productData = req.body
    const data = new Product(productData)
    await data.save()
})

app.listen(8000, function(){
    console.log("Server is running on the port 8000!")
})
