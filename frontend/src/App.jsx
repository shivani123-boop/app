import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import EventDetails from './Components/EventDetails';
import EventManagementApp from './Components/EventManagementApp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/event" />} />
          
          <Route path="/event" element={<EventManagementApp />} />
          
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
