import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListPage from './pages/listPage';
import FormPage from './pages/addUpdateMember';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<FormPage />} />
        <Route path="/edit/:id" element={<FormPage isEditMode />} />
      </Routes>
    </Router>
  );
}

export default App;
