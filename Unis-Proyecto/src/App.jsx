import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Layout  from './components/Layout.jsx'
import Home from './pages/Home.jsx';  


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="*" element={<h1>error 404😢</h1>} ></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
