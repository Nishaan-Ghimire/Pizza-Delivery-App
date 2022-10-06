//Importing required Modules
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

// Initializing express and port
const app = express();
const PORT = process.env.PORT || 3300;

// Routing
app.get('/',(req,res)=>{
res.render('home');
});


// set Template Engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

// Listing
app.listen(PORT,()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
})
