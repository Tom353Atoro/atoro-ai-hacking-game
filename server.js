require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const VBOUT_API_KEY = process.env.VBOUT_API_KEY; // Securely store your API Key in .env
const LIST_ID = "155000"; // Replace with your VBOUT List ID

app.post('/api/subscribe', async (req, res) => {
    try {
        const { email, first_name, last_name, phone } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const response = await axios.post(
            `https://api.vbout.com/1/emailmarketing/lists/${LIST_ID}/contacts`,
            { email, first_name, last_name, phone },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${VBOUT_API_KEY}`
                }
            }
        );

        res.json({ message: 'Contact added successfully', data: response.data });
    } catch (error) {
        console.error('Error adding contact:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to add contact' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
