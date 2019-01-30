import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import partyRouter from './routes/index';

// import dotenv config
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', partyRouter);

// app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Yay, server setup complete' }));

const port = process.env.PORT || 7700;

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});

export default app;
