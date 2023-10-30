import express, { Request, Response } from "express";
import router from './routes/FuncionarioRoutes'
import cors from 'cors'

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/funcionario', router)

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`);
});
