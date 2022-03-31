import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Stream.css';

function Stream() {
  const urlParams = useParams()
  return <div className="App">
    <h1>hello world</h1>
  </div>
}

export default Stream;