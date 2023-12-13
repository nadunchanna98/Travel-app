const express = require("express");
const app = express();
require('dotenv/config');
const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const morgan = require("morgan");   // for logging requests to the console (express4) 
const mongoose  = require('mongoose'); 
const cors  = require('cors');  // for cross origin resource sharing 


mongoose.set('strictQuery', false); // for strict query  , for clear DeprecationWarning mongodb

const api = process.env.API_URL; // http://localhost:3000/api/

app.use(cors()); 
app.options('*',cors()); // for preflight request

// Middleware
app.use(bodyParser.json());  // for parsing application/json
app.use(morgan('tiny'));  // for logging requests to the console (express4)


//Routers 
const UsersRoutes = require('./routes/Users');
const PlacesRoutes = require('./routes/Places');
const ChatbotRoutes = require('./routes/Chatbot');


//api routes  
app.use(`${api}/users`, UsersRoutes);
app.use(`${api}/places`, PlacesRoutes);
app.use(`${api}/chatbot`, ChatbotRoutes);


//server
app.listen(3000, ()=>{
    console.log('Server is running on port number: http://localhost:3000 ' )
})

//database
mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Travel_App'
    })

.then(()=>{
    console.log('Travel_App DB connected') 
}).catch((err)=>{
    console.log(err)
})