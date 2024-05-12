const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://miniproject1729:miniproject1729@cluster0.ylskpxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Define schema and model for storing web activity data
const webActivitySchema = new mongoose.Schema({
    name: String,
    usage: Number,
    user: String, 
    date: { type: Date, default: Date.now },
    password:String,
    mobile:String// Added user field
});

const WebActivity = mongoose.model('WebActivity', webActivitySchema);

// Route to handle data update
// Route to handle data update
app.put('/upsert', async (req, res) => {
    try {
        const newDataArray = req.body;

        // Iterate over each data object in the array
        for (const newData of newDataArray) {
            // Convert the current date to UTC format
            const currentDateUTC = new Date().toLocaleString().slice(0,10);
            console.log("crnt date",currentDateUTC)

            // Add the current date in UTC format to the newData object
            newData.date = currentDateUTC;

            // Slice the date string to only consider the first 10 characters (0 to 9 index)
            const slicedDate = newData.date.slice(0, 10);
            console.log("slicdate ",slicedDate)

            // Check if a record with the given name and sliced date already exists
            const existingRecord = await WebActivity.findOne({ name: newData.name, date: slicedDate });

            if (existingRecord) {
                // If the record exists, update it with the new data
                await WebActivity.findOneAndUpdate({ name: newData.name, date: slicedDate }, newData);
            } else {
                // If the record doesn't exist, create a new record with the new data
                const webActivity = new WebActivity(newData);
                await webActivity.save();
            }
        }

        res.status(200).send('Data upserted successfully');
    } catch (error) {
        console.error('Error upserting data:', error);
        res.status(500).send('Internal server error');
    }
});


  

// Route to retrieve all data
app.get('/data', async (req, res) => {
    try {
        const data = await WebActivity.find(); // Added await keyword
        res.status(200).json(data);
        console.log("Data fetched successfully ", data);
    } catch (err) { // Changed error to err
        res.status(500).json("Server error");
        console.log(err); // Changed error to err
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        // Generate JWT token
        const token = jwt.sign({ username }, 'secret_key');
        res.json({ success: true, username, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ username }, 'secret_key');
        res.json({ success: true, username, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


//check the username 

app.get('/checkName/:userName', async (req, res) => {
    try {
        const userName = req.params.userName;
        const existingUser = await WebActivity.findOne({ user: userName });

        if (existingUser) {
            // User name already exists
            res.json({ available: false });
        } else {
            // User name is available
            res.json({ available: true });
        }
    } catch (error) {
        console.error('Error checking username availability:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
