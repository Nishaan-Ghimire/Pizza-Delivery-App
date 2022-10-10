//Importing required Modules
require('dotenv').config(); //for using .env file
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');  //Setting up ejs layouts
const path = require('path');
const mongoose = require('mongoose'); //Connect to mongodb
const session = require('express-session'); // For using session
const flash = require('express-flash');  // Create an unique session for each every client
const MongoDbStore = require('connect-mongo');  //use for storing session in database



// Initializing express and port
const app = express();
const PORT = process.env.PORT || 3500;


// Database Connection
const URI = 'mongodb://localhost/pizza';

mongoose.connect(URI, {

useNewUrlParser: true, 

useUnifiedTopology: true 

}, err => {
if(err) throw err;
console.log('Connected to MongoDB!!!')
});

// Session Store

let mongoStore = MongoDbStore.create({
    mongoUrl : URI,
    collection: "sessions"
});





// Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}))

//Initializing express-flash for generating session Id
app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.json());


// Global middleware
app.use((req,res,next)=>{
        res.locals.session = req.session;
        next();
}
)

// set Template Engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');


 // Routing
require('./routes/web')(app);


    
    
// Listing
app.listen(PORT,()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
})
