import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Home.module.css'


export default function Home() {
  
  const [buttonsInActive, setButtonsInActive] = useState(false);
  const [isInvalid, setInvalid] = useState(false);
  const [roomId, setRoomId] = useState('');

  const router = useRouter();

  const handleInput = (event) => {
    setRoomId(event.target.value)
    if (isInvalid) {
      setInvalid(false)
      setButtonsInActive(false)
    }
  }

  const handleSubmit = async (event) =>  {
    event.preventDefault();
    setButtonsInActive(true)
    
    if (await isRoomActive(roomId)) {
      router.push('/room/'+roomId)
    } else {
      setInvalid(true);
    }
  }

  const isRoomActive = async (id) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }

  const handleCreate = async () => {

  }
  
  return <> 
    <div className={styles.main}>
    <h2 className='text-center'>Join a Room</h2>
    <Form className={styles.container} onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control className='text-center' placeholder='Room ID?' isInvalid={isInvalid} onInput={handleInput}></Form.Control>
        <Button variant='primary' type='submit' className={styles.btn} disabled={buttonsInActive}> Join </Button> {' '} <br />
        <Button variant='secondary' className={styles.btn} onClick={handleCreate}> Host </Button> {' '}
      </Form.Group> 
    </Form>
  </div>
  </> 
}
