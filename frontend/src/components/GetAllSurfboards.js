import React, { useState , useEffect} from 'react';
import axios from 'axios';



const GetAllSurfboardsComponent = () => {
    const [surfboards, setSurfboards] = useState([]);
    const [type, setType] = useState('');
   //setting up to work with backend flask
   const fetchSurfboards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getAllBoards');
      console.log("Response: " , response)
      setSurfboards(response.data || []); // Fallback to an empty array if Items is undefined

    } catch (error) {
      console.error("Error fetching surfboards:", error);
      setSurfboards([]); // Ensure surfboards is set to an empty array on error

    }
  };

   //using the secondary index to get by type
    const fetchSurfboardsByType = async () => {
      if (!type) {
          alert('Please select a type first.');
          return;
      }
      try {
          const response = await axios.get(`http://localhost:5000//getBoardsByType/${type}`);
          console.log("Response by Type: ", response);
          setSurfboards(response.data || []);
      } catch (error) {
          console.error(`Error fetching surfboards of type ${type}:`, error);
          setSurfboards([]);
      }
  };
  
  const deleteSurfboard = async (surfboardId, price) => {
  try {
    await axios.delete(`http://localhost:5000/deleteById/${surfboardId}?price=${price}`);
    setSurfboards(surfboards.filter(surfboard => surfboard.surfboardId !== surfboardId));
  } catch (error) {
    console.error("Failed to delete surfboard:", error);
  }
};

  
  return (
    <div>
      <div>
      <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter surfboard type"
                style={{ marginRight: '10px' }}
            />
            <button onClick={fetchSurfboards}>Get All Surfboards</button>
            <button onClick={fetchSurfboardsByType} style={{ marginLeft: '10px' }}>Get Surfboards By Type</button>
      </div>
     
      
      {surfboards.length > 0 ? (
        <div>
          {surfboards.map((surfboard, index) => (
            <div key={index} style={{ margin: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <h2>{surfboard.brand} - {surfboard.model}</h2>
              <h3>ID :{surfboard.surfboardId}</h3>
              <p>Type: {surfboard.type}</p>
              <p>Volume: {surfboard.volumeLiters} liters</p>
              <p>Price: ${surfboard.price}</p>
              <p>Colors: {surfboard.availableColors.join(", ")}</p>
              <p>Description: {surfboard.description}</p>
              {surfboard.images && surfboard.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image.url} alt={`Surfboard ${index} - ${image.position}`} style={{ width: '100px', marginRight: '10px' }} />
              ))}
              <button onClick={() => deleteSurfboard(surfboard.surfboardId, surfboard.price)} style={{ marginTop: '10px' }}>
            Delete Surfboard
            </button>
            </div>
            
          ))}
            
          

        </div>
      ) : (
        <p>No surfboards found.</p>
      )}

    </div>
  );
};

 

export default GetAllSurfboardsComponent