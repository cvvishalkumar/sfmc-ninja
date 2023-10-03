const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ZOOM_WEBHOOK_SECRET = 'abcdefghijklmnop'; // Replace with your Zoom webhook secret

app.use(express.json());

app.post('/webhook', (req, res) => {
    const event = req.body.event;


    const plainToken = req.body.payload.plainToken;

    // Hash the plainToken using HMAC SHA-256
    const encryptedToken = crypto.createHmac('sha256', ZOOM_WEBHOOK_SECRET)
        .update(plainToken)
        .digest('hex');

    // Create the response JSON object
    const response = {
        plainToken,
        encryptedToken
    };

    console.log('Received challenge. Responding with:', response);
    res.status(200).json(response);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});