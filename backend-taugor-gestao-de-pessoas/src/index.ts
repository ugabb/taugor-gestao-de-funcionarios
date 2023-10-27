import express, { Request, Response } from "express";
import admin from 'firebase-admin'
import { Funcionario } from "./models/funcionario";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// GET -> /api/funcionario
app.get('/api/funcionario', (req: Request, res: Response) => {
    console.log("GET")
});

// GET by ID -> /api/funcionario/:id
app.get('/api/funcionario', async (req: Request, res: Response) => {

});

// POST -> /api/funcionario
app.post('/api/funcionario', async (req: Request, res: Response) => {
    try {
        const { name, phone } = req.body;

        // create a validation for the schema
        const funcionarioJson = {
            name,
            phone,

        }
        const response = await db.collection("funcionario").add(funcionarioJson)

        return res.status(201).json({ message: "Funcionario criado com sucesso", response })
    } catch (error) {
        console.log('Error adding document: ', error)
        return res.status(500).json({ error: "Falha ao criar o funcionário" })
    }
})

// PUT -> /api/funcionario/:id
// DELETE -> /api/funcionario/:id

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`);
});
