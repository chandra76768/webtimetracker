// App.js
import React, { useEffect } from 'react';
import axios from 'axios';

function InjectData() {
  useEffect(() => {
    // Fetch data from local storage
    const data = JSON.parse(localStorage.getItem('today_domains'));
    console.log(data);

    // Send data to backend server
    axios.post('/api/data', data)
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      {/* Your frontend application components */}
    </div>
  );
}

InjectData();

export default InjectData;
