import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Note(ioConnection) {

    const [noteId, netNoteId] = useState('')

    function handleDel(event) {
      
    }

  return <div className="note">
    <div className="heading item-right" >
        <Button variant="primary"> </Button>
        <Button variant="danger"> X </Button>
    </div>
  </div>
}

export default Note;