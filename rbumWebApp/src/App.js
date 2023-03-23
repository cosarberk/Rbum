import React, { Suspense } from 'react';
import './app.css'

import { Routes, Route } from "react-router-dom";

import MainPage from './pages/MainPage';
import { LoginPage } from './pages/LoginPage';
import MainLayout from './layouts/MainLayouts';


function Error404() {
  return (
    <div>
      <h2>PAGE NOT FOUND</h2>
    </div>
  )
}




function App() {



  return (
    <Suspense fallback={<p>Loading....</p>} >
      <Routes>
        <Route >
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route path="/Berk" element={<MainLayout />}>
     
          <Route path="Panel" element={<MainPage />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>

  );
}

export default App;
