import { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { isCurrentRoomActive } from '../../api/mannager'
import Note from '../note/Note.jsx'
import './Stream.css';

function Stream() {
  const urlParams = useParams();
  const [item, useIteam] = useState(['']);
  const navigate = useNavigate();

  // return to home if id does not exist
  useEffect(async () => {
    if (!await isCurrentRoomActive(urlParams.streamId)) {
      navigate('/')
    }
  }, [])

  function handleAdd() {
    const newList = [...item, <Note />];
    console.log(newList)
    useIteam(newList);
  }

  return <div className="App">
    <div className="stream">
      <Nav variant="pills" className='options'>
        <Nav.Item>
          <Button  onClick={handleAdd}> Add A Note </Button>
        </Nav.Item>
      </Nav>

      {/* Loads all notes, All state from is will
      be managed by the children component */}
      { item && item.map( elem => elem) }
    </div>
  </div>
}



export default Stream;