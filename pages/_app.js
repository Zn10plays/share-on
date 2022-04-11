import '../styles/globals.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import { auth } from '../util/database/firesbase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState(null);

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

  return <>
    <Navbar bg="dark" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href="/"> Share On </Navbar.Brand>
        <div>
          { !user && <> <Button variant="outline-primary" onClick={handleLogIn}> login </Button> </>}
          { user && <> 
            <Image src={user.photoURL} width='38' rounded/> {' '}
            <Button variant="outline-danger" onClick={handleLogOut}> { user?.displayName } </Button> 
          </> }
        </div>
      </Container>
    </Navbar>

    <Component {...pageProps} /> 
  </>
}

export default MyApp
