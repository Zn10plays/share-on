// current path '/'

import { useState, createRef } from 'react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Home.module.css'
import { db } from '../util/database/firesbase'
import { createNewId } from '../util/randId'
import { auth } from '../util/database/firesbase'
import { 
  doc, 
  setDoc, 
  serverTimestamp, 
  getDoc,
} from 'firebase/firestore'

function Join() {
  const [buttonsInActive, setButtonsInActive] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [isInvalid, setInvalid] = useState(false);
  const inputRef = createRef();
  const router = useRouter();

  const handleSubmit = async (event) =>  {
    event.preventDefault();
    setButtonsInActive(true)
    const roomId = inputRef.current.value;
    console.log(roomId)
    
    if (await isRoomActive(roomId)) {
      router.push('/r/'+roomId)
    } else {
      setInvalid(true);
    }
  }

  const isRoomActive = async (id) => {
    const room = await getDoc(doc(db, 'rooms', id))
    return room.data()?.isActive
  }

  const handleCreate = async () => {
    const user = auth.currentUser
    if (!user) return;

    const webId = createNewId({len: 6})
    const ref = await doc(db, 'room', webId)
    await setDoc(ref, {
      createdAt: serverTimestamp(),
      createdBy: user?.uid,
      isActive: true
    })
    router.push('/r/'+webId)
  }

  auth.onAuthStateChanged((user) => {
    setUser(user)
  })

  return <> 
    <div className={styles.main}>
      <h2 className='text-center'>Join a Room</h2>
      <Form className={styles.container} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control className='text-center' placeholder='Room ID?' isInvalid={isInvalid} ref={inputRef} />
          <Button variant='primary' type='submit' className={styles.btn} disabled={buttonsInActive}> Join </Button> {' '} <br />
          <Button variant='secondary' className={styles.btn} disabled={!user} onClick={handleCreate}> Host </Button> {' '}
        </Form.Group> 
      </Form>
    </div>
  </>
}

export default Join