import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import Note from '../note/Note.jsx'
import './Stream.css';

function Stream() {
  const urlParams = useParams();

  function handleAdd() {

  }

  return <div className="App">
    <div className="stream">
    <Nav variant="pills" className='options'>
      <Nav.Item>
        <Button  onClick={handleAdd}> Add A Note </Button>
      </Nav.Item>
    </Nav>
    </div>
  </div>
}



export default Stream;