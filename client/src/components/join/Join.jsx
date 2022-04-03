import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { isCurrentRoomActive } from '../../api/mannager.js'
import { useNavigate } from 'react-router-dom'
import './Join.css'

function App() {
  const [validity, setValidity] = useState(true);
  const [btnDisabled, setBtnDisable] = useState(false);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setBtnDisable(true)
    if (await isCurrentRoomActive(roomId)) {
      navigate('/stream/'+roomId);
    } else {
      setValidity(false)
    }
  }

  function handleInput(event) {
    setRoomId(event.target.value)
    if (btnDisabled) {
      setBtnDisable(false)
      setValidity(true)
    }
  }

  return (
    <div className="App">
      <Form className='form' onSubmit={handleSubmit}>
        <h1> Share On </h1>
        <Form.Control placeholder='Enter the code here' className='text-center' isInvalid={ !validity } onInput={ handleInput } /> {' '}
          <Button variant='dark' className='form-btn' type='submit' disabled={ btnDisabled } > Join a Stream </Button> {' '} <br />
          <Button variant='secondary' className='form-btn' type='submit' disabled={ btnDisabled } > Make a Stream </Button> {' '}
      </Form>
    </div>
  )
}

export default App
