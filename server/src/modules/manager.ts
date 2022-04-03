import { Router, json } from 'express'
import { checkLife } from './database/database.js';

const router = Router();
router.use(json())

router.post('/rooms', async (req, res) => {
  if (await checkLife(req.body.roomId)) {
    res.send({valid: true});
  } else {
    res.send({valid: false});
  }
})

router.get('/rooms', async (req, res) => {
  res.status(500).send('work in progress');
})

export default router