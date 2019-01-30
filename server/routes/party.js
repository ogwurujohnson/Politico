import express from 'express';
import Party from '../controllers/party';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome boy');
});
router.post('/parties', Party.createParty);

export default router;
