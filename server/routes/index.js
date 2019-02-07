import express from 'express';
import Party from '../controllers/party';
import Office from '../controllers/office';
import Auth from '../controllers/auth';
import User from '../controllers/user';
import Verification from '../helpers/verifyToken';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Politico Application',
  });
});

router.post('/auth/signup', Auth.createUser);
router.post('/auth/login', Auth.loginUser);
router.post('/auth/reset', Auth.resetPassword);


router.post('/parties', Verification.isAdmin, Party.createParty);
router.get('/parties', Party.getAllParties);
router.get('/parties/:id', Party.getSpecificParty);
router.patch('/parties/:id', Verification.isAdmin, Party.editSpecificParty);
router.delete('/parties/:id', Verification.isAdmin, Party.deleteParty);


router.post('/offices', Verification.isAdmin, Office.createOffice);
router.get('/offices', Office.getAllOffices);
router.get('/offices/:id', Verification.isLoggedIn, Office.getSpecificOffice);


router.post('/office/:uId/register', Verification.isAdmin, User.registerCandidate);
router.get('/office/:id/result', User.officeResults);
router.post('/vote', Verification.isLoggedIn, User.voteCandidate);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
