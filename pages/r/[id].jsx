import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Room.module.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { db, auth } from '../../util/database/firesbase';
import { getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Room(user) {
  const router = useRouter();
  const id = router.query?.id || router.asPath.split('/')[2];
  const [posts, setPosts] = useState(['l'])

  useEffect(() => {
    if (id === '[id]') return;

    let PostElm = [];
    getDocs(query(collection(db, 'vents'), where('webId', '==', id)))
    .then(snap => {
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
    }).catch((e) => {})
  }, [id])

  const handleAdd = async () => {

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
  console.log(data.id)
  return <div className='Post'>
    <h3>{data.data}</h3>
  </div>
}

export default Room;