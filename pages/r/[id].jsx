import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Room.module.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { db, auth } from '../../util/database/firesbase';
import { getDocs, collection, query, where, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal'

function Room(user) {
  const router = useRouter();
  const id = router.query?.id || router.asPath.split('/')[2];
  const [conId, setConId] = useState(null)
  const [posts, setPosts] = useState(["Mb bro I am currently loading"])

  useEffect(() => {
    if (id === '[id]') return;

    let PostElm = [];
    getDocs(query(collection(db, 'vents'), where('webId', '==', id)))
    .then(snap => {
      if (!conId) setConId('vents/'+snap.docs[0].id+'/room');

      const unsubscribe = onSnapshot(collection(db, 'vents/'+snap.docs[0].id+'/room'), (snap) => {
        PostElm = snap.docs.map(doc => {
          return <ClipBoard key={doc.id} data={doc.data()}/>
        })
        setPosts(PostElm);  
      })

      auth.onAuthStateChanged(user => {
        if (!user) {
          unsubscribe()
        }
      })
    }).catch((e) => {
      console.warn(e);
    })
  }, [id])

  const handleAdd = async () => {
    addDoc(collection(db, conId), {
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

function ClipBoard({data}) {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  }

  return <div className='Post'>
    <Modal.Dialog>
      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger">Close</Button>
        <Button variant={edit ? "success" : "primary"} onClick={handleEdit} >Edit</Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
}

export default Room;