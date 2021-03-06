import express from 'express';
import swaggerUi from 'swagger-ui-express';
import Party from '../controllers/party';
import Office from '../controllers/office';
import Auth from '../controllers/auth';
import User from '../controllers/user';
import Verification from '../helpers/verifyToken';
import Validation from '../helpers/validation';
import swaggerDoc from '../../politico.postman_collection-Swagger20.json';

const router = express.Router();

router.use('/api-doc', swaggerUi.serve);
router.get('/api-doc', swaggerUi.setup(swaggerDoc));

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to the Politico Application',
  });
});

router.post('/auth/signup', Validation.userSignupValidation, Auth.createUser);
router.post('/auth/login', Validation.userLoginValidation, Auth.loginUser);
router.post('/auth/reset', Auth.resetPassword);
router.post('/auth/validate', Auth.validateResetToken);


router.post('/parties', Verification.isAdmin, Validation.partyValidation, Party.createParty);
router.get('/parties', Party.getAllParties);
router.get('/parties/:id', Validation.idQueryParameter, Party.getSpecificParty);
router.patch('/parties/:id', Verification.isAdmin, Validation.idQueryParameter, Party.editSpecificParty);
router.delete('/parties/:id', Verification.isAdmin, Validation.idQueryParameter, Party.deleteParty);


router.post('/offices', Verification.isAdmin, Validation.officeValidation, Office.createOffice);
router.get('/offices', Office.getAllOffices);
router.get('/offices/:id/:userType', Validation.idQueryParameter, Office.getSpecificOffice);

router.get('/user/:token', Verification.isLoggedIn, User.singleUser);
router.get('/candidate/:candidateId', Verification.isLoggedIn, User.singleCandidate);
router.get('/user/:id/vote', Verification.isLoggedIn, Validation.idQueryParameter, User.userVotes);
router.post('/office/:uId/declare', Verification.isLoggedIn, Validation.uIdQueryParameter, User.declareInterest);
router.patch('/office/:uId/register', Verification.isAdmin, Validation.uIdQueryParameter, User.registerCandidate);
router.get('/office/:id/result', Validation.idQueryParameter, User.officeResults);
router.post('/vote', Verification.isLoggedIn, User.voteCandidate);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Invalid request, Route does not exist',
  });
});

export default router;
