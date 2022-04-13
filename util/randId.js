const createNewId = ({chars, len}) => {
  let nums = '0123456789'.split(''), letters = 'qwertyuiopasdfghjklkzcvbnm'.split('');
  const id = new Array(len)
  for (let i = 0; i < len ; i++) {
    if (chars) {
      id.push(Math.random() > 0.5 ? nums[Math.floor(Math.random()*10)] : 
      Math.random() > 0.5 ? letters[Math.floor(Math.random() * 26)].toLocaleUpperCase() : 
      letters[Math.floor(Math.random() * 26)])
    } else {
      id.push(nums[Math.floor(Math.random()*10)])
    }    
  }
  return id.join('');
}

export { createNewId }