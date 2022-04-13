import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../styles/Home.module.css'
import { db } from '../util/database/firesbase'
import { createNewId } from '../util/randId'


export default function Home(user) {
  
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
    const ref = await collection(db, 'vents')
    const doc = await getDocs(query(ref, where('webId', '==', id)))
    return doc.docs.length > 0;
  }

  const handleCreate = async () => {
    if (!user) return;
    const webId = createNewId({len: 6})
    const ref = await collection(db, 'vents')
    await addDoc(ref, {
      createdAt: new serverTimestamp(),
      createdBy: user?.uid,
      webId: webId
    })
    router.push('/room/'+webId)
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
