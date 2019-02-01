import express from 'express';
import Party from '../controllers/party';
import Office from '../controllers/office';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Politico Application',
  });
});


router.post('/parties', Party.createParty);
router.get('/parties', Party.getAllParties);
router.get('/parties/:id', Party.getSingleParty);
router.patch('/parties/:id/:identifier', Party.editParty);
router.delete('/parties/:id', Party.deleteParty);


router.post('/offices', Office.createOffice);
router.get('/offices', Office.getAllOffices);
router.get('/offices/:id', Office.getSingleOffice);
router.patch('/offices/:id/:identifier', Office.editOffice);
router.delete('/offices/:id', Office.deleteOffice);


router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
