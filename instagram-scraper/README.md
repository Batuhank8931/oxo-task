# Instagram APK Scraper and MongoDB Updater

This script is designed to scrape the latest release information for Instagram APKs from the APKMirror website, parse the data, and update a MongoDB collection with the extracted information.

## Features

- **Scraping:** The script uses Axios and Cheerio to fetch and parse the HTML content of the APKMirror Instagram page to obtain the latest release information.

- **Data Processing:** The scraped data is processed and organized into a dictionary format, removing unwanted elements and filtering out versions containing "beta" or "alpha."

- **MongoDB Integration:** The processed data is then inserted into a MongoDB collection, updating the database with the latest Instagram release information.

## Prerequisites

Before running the script, make sure you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account (or a local MongoDB server)

## Navigate to the project directory:

cd instagram-scraper

## Install the required npm packages:

npm install

## Usage
Run the script using the following command:

node data_sender.js

