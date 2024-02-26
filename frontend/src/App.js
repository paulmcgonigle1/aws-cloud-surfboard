import logo from './logo.svg';
import './App.css';
import UploadJSONComponent from './components/UploadJSONComponent';
import GetAllSurfboardsComponent from './components/GetAllSurfboards';
function App() {
  return (
    <div className="App">
      <div ><h1>This is my JSON Cloud CA-1 Application</h1></div>
      <UploadJSONComponent/>
      <hr></hr>
      <div>This is now my get all surfboards </div>
      <GetAllSurfboardsComponent/>
    </div>
  );
}

export default App;
