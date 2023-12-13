require('dotenv').config();
const openai = require('openai');
const Data = require('../data');

// Function to simulate the chatbot logic
async function simulateChatbot() {
  try {
    const userQuery = "I want to go to Colombo in June with my family, where can I stay visit and what are the events happening in June?";

    console.log('User Query:', userQuery);

    // Initialize OpenAI API with your API key
    const openaiInstance = new openai.OpenAIAPI({ key: process.env.OPENAI_API_KEY });

    // Use OpenAI for natural language understanding
    const openaiResponse = await openaiInstance.Completions.create({
      engine: 'text-davinci-002',
      prompt: userQuery,
      max_tokens: 150,
    });

    console.log('OpenAI Response:', openaiResponse);

    // Extracted entities from OpenAI
    const entities = openaiResponse.choices[0].text.trim().split(',');
    console.log('Extracted Entities:', entities);

    // Query Data for relevant travel details based on extracted entities
    const placeData = Data.getCollection(entities[0]);
    console.log('Place Data:', placeData);

    // Construct the response
    let botResponse = `From the database: `;
    if (placeData) {
      botResponse += `${placeData.description}\n\n`;
      botResponse += `Recommended places: ${placeData.places.join(', ')}\n`;
      botResponse += `Upcoming events: ${placeData.events.join(', ')}\n`;
      botResponse += `Available dates: ${placeData.dates.join(', ')}`;
    } else {
      botResponse += 'No information available.';
    }

    console.log('Bot Response:', botResponse);
    return { botResponse, placeData };
  } catch (error) {
    console.error('Error in chatbot logic:', error);
    return { error: 'Internal error' };
  }
}

simulateChatbot();
