import express from 'express';
import Party from '../controllers/party';
import Office from '../controllers/office';
import Auth from '../controllers/auth';
import User from '../controllers/user';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Politico Application',
  });
});

router.post('/auth/signup', Auth.createUser);
router.post('/auth/login', Auth.loginUser);


router.post('/parties', Party.createParty);
router.get('/parties', Party.getAllParties);
router.get('/parties/:id', Party.getSpecificParty);
router.patch('/parties/:id', Party.editSpecificParty);
router.delete('/parties/:id', Party.deleteParty);


router.post('/offices', Office.createOffice);
router.get('/offices', Office.getAllOffices);
router.get('/offices/:id', Office.getSpecificOffice);


router.post('/office/:uId/register', User.registerCandidate);
router.get('/office/:id/result', User.officeResults);
router.post('/vote', User.voteCandidate);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
