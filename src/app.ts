import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());


const getAController = (req: Request, res: Response) => {
   res.send('Hello, Course Management (^_^)');
};
app.get('/', getAController);

export default app;
