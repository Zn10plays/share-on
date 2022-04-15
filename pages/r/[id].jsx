import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Room.module.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { db, auth } from '../../util/database/firesbase';
import { 
  getDocs, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'

function Room() {
  const router = useRouter();
  const id = router.query?.id || router.asPath.split('/')[2];
  const [collRef, setcollRef] = useState(null)
  const [posts, setPosts] = useState(["Mb bro I am currently loading"])
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (id === '[id]') return;

    let PostElm = [];
    getDocs(query(collection(db, 'vents'), where('webId', '==', id)))
    .then(snap => {
      let collectionRef;
      if (collRef) {
        collectionRef = collRef
      } else {
        collectionRef = collection(db, 'vents', snap.docs[0].id, 'room');
        setcollRef(collectionRef);
      }

      const unsubscribe = onSnapshot(collectionRef, (snap) => {
        PostElm = snap.docs.map(doc => {
          return <ClipBoard _id={doc.id} data={doc.data()}/>
        })
        setPosts(PostElm);  
      })

      auth.onAuthStateChanged(user => {
        setUser(user);
        if (!user) {
          unsubscribe()
        }
      })
    }).catch((e) => {
      console.warn(e);
      router.push('/')
    })
  }, [id])

  const handleAdd = async () => {
    addDoc(collRef, {
      data: 'click edit to edit this.',
      createdBy: user.uid,
      createdAt: serverTimestamp(),
      type: 'plaintext'
    })
  }

  return <div className={styles.main}>
    <div className={styles.box}>
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Container fluid>
          <Navbar.Brand > Room ID: { id } </Navbar.Brand>
          <Button variant="primary" onClick={handleAdd} disabled={!(user?.uid)}> Add Note </Button>
        </Container>
      </Navbar>
    
      <div className={styles.list}>
        { posts }
      </div>
    </div>
  </div>
}

function ClipBoard({data, _id}) {
  const [edit, setEdit] = useState(false);
  const [plainText, setText] = useState(data.data)

  const handleEditAndSave = () => {
    setEdit(!edit);
  }

  return <div className='Post'>
    <Modal.Dialog>
      <Modal.Body>
        <p className={edit ? styles.border : undefined} contentEditable={edit}> {plainText} </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger">Close</Button>
        <Button variant={edit ? "success" : "primary"} onClick={handleEditAndSave}> {edit ? 'Save' : 'Edit'} </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
}

export default Room;