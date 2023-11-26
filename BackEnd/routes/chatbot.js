const { Places } = require('../models/Places');
const express = require('express');
const router = express.Router();

const nlp = require('compromise');

// Define known places
const knownPlaces = [
  'sigiriya', 'galle', 'colombo', 'kandy', 'nuwaraeliya',
  'dambulla', 'anuradhapura', 'polonnaruwa', 'yala', 'mirissa', 'trincomalee', 'jaffna'
];

function extractInformation(text) {
  const doc = nlp(text);

  // Extract destinations using the knownPlaces array
  const destinations = doc.places().out('array').filter(place =>
    knownPlaces.includes(place.toLowerCase())
  );

  // Extract dates as month names
  const months = doc.match('(#Month|#Date)').out('array');

  const peopleDetails = doc.people().out('array');
  const numberOfPeople = peopleDetails.length > 0 ? peopleDetails.length : null;

  const vehicles = doc.nouns().match('vehicle').out('array');
  const numberOfVehicles = vehicles.length > 0 ? vehicles.length : null;

  const duration = doc.match('#Duration').out('array');
  const numberOfDays = duration.length > 0 ? parseInt(duration[0]) : null;

  return {
    destinations,
    months,
    numberOfPeople,
    numberOfVehicles,
    numberOfDays,
  };
}

router.post('/message', async (req, res) => {
  const { userInput, userId } = req.body;

  try {
    const information = extractInformation(userInput);
    console.log(information);

    var message = null;

    if (information.destinations.length > 0) {
      message = 'You are planning a trip to ' + information.destinations.join(', ');
    } else if (information.months.length > 0) {
      message = 'You are planning your trip in ' + information.months.join(', ');
    } else if (information.numberOfPeople !== null) {
      message = 'You are planning your trip with ' + information.numberOfPeople + ' people.';
    } else if (information.numberOfVehicles !== null) {
      message = 'You need ' + information.numberOfVehicles + ' vehicles for your trip.';
    } else if (information.numberOfDays !== null) {
      message = 'You are planning to stay for ' + information.numberOfDays + ' days during your trip.';
    } else {
      message = "Sorry, I don't understand. Please tell us about your plans.\n\nExample: I am planning a trip to Sigiriya, Galle, Colombo, and an Asus. Start date is January 1st for 3 people. We need 2 vehicles and plan to stay for 5 days.";
    }

    res.status(200).json({ message: message });

  } catch (error) {
    console.error("err", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Example usage
const inputText = 'I want to go kandy and colombo with my wife in 2023.03.04. We go our car.';
// const inputText = 'I want to go Jaffna. In next Monday. Today date 2023.11.21';

module.exports = router;
