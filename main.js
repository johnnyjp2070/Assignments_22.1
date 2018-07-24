const express = require('express')
let mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const products = require('./products.model.js')

var db = 'mongodb://localhost:27017/products' 
mongoose.connect(db)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('products.ejs')
})

app.get('/products', function(req, res){
    products.find().exec(function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(data)
        }
    })
})

app.get('/products/:id', function(req, res){
    products.findById({_id: req.params.id}).exec(function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(data)
        }
    })
})

app.delete('/products/:id', function(req, res){
    var msg = {
        message: 'Note Deleted Sucessfully'
    }
    products.deleteMany({availability: req.params.id}, function(err, data){
        if(err){
            console.log('There was an error')
        } else {
            res.json(msg)
        }
    })
})


app.post('/products', function(req, res){
    newProduct = new products()
    newProduct.pName = req.body.pName
    newProduct.size = req.body.size
    newProduct.color = req.body.color
    newProduct.availability = req.body.availability
    newProduct.save(function(err, data){
         if(err){
             console.log('There was an error')
             console.log(err)
         } else {
            res.json(data)
            
         }
     })
})


app.listen(3000)
console.log('Server Listening at port 3000')
