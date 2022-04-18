import { useRouter, } from 'next/router';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Room.module.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { db, auth } from '../../util/database/firesbase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState, memo, Component } from 'react';
import ClipBoard from '../../Component/Clipboard';

function Stream() {
  const router = useRouter();
  
  const [posts, setPosts] = useState(["Mb bro I am currently loading"])
  const [user, setUser] = useState(auth.currentUser);
  const [roomId, setRoomId] = useState(null);
  const [collRef, setCollRef] = useState(null)

  auth.onAuthStateChanged((user) => {
    setUser(user);
  })

  useEffect(() => {
    if (roomId) return;
    const id = router.query.id || router.asPath.split('/')[2]
    if (id !== '[id]') {
      setRoomId(id);
    }
  }, [roomId, router.query.id, router.asPath])

  useEffect(() => {
    if (!roomId) return;

    let ref;
    if (collRef) {
      ref = collRef;
    } else {
      ref = collection(db, 'rooms', roomId, 'posts')
      setCollRef(ref);
    }

    const unsubscribe = onSnapshot(ref, (snap) => {
      setPosts(snap.docs.map(doc => <ClipBoard key={doc.id} docs={doc} id={roomId} />))
    });

    return () => { unsubscribe() };
  }, [roomId])

  const handleAdd = async () => {
    addDoc(collRef, {
      value: 'click edit to edit this.',
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      type: 'plaintext'
    })
  }

  return <>
    <div className={styles.main}>
      <div className={styles.box}>
        <Navbar bg="dark" expand="lg" variant='dark'>
          <Container fluid>
            <Navbar.Brand > Room ID: { roomId } </Navbar.Brand>
            <Button variant="primary" onClick={handleAdd} disabled={!(user?.uid)}> Add Note </Button>
          </Container>
        </Navbar>
      
        <div className={styles.list}>
          { posts }
        </div>
      </div>
    </div>
  </>
}


export default Stream;