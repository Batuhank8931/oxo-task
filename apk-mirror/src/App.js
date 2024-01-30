// App.js

import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import './styles.css'; // Import the CSS file

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Oxo Technology</h1>
      </header>

      <main>
        <h1 className="table-heading">Batch Listing of Versions</h1>

        <table className="data-table">
          <thead>
            <tr>
              <th>Version ID</th>
              <th style={{ textAlign: 'center' }}>Release Date</th>
              <th style={{ textAlign: 'center' }}>Total Variant Number</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item['1 child'][0]}</td>
                <td>{item['1 child'][2]}</td>
                <td>{Object.keys(item).length}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="table-heading">Detail listing</h1>
        <DataTable data={data} />
      </main>

      <footer>
        <p>&copy; 2024 Random Website. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default App;
