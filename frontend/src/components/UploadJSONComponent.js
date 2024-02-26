// UploadJSONComponent.js
// UploadJSONComponent.js
import React, { useState , useEffect} from 'react';
import axios from 'axios';



const UploadJSONComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
   //setting up to work with backend flask
  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('file', file);
    });
      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div>
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={uploadFiles}>Upload</button>
  
        {/* <div>
        <p>{message}</p>
        </div> */}
      </div>
      
    );
  };
 




export default UploadJSONComponent;