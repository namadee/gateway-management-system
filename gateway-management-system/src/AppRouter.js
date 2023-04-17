import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyComponent from './components/MyComponent';
import DeviceList from './pages/DeviceList';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MyComponent />} /> {/* Route for the Home component */}
        <Route path="/DeviceList" element={<DeviceList />} /> {/* Route for the DeviceList component */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
