const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose')

const path = require('path'); 

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '/public/dist')))

const port = 8000

mongoose.connect('mongodb://localhost/product');

mongoose.Promise = global.Promise

var ItemSchema = new mongoose.Schema( {
    title: String,
    price: String,
    url: String
});


mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Item')

app.post("/newproduct", function (req, res, next){
    var item = new Item({title: req.body.title, price: req.body.price, url: req.body.url})
    item.save(function(err) {
        if(err) {
            console.log('something went wrong')
        }
        else {
            console.log("we did it!")
            res.json(item)
        }
    })
})

app.get("/allproducts", function (req, res, next) {
    console.log('at /allproducts')
    Item.find({}, function(err, items) {
        console.log("items at server",items)
        res.json(items)
    })
})

app.put("/updateproduct/:id", function (req, res, next) {
    var item = Item.update({_id: req.params.id}, req.body)
    .then(response => {res.json(response)})
    .catch(err=>console.log('error at update products',err))
})

app.put("/deleteproduct/:id", function (req, res, next) {
    Item.remove({_id: req.params.id})
    .then(response => {res.json(response)})
    .catch(err=>console.log('error at delete products',err))
})

app.all("*",(req,res,next) => {
        res.sendfile(path.resolve("./public/dist/index.html"))
    })

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});