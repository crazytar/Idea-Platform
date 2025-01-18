
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './index.css'
import { Home } from './pages/Home';
import { Checkout } from './pages/Checkout';
import { Providers } from './components/providers';






function App() {
  return (
    <Providers >
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/checkout" element={<React.Suspense fallback={<div>Loading...</div>}><Checkout /></React.Suspense>} /> */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Providers>
  )
}

export default App;
