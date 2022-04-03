import axios from 'axios'

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function isCurrentRoomActive(id) {
  return new Promise(resolve => {
    sleep(1000).then(() => {
      resolve(true);
    });
  })
}

async function checkCurrentKey(id) {
  axios.get('/api')
  .then(res => {
    console.log(res.data);
  })
}

export { isCurrentRoomActive, checkCurrentKey };