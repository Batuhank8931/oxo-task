const axios = require('axios');
const cheerio = require('cheerio');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://batuhan:batu1010@cluster0.hqtcdf2.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'Mydb';
const collectionName = 'Mytable';

let client;  // Declare the client variable outside the try block

// Fetch data from the specified URL, parse and insert into MongoDB
async function fetchDataAndInsertToMongoDB(version) {
  try {
    // 1. Fetch data from the URL
    const url = `https://www.apkmirror.com/apk/instagram/instagram-instagram/instagram-instagram-${version}-release/`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // 2. Extract data from the HTM
    const cells = $('.table.topmargin.variants-table .table-cell.rowheight.addseparator.expand.pad.dowrap');

    if (cells.length > 0) {
      const tableData = [];

      cells.each((index, cell) => {
        const cellText = $(cell).text().trim();
        const cellArray = cellText.split('\n').filter(item => item !== '');
        tableData.push(...cellArray);
      });

      // 3. Insert data into MongoDB
      //console.log(tableData);
      const createdDictionary = createFinalDictionary(tableData,version);
      //console.log(createdDictionary);
      //await insertDataToMongoDB(createdDictionary);
      await insertDataToMongoDB(tableData);


    } else {
      console.log('Could not find the required cells on the page.');
    }
  } catch (error) {
    console.error(`Error fetching or inserting data: ${error.message}`);
  }
}

// Delete all documents in MongoDB collection
async function deleteAllData() {
  let deleteClient;  // Declare the deleteClient variable outside the try block
  try {
    // 4. Create a new MongoClient for deletion
    deleteClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    // 5. Delete all documents from the collection
    await deleteClient.connect();

    const deleteDatabase = deleteClient.db(dbName);
    const deleteCollection = deleteDatabase.collection(collectionName);

    // Delete all documents from the collection
    await deleteCollection.deleteMany({});
    
    console.log('All data deleted from MongoDB collection.');
  } catch (error) {
    console.error(`Error deleting data from MongoDB: ${error.message}`);
  } finally {
    // 6. Close the MongoDB connection for deletion
    if (deleteClient) {
      await deleteClient.close();
    }
  }
}

// Connect to MongoDB and insert data
async function insertDataToMongoDB(data) {
  let client;
  try {
    // 7. Connect to MongoDB
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();

    // 8. Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // 9. Insert data into MongoDB
    const result = await collection.insertOne({ data });

    console.log(`Data inserted to MongoDB. Inserted ID: ${result.insertedId}`);
  } catch (error) {
    console.error(`Error inserting data to MongoDB: ${error.message}`);
  } finally {
    // 10. Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}

// Process multiple versions - Delete data and insert new data
async function processVersions(FinalArray) {
  try {
    // 11. Create a new MongoClient for processing versions
    client = new MongoClient(uri, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      }
    });

    // 12. Connect to MongoDB
    await client.connect();

    // 13. Delete all data from MongoDB before processing versions
    await deleteAllData();

    // 14. Insert data into MongoDB for each version in FinalArray
    for (const version of FinalArray) {
      await fetchDataAndInsertToMongoDB(version);
    }
  } catch (error) {
    console.error(`Error processing versions: ${error.message}`);
  } finally {
    // 15. Close the MongoDB connection for processing versions
    if (client) {
      await client.close();
    }
  }
}



// Function to create a dictionary from filtered content
function createDictionary(filteredContent) {
  let mydict = {};
  let subarray = [];
  let y = 0;

  for (let x = 0; x < filteredContent.length; x++) {
    if (filteredContent[x].startsWith("Instagram")) {
      if (y !== 0) {
        mydict[y + " child"] = subarray;
      }
      subarray = [];
      y++;
    }
    // Replace "Instagram " and "." and trim the string
    subarray.push(filteredContent[x].replace("Instagram ", "").replace(/\./g, "-").trim());
  }

  // Add the last child (if any)
  if (subarray.length > 0) {
    mydict[y + " child"] = subarray;
  }

  return mydict;
}


// Function to create a dictionary from filtered content
function createFinalDictionary(arraysample, version) {
  let mydict = {};
  let subarray = [];
  let y = 0;

  version = version.replace(/-/g, ".");

  for (let x = 0; x < arraysample.length; x++) {
    if (arraysample[x] === (version+" ")) {
      if (y !== 0) {
        mydict[y + " child"] = subarray;
      }
      subarray = [];
      y++;
    } else {
      // Assuming you want to add elements to the subarray
      subarray.push(arraysample[x]);
    }
  }

  // Add the last child (if any)
  if (subarray.length > 0) {
    mydict[y + " child"] = subarray;
  }

  return mydict;
}

// Function to remove child entries containing "beta" or "alpha"
function removeBetaAlphaChildren(inputDict) {
  const outputDict = {};

  for (const key in inputDict) {
    const childArray = inputDict[key];

    if (childArray.length > 0) {
      const firstObject = childArray[0];

      if (!firstObject.includes("beta") && !firstObject.includes("alpha")) {
        // Keep the child if the first object doesn't contain "beta" or "alpha"
        outputDict[key] = childArray;
      }
    }
  }

  return outputDict;
}

// Define the URL for scraping
const scrapeUrl = 'https://www.apkmirror.com/uploads/?appcategory=instagram-instagram';

// Fetch data from the specified URL
axios.get(scrapeUrl)
  .then(async response => {
    const $ = cheerio.load(response.data);

    const appManagerWidgetDiv = $('.widget.widget_appmanager_recentpostswidget');

    if (appManagerWidgetDiv.length > 0) {
      const widgetContent = appManagerWidgetDiv.text().trim();
      const cleanContent = widgetContent.replace(/\n+/g, '\n');
      const filteredContent = cleanContent
        .split('\n')
        .filter(line => !line.includes('Latest Instagram Uploads'))
        .filter(line => !line.includes('AdvertisementRemove ads, dark theme, and more with Premium'))
        .filter(line => !line.includes('Page 1 of'))
        .filter(line => !line.includes('APKM.a('));

      if (filteredContent.length > 0) {
        //console.log(`${filteredContent[0]}`);
        for (let i = 0; i < filteredContent.length; i++) {
          if (filteredContent[i].trim() === '') {
            // Remove the element if it's an empty string
            filteredContent.splice(i, 1);
            // Decrement the index to correctly process the next element
            i--;
          }
        }

        const result = createDictionary(filteredContent);
        const resultDict = removeBetaAlphaChildren(result);
        let FinalArray = [];
        
        for (let key in resultDict) {
          if (resultDict.hasOwnProperty(key) && resultDict[key].length > 0) {
            FinalArray.push(resultDict[key][0]);
          }
        }
        //console.log(FinalArray);

        // 16. Insert data into MongoDB for each version in FinalArray
        await processVersions(FinalArray);
      } else {
        console.log('No content found in the "App Manager Widget" div.');
      }
    } else {
      console.log('Could not find the "App Manager Widget" div on the page.');
    }
  })
  .catch(error => {
    console.error(`Error fetching the page: ${error.message}`);
  });
