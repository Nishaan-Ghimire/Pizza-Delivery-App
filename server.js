//Importing required Modules
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

// Initializing express and port
const app = express();
const PORT = process.env.PORT || 3500;

// Assets
app.use(express.static('public'));


// set Template Engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


// Routing
    app.get('/',(req,res)=>{
    res.render('home');
    });
    
    app.get('/cart',(req,res)=>{
        res.render('customer/cart');
    })

    app.get('/login',(req,res)=>{
        res.render('auth/login');
    })

    app.get('/register',(req,res)=>{
        res.render('auth/register');
    })
    
    
// Listing
app.listen(PORT,()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
})
