require('dotenv').config();

const express = require('express');
// ... rest of your code

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MongoDB Connection and Server Start
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contactFormDB');
        console.log("Connected to MongoDB");

        // Define Mongoose Schema and Model
        const formSchema = new mongoose.Schema({
            name: String,
            email: String,
            message: String
        });

        const Form = mongoose.model('Form', formSchema);
        app.post('/submit-form', async (req, res) => {
            console.log(req.body); // Check what data is received
            // Rest of your logic
        });
        // API Route to Handle Form Submission
        app.post('/submit-form', [
            body('name').notEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Email is invalid'),
            body('message').notEmpty().withMessage('Message is required')
        ], async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, email, message } = req.body;

            try {
                const newForm = new Form({ name, email, message });
                await newForm.save();
                res.status(200).json({ message: "Form submitted successfully!" });
            } catch (error) {
                console.error("Error saving form:", error);
                res.status(500).json({ error: "There was an error submitting the form." });
            }
        });

        // Start the Server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

startServer();

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("404: Not Found");
});