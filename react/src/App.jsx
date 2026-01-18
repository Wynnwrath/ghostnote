// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateNote from './components/CreateNote';
import ReadNote from './components/ReadNote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateNote />} />
        <Route path="/read/:id" element={<ReadNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;