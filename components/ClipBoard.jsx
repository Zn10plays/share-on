// used by Room
// current path /r/*

import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styles from '../styles/Room.module.css';

export default function ClipBoard({data}) {

  const [edit, setEdit] = useState(false);

  const handleEditAndSave = async () => {
    setEdit(!edit);
  }

  const handleInput = (event) => {
    setText(event.target.value)
  }

  return <div className='Post'>
    <Modal.Dialog>
      <Modal.Body>
        <p className={edit ? styles.border : undefined} contentEditable={edit} onInput={handleInput}> {data} </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger">Close</Button>
        <Button variant={edit ? "success" : "primary"} onClick={handleEditAndSave}> {edit ? 'Save' : 'Edit'} </Button>
      </Modal.Footer>
    </Modal.Dialog>
  </div>
}
