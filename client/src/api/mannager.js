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

export { isCurrentRoomActive };