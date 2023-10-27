import express, { Request, Response } from "express";
import admin from 'firebase-admin'

const PORT = process.env.PORT || 8080;

const app = express();

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.get('/transactions', (req: Request, res: Response) => {
    console.log("GET")
});

app.post('/api/funcionario', (req: Request, res: Response) => {
    const body = req.body

    return res.json(body)
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`);
});
