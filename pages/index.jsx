import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Router from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return <div className={styles.main}>
    <Form>
      <h1>Join a Room</h1>
      <Form.Group>
        <Form.Control className='text-center' placeholder='Room ID?'></Form.Control>
        <Button variant='primary' type='submit' > Join </Button> {' '} <br />
        <Button variant='secondary' > Make a new Room </Button> {' '}
      </Form.Group>
    </Form>
  </div>
}
