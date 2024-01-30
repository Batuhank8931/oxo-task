const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

const app = express();
const port = 5000;

const uri = "mongodb+srv://batuhan:batu1010@cluster0.hqtcdf2.mongodb.net/Mydb?retryWrites=true&w=majority";
const dbName = 'Mydb';
const collectionName = 'Mytable';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// Enable CORS
app.use(cors());

// Function to create a dictionary from filtered content
function createDictionary(filteredContent) {
    let mydict = {};
    let subarray = [];
    let y = 0;

    for (let x = 0; x < filteredContent.length; x++) {
        // Check if the element contains only numbers and dots
        if (/^[0-9.]+ ?$/.test(filteredContent[x])) {
            if (y !== 0) {
                mydict[y + " child"] = subarray;
            }
            subarray = [];
            y++;
        }

        // Add the element to the current subarray
        subarray.push(filteredContent[x]);
    }

    // Add the last child (if any)
    if (subarray.length > 0) {
        mydict[y + " child"] = subarray;
    }

    return mydict;
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Define your MongoDB model/schema here
    const Mytable = mongoose.model(collectionName, new mongoose.Schema({
        // Your model schema fields go here
        // Assuming 'data' is the correct field name, adjust it if needed
        data: Array,
        // ... other fields
    }), collectionName);

    // Define a route to handle GET requests
    app.get('/api/data', async (req, res) => {
        try {
            const documents = await Mytable.find({});
            const extractedArrays = documents.map(document => document.data);
    
            // Log the first extracted array
            //console.log('Extracted Array:', extractedArrays[0]);
    
            // Process and send the data as JSON
            const processedData = extractedArrays.map((dataArray) => createDictionary(dataArray));
            //console.log('Processed Data:', processedData);
    
            res.json(processedData);
        } catch (error) {
            console.error('Error retrieving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
