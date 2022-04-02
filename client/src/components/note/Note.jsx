import { useState } from 'react';
import Button from 'react-bootstrap/Button';

function Note(ioConnection) {

    const [noteId, netNoteId] = useState('')

    function handleDel(event) {
      
    }

  return <div className="note">
    <div className="heading item-right" >
        <Button varient="primary"> </Button>
        <Button varient="danger"> X </Button>
    </div>
  </div>
}

export default Note;