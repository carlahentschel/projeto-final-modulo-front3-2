import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Notes from '../pages/Notes';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routers: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
