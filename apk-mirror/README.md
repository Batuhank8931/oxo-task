# Oxo Technology Batch Listing App

This React application fetches data from a RESTful API provided by a Node.js server connected to a MongoDB database. The app displays batch listings of versions along with detailed variant information. Users can edit and delete variants, and the changes are reflected in real-time.

## Features

- **React Frontend:** The application is built using React, providing a dynamic and responsive user interface.

- **API Integration:** Utilizes the provided API endpoint (`http://localhost:5000/api/data`) to fetch data from the MongoDB database.

- **Batch Listing:** Displays batch listing information, including Version ID, Release Date, and Total Variant Number.

- **Detailed Variant Listing:** Presents a detailed variant listing with Variant ID, Architecture, Min. Android Version, DPI, and actions for editing or deleting variants.

- **Modal Editing:** Enables users to edit variant details using a modal window, providing a user-friendly editing experience.

## Prerequisites

Before running the React application, ensure that you have the following dependencies installed:

- Node.js
- npm (Node Package Manager)
- Running Node.js server (provided in your backend code)
- MongoDB Atlas account (or a local MongoDB server)


## Navigate to the project directory:

cd apk-mirror

## Install the required npm packages:

npm install

## Usage
Run the script using the following command:

npm start
