import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';


//import dotenv config
dotenv.config();

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set router instance
app.use(cors());
app

app.length('/', (req, res) => {
  return res.status(200).send({'message': 'Yay, server setup complete'});
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});

export default app;
exports.server = server;