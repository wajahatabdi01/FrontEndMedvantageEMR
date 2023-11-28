import { BrowserRouter } from 'react-router-dom';
import ApiRoutes from './Routes/ApiRoutes';
import "./assets/css/App.css";


function App() {
  

  return (
    <BrowserRouter>
      <ApiRoutes />
    </BrowserRouter>
  );

}

export default App;
