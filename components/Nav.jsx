import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { auth } from '../util/database/firesbase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


function Nav() {

  const [user, setUser] = useState(auth.currentUser);

  const handleLogIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
    } catch (e) {
      console.log(e);
    }
  }

  auth.onAuthStateChanged((user) => {
    if (!user) return;
    setUser(user);
  })

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    })
  }

  return <>
    <Navbar bg="dark" expand="lg" variant='white'>
      <Container fluid>
        <Navbar.Brand href="/"> Share On </Navbar.Brand>
        <div>
          { !user && <> <Button variant="outline-primary" onClick={handleLogIn}> SigIn with Google </Button> </>}
          { user && <>
            <Image src={user.photoURL} width='38' height='38' rounded/> {' '}
            <Button variant="outline-danger" onClick={handleLogOut}> { user?.displayName } </Button>
          </> }
        </div>
      </Container>
    </Navbar>
  </>
}

export default Nav