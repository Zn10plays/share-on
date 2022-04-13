import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Room.module.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { db } from '../../util/database/firesbase';
import { getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function Room(user) {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const q = query(collection(db, 'vents'), where('webId', '==', id))
    getDocs(q)
    .then(snap => {
      onSnapshot(collection(db, 'vents/'+snap.docs[0].id+'/room'), (snap) => {
        console.log(snap.docs.map(e => e.data()))
      })
    })
    
  })

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
    
      <Container className={styles.list}>
        
      </Container>
    </div>
  </div>
}

export default Room;