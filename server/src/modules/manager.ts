import { Router, json } from 'express'
import { checkLife } from './database/database.js';

const router = Router();
router.use(json())

router.post('/rooms', async (req, res) => {
  console.log(await checkLife(req.body.roomId))
  res.send('ok')
})

export default router