
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import './index.css'
import { Home } from './pages/Home';
import { Providers } from '@/components/providers';
const Checkout = React.lazy(() => import('./pages/Checkout'));






function App() {
  return (
    <Providers >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<React.Suspense fallback={<div>Loading...</div>}><Checkout /></React.Suspense>} />
      </Routes>
    </Providers>
  )
}

export default App;
