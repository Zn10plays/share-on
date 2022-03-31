import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isCurrentRoomActive } from './api/mannager'
import { useNavigate } from 'react-router-dom'
import './Join.css'

function App() {
  const [validity, setValidity] = useState(true);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (await isCurrentRoomActive(roomId)) {

    } else {
      navigate('/'+roomId);
    }
  }

  return (
    <div className="App">
      <Form className='form' onSubmit={handleSubmit}>
        <h1> Share On </h1>
        <Form.Control placeholder='Enter the code here' isInvalid={ !validity } onInput={(event) => setRoomId(event.target.value)} /> {' '}
          <Button variant='dark' className='form-btn' type='submit'> Join a Stream </Button> {' '} <br />
          <Button variant='secondary' className='form-btn' type='submit'> Make a Stream </Button> {' '}
      </Form>
    </div>
  )
}



export default App
