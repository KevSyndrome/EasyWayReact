import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Panel from './Dashboard/Panel';
import PanelLogIn from './LogIn/PanelLogIn';
import PanelRegister from './Register/PanelRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel />} />
        <Route path="/login" element={<PanelLogIn />} />
        <Route path="/register" element={<PanelRegister />} />
      </Routes>
    </Router>
  );
}

export default App;