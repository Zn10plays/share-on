import axios from 'axios'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function isCurrentRoomActive(id) {
  return new Promise(resolve => {
    axios.post('/api/rooms', {
      roomId: id
    })
    .then(res => {
      resolve(res.data.valid);
    })
  })
}

export { isCurrentRoomActive };