//Importing required Modules
require('dotenv').config(); //for using .env file
const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');  //Setting up ejs layouts
const path = require('path');
const mongoose = require('mongoose'); //Connect to mongodb

const flash = require('express-flash');  // Create an unique session for each every client
const passport = require('passport');
const session = require('express-session'); // For using session
const MongoDbStore = require('connect-mongo');  //use for storing session in database
const Emitter = require('events');

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


// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter',eventEmitter);





// Session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}))



// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.session());
app.use(passport.initialize());


//Initializing express-flash for generating session Id
app.use(flash());

// Assets
app.use(express.static('public'));

// Type of data received in register
app.use(express.urlencoded({extended: false}));
// Type of data received in add to cart
app.use(express.json());


// Global middleware
app.use((req,res,next)=>{
        res.locals.session = req.session;
        res.locals.user = req.user;
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
const server = app.listen(PORT,()=>{
    console.log(`Listening on port http://localhost:${PORT}`);
})



// Socket

// const io = require('socket.io')(server);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})



io.on('connection',(socket)=>{
    // Join
    console.log(socket.id)
socket.on('join',(orderId)=>{
    socket.join(orderId);
})

})

eventEmitter.on('orderUpdated',(data)=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data);
})


eventEmitter.on('orderPlaced',(data)=>{
    io.to('adminRoom').emit('orderPlaced',data)
    console.log('fine here nishan');
    console.log(data)
})