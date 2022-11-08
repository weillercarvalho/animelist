import express from 'express';
import { Request, Response } from 'express';

const server = express();
server.use(express.json())

server.get(`/status`, (req: Request,res: Response) => {
    return res.send(`Ok`)
})

server.listen(4000, () => {
    console.log(`Listening on the 4000 port`)
});