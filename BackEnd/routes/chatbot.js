// routes/chatbot.js
const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  try {
    const userQuery = req.body.message;
    console.log('User Query:', userQuery);

    const openaiResponse = spawn('python', ['-u', __dirname + '/myenv/app.py', userQuery]);

    let responseData = '';

    openaiResponse.stdout.on('data', (data) => {
      const trimmedData = String(data).trim(); // Convert data to string and then trim
  console.log(`stdout: ${trimmedData}`);
  responseData += trimmedData;
    });

    openaiResponse.on('close', (code) => {
      console.log(`Child process exited with code ${code}`);
      res.send(responseData);
    });

    openaiResponse.on('error', (err) => {
      console.error(`Error in child process: ${err}`);
      res.status(500).json({ error: 'Internal server error' });
    });
  } catch (error) {
    console.error('Error in chatbot route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
