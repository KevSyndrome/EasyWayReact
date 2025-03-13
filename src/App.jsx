import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Panel from './Dashboard/Panel';
import PanelLogIn from './LogIn/PanelLogIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/login" element={<PanelLogIn />} />
      </Routes>
    </Router>
  );
}

export default App;