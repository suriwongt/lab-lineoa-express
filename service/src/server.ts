import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import routes from './routes';

const app: Application = express()

const displayRoutes = require('express-routemap');
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
app.get('/', (req: Request, res: Response) => {
    res.json({
        code: 200,
        vesion: "1.0"
    })
})

app.use('/', routes.router)

app.listen(port, () => {
    console.log(`start :${port}`)
    displayRoutes(app);
})