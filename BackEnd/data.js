// data.js

class Data {
    constructor() {
      this.collections = [
        {
          place: 'Colombo',
          description: 'Colombo is the commercial capital and the largest city of Sri Lanka. It is a vibrant and bustling metropolis with a mix of modern and colonial architecture.',
          places: ['Gangaramaya Temple', 'Viharamahadevi Park', 'Colombo National Museum'],
          events: ['Colombo Fashion Week', 'Kala Pola Art Festival'],
          dates: ['2023-05-01', '2023-06-15']
        },
        {
          place: 'Nuwara Eliya',
          description: 'Nuwara Eliya, also known as Little England, is a hill station with a cool climate. It is surrounded by lush tea plantations and beautiful landscapes.',
          places: ['Hakgala Botanical Garden', 'Tea Factory Tour', 'Gregory Lake'],
          events: ['Nuwara Eliya Season', 'Flower Show'],
          dates: ['2023-02-10', '2023-04-30']
        },
        {
          place: 'Kandy',
          description: 'Kandy is a cultural hub with a rich history. It is home to the Temple of the Tooth Relic and is surrounded by picturesque mountains.',
          places: ['Temple of the Tooth', 'Peradeniya Botanical Garden', 'Kandy Lake'],
          events: ['Esala Perahera', 'Kandy Festival'],
          dates: ['2023-07-15', '2023-08-30']
        },
        // Add more collections for other places in Sri Lanka
        {
          place: 'Galle',
          description: 'Galle is a historic city with Dutch colonial influences. The Galle Fort is a UNESCO World Heritage Site, and the city is known for its vibrant arts scene.',
          places: ['Galle Fort', 'Dutch Reformed Church', 'Galle International Cricket Stadium'],
          events: ['Galle Literary Festival', 'Galle Music Festival'],
          dates: ['2023-03-20', '2023-05-10']
        },
        {
          place: 'Jaffna',
          description: 'Jaffna is the cultural capital of the Northern Province, known for its unique Tamil culture. It has historic temples, palaces, and vibrant festivals.',
          places: ['Nallur Kandaswamy Kovil', 'Jaffna Fort', 'Jaffna Library'],
          events: ['Nallur Festival', 'Jaffna Music Festival'],
          dates: ['2023-08-05', '2023-09-25']
        },
        {
          place: 'Sigiriya',
          description: 'Sigiriya is famous for the ancient rock fortress, a UNESCO World Heritage Site. It offers breathtaking views and is surrounded by lush greenery.',
          places: ['Sigiriya Rock Fortress', 'Pidurangala Rock', 'Sigiriya Museum'],
          events: ['Sigiriya Perahera', 'Sigiriya Arts Festival'],
          dates: ['2023-06-10', '2023-07-30']
        },
        {
          place: 'Anuradhapura',
          description: 'Anuradhapura is one of the ancient capitals of Sri Lanka, known for its well-preserved ruins of ancient temples, stupas, and reservoirs.',
          places: ['Ruwanwelisaya', 'Jetavanaramaya', 'Sri Maha Bodhi'],
          events: ['Poson Poya', 'Anuradhapura Maha Perahera'],
          dates: ['2023-01-15', '2023-02-28']
        },
        {
          place: 'Matara',
          description: 'Matara is a coastal city with a mix of cultural and natural attractions. It has beautiful beaches, historic temples, and vibrant local markets.',
          places: ['Polhena Beach', 'Matara Fort', 'Weligama Bay'],
          events: ['Matara Beach Festival', 'Esala Festival'],
          dates: ['2023-04-05', '2023-05-25']
        },
        {
          place: 'Badulla',
          description: 'Badulla is a scenic town nestled in the Uva Province. It is surrounded by lush green hills, tea plantations, and offers a tranquil atmosphere.',
          places: ['Dunhinda Falls', 'Muthiyangana Raja Maha Viharaya', 'Bogoda Bridge'],
          events: ['Badulla Perahera', 'Uva Wellassa Perahera'],
          dates: ['2023-09-10', '2023-10-30']
        },
        // Add more collections for other places in Sri Lanka
      ];
    }
  
    getCollection(place) {
      return this.collections.find(collection => collection.place.toLowerCase() === place.toLowerCase());
    }
  }
  
  module.exports = new Data();
  