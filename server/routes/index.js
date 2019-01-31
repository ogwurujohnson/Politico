import express from 'express';
import Party from '../controllers/party';
import Office from '../controllers/office';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to Politico');
});


router.post('/parties', Party.createParty);
router.get('/parties', Party.getAllParties);
router.get('/parties/:id', Party.getSingleParty);
router.patch('/parties/:id/:partyName', Party.editParty);
router.delete('/parties/:id', Party.deleteParty);


router.post('/offices', Office.createOffice);
router.get('/offices', Office.getAllOffices);
export default router;
