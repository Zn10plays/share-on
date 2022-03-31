import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import Join from './components/join/Join.jsx'
import Stream from './components/stream/Stream';

const rootElm = document.getElementById('root');

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Join />} />
      <Route path='/stream/:streamId' element={ <Stream/> } />
    </Routes>
  </BrowserRouter>,
  rootElm
)
