import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/Room.module.css'
import { db } from "../util/database/firesbase";

function ClipBoard({docs, id}) {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();

  const handleEdit = () => {
    setEdit(!edit);
  }

  const handleSave = () => {
    setEdit(!edit);
    updateDoc(doc(db, 'rooms', id, 'posts', docs.id), {
      value: inputRef.current.innerText,
    })
  }

  const handleDelete = () => {
    deleteDoc(doc(db, 'rooms', id, 'posts', docs.id));
  }

  return <div className='Post'>
    <Modal.Dialog>
      <Modal.Body>
        <p className={styles.input + " " +(edit ? styles.border : '') } contentEditable={edit} ref={inputRef}> { docs.data().value } </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}> {'🗑️'} </Button>
        { !edit && <Button variant={"primary"} className={styles.btn} onClick={handleEdit}> {'✎'} </Button> }
        { edit && <Button variant={"success"} className={styles.btn} onClick={handleSave}> {'💾'} </Button> }
      </Modal.Footer>
    </Modal.Dialog>
  </div>
}

export default ClipBoard;