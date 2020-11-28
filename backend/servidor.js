var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
var app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Probando endpoint',
        success: true
    })
});


app.get('/products', (req, res) => {

    fs.readFile("./products/all.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
        return;
    });
    
});

app.get('/products_info', (req, res) => {

    fs.readFile("./products/productInfo.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });
    
});

app.get('/products_comments', (req, res) => {

    fs.readFile("./products/productComments.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });
    
});

app.get('/products_publish', (req, res) => {

    fs.readFile("./products/publish.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });
    
});




app.get('/categories', (req, res) => {

    fs.readFile("./category/all.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });

});

app.get('/category_info', (req, res) => {

    fs.readFile("./category/1234.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });

});

app.get('/cart_info', (req, res) => {

    fs.readFile("./cart/info.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });

});

app.get('/cart_buy', (req, res) => {

    fs.readFile("./cart/buy.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });

});

app.get('/cart_articles', (req, res) => {

    fs.readFile("./cart/articles.json", "utf-8", function(err, data){
        if(err) {
            res.json({
                message: err,
                success: false
            })
            return;
        }
        
        res.json({
            data: JSON.parse(data),
            success: true
        })
    });

});

app.post('/buy_files', (req, res) => {
    console.log(req)
    var thisvar = JSON.stringify(req.body)
    fs.writeFile("./checkout/buyInfo.txt", thisvar, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        res.send(
            '<br><h2 style="text-align: -webkit-center;">Compra realizada con éxito. ¡Muchas gracias!</h2><a href="http://127.0.0.1:8080/products.html"><button type="button" style="margin-left: 650px";>Volver a productos</button></a>'
        )
    }); 
})

app.listen(4040, () =>{
    console.log('Servidor de ezequiel funcionando en puerto 4040')
});