import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { auth } from '../util/database/firesbase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Image from 'react-bootstrap/Image'
import styles from '../styles/Home.module.css'


export default function Home() {
  
  const [buttonsInActive, setButtonsInActive] = useState(false);
  const [user, setUser] = useState(null);
  const [isInvalid, setInvalid] = useState(false);
  const [roomId, setRoomId] = useState('');

  const router = useRouter();


  const handleLogIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then(({user}) => {
        console.log(user);
        setUser(user)
      })
    } catch (e) {
      console.log(e);
    }
  }

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null)
    })
  }

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
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href="/"> Share On </Navbar.Brand>
        <div>
           { !user && <Button variant="outline-primary" onClick={handleLogIn}> login </Button> }
           { user && <Image src={user.photoURL} width='38' rounded/>} {' '}
           { user && <Button variant="outline-danger" onClick={handleLogOut}> { user?.displayName } </Button> }
        </div>
      </Container>
    </Navbar>

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
