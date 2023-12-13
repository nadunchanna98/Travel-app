// const express = require("express");
// const app = express();
// require('dotenv/config');
// const bodyParser = require("body-parser"); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// const morgan = require("morgan");   // for logging requests to the console (express4) 
// const mongoose  = require('mongoose'); 
// const cors  = require('cors');  // for cross origin resource sharing 


// mongoose.set('strictQuery', false); // for strict query  , for clear DeprecationWarning mongodb

// const api = process.env.API_URL; // http://localhost:3000/api/

// app.use(cors()); 
// app.options('*',cors()); // for preflight request

// // Middleware
// app.use(bodyParser.json());  // for parsing application/json
// app.use(morgan('tiny'));  // for logging requests to the console (express4)


// //Routers 
// const UsersRoutes = require('./routes/Users');
// const PlacesRoutes = require('./routes/Places');
// const ChatbotRoutes = require('./routes/chatbot');


// //api routes  
// app.use(`${api}/users`, UsersRoutes);
// app.use(`${api}/places`, PlacesRoutes);
// app.use(`${api}/chatbot`, ChatbotRoutes);


// //server
// app.listen(3000, ()=>{
//     console.log('Server is running on port number: http://localhost:3000 ' )
// })

// //database
// mongoose.connect(process.env.CONNECTION_STRING,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         dbName: 'Travel_App'
//     })

// .then(()=>{
//     console.log('Travel_App DB connected') 
// }).catch((err)=>{
//     console.log(err)
// })


























// const { Places } = require('../models/Places');
// const express = require('express');
// const router = express.Router();

// const natural = require('natural'); // natural language toolkit
// const nlp = require('compromise');  // compromise is a natural language processing library

// // Tokenizer and Stemmer
// const tokenizer = new natural.WordTokenizer();
// const stemmer = natural.PorterStemmer;

// function extractInformation(text) {
//   const tokens = tokenizer.tokenize(text);

//   // Your existing code for extracting destinations
//   const knownPlaces = [
//     'sigiriya', 'galle', 'colombo', 'kandy', 'nuwaraeliya',
//     'dambulla', 'anuradhapura', 'polonnaruwa', 'yala', 'mirissa', 'trincomalee', 'jaffna'
//   ];
//   const destinations = tokens.filter(token => knownPlaces.includes(stemmer.stem(token.toLowerCase())));

//   // Extract additional destinations using NLP
//   const additionalDestinations = nlp(text).places().json().map(place => place.text);

//   // Combine destinations from both sources
//   const allDestinations = [...new Set([...destinations, ...additionalDestinations])];

//   // Your existing code for extracting dates, number of people, vehicles, and days
//   const dates = text.match(/(?:\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?\b)/gi) || [];
//   const numberOfPeople = text.match(/\b(\d+)\s*(people|persons)\b/i) ? parseInt(matchPeople[1]) : null;
//   const numberOfVehicles = text.match(/\b(\d+)\s*(vehicles|cars)\b/i) ? parseInt(matchVehicles[1]) : null;
//   const numberOfDays = text.match(/\b(\d+)\s*(days)\b/i) ? parseInt(matchDays[1]) : null;

//   // Extract type of vehicle (public or private)
//   const vehicleType = /public|private/i.test(text) ? text.match(/public|private/i)[0] : null;

//   // Extract relationship details for people (e.g., wife, children)
//   const peopleDetails = nlp(text).people().json().map(person => person.text);

//   // Perform any date manipulation if needed (e.g., determining the exact date for "next Monday")

//   return {
//     destinations: allDestinations,
//     dates,
//     numberOfPeople,
//     numberOfVehicles,
//     numberOfDays,
//     vehicleType,
//     peopleDetails,
//   };
// }



// router.post('/message', async (req, res) => {
  
//     const { userInput, userId } = req.body;
  
//     try {
  
//       const information = extractInformation(userInput);

//       console.log(information.destinations);

//       var message = null;

//       if(information.destinations !== null){
//         message = `You are planning a trip to ${information.destinations}. Wonderful! So, how can I assist you further in making your trip memorable? Whether it's information on attractions, accommodations, or travel tips, feel free to let me know!`;
//       }
//       else if(information.dates !== null){
//         message = message + ' on ' + information.dates;
//       }
//       else if(information.numberOfPeople !== null){
//         message = message + ' for ' + information.numberOfPeople + ' people.';
//       }
//       else if(information.numberOfVehicles !== null){
//         message = message + ' We need ' + information.numberOfVehicles + ' vehicles.';
//       }
//       else if(information.numberOfDays !== null){
//         message = message + ' and plan to stay for ' + information.numberOfDays + ' days.';
//       }
//       else{
//         message = "Sorry, I don't understand. Please tell us about your plans.\n\nExample: I am planning a trip to Sigiriya, Galle, Colombo, and an asus. Start date is January 1st for 3 people. We need 2 vehicles and plan to stay for 5 days.";
//       }

//       res.status(200).json({ message: message});

//       console

  
//     } catch (error) {
//       console.error("err", error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// );

// // Example usage
// // const inputText =
// //   'I am planning a trip to Sigiriya, Galle, Colombo, and an asus. Start date is January 1st for 3 people. We need 2 vehicles and plan to stay for 5 days.';

// const inputText =
//   'I want to go jaffna. In next monday.Today date 2023.11.21';

//   // const information = extractInformation(inputText);
// // console.log(information);


// module.exports = router;