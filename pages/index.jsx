import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Home.module.css'
import { db } from '../util/database/firesbase'
import { createNewId } from '../util/randId'
import { auth } from '../util/database/firesbase'


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
      router.push('/r/'+roomId)
    } else {
      setInvalid(true);
    }
  }

  const isRoomActive = async (id) => {
    return true;
  }

  const handleCreate = async () => {
    const user = auth.currentUser
    if (!user) return;

    const webId = createNewId({len: 6})
    const ref = await doc(db, 'rooms', webId)
    await setDoc(ref, {
      createdAt: serverTimestamp(),
      createdBy: user?.uid,
      isActive: true
    })
    router.push('/r/'+webId)
  }
  
  return <> 
    <div className={styles.main}>
      <h2 className='text-center'>Join a Room</h2>
      <Form className={styles.container} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control className='text-center' placeholder='Room ID?' isInvalid={isInvalid} onInput={handleInput} />
          <Button variant='primary' type='submit' className={styles.btn} disabled={buttonsInActive}> Join </Button> {' '} <br />
          <Button variant='secondary' className={styles.btn} disabled={!auth.currentUser} onClick={handleCreate}> Host </Button> {' '}
        </Form.Group> 
      </Form>
    </div>
  </> 
}
