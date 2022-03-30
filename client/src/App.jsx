import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isCurrentRoomActive } from './api/mannager'
import { Link } from 'react-router-dom'
import './App.css'

function App() {
  const [validity, setValidity] = useState(true);
  const [shouldRed, setRed] = useState(false);
  const [lobbyId, setLobbyId] = useState('');

  function join(e) {
    if (!shouldRed) {
      e.preventDefault();
      setValidity(false)
    }
  }

  function handleChange(e) {
    setLobbyId(e.target.value)
    if (isCurrentRoomActive(lobbyId)) {
      setRed(true);
    } else {
      setRed(false)
    }
  }

  return (
    <div className="App">
      <Form className='form'>
        <Form.Control placeholder='Enter the code here' isInvalid={ !validity } onInput={handleChange} /> {' '}
        <Link onClick={join} to={"/room/" + lobbyId} >
          <Button variant='dark' className='form-btn'> Join a Stream </Button> {' '} <br />
        </Link>
        <Button variant='secondary' className='form-btn'> Make a Stream </Button> {' '}
      </Form>
    </div>
  )
}



export default App
