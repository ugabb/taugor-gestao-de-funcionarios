import express, { Request, Response } from "express";
import router from './routes/FuncionarioRoutes'

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json())

app.use('/api/funcionario',router)

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta: ${PORT}`);
});
