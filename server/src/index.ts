import express,{Request,Response} from 'express';

const app = express();
app.get('/', (req: Request, res: Response) =>{
    req.get('Accept')
    res.send('Hello World');
})

app.listen(5000);
