# Instagram APK Scraper

This project retrieves, processes, and displays the list of Instagram APKs available at [APK Mirror](https://www.apkmirror.com/uploads/?appcategory=instagram-instagram) through an API.

## Manual Setup

1. **Run Data Sender:**

    ```bash
    npm install
    cd instagram-scraper
    node data_sender.js
    ```

2. **Run Server:**

    ```bash
    npm install
    cd server
    node server.js
    ```

3. **Start APK Mirror:**

    ```bash
    npm install
    cd apk-mirror
    npm start
    ```

Visit http://localhost:3000 to view the page.

## Docker Setup

To run with Docker, execute the following command in the project folder:

```bash
docker-compose up --build

Visit [http://localhost:3000](http://localhost:3000) to view the page.
