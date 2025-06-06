import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
