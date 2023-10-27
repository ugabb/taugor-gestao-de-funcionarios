import { Router } from 'express'
import { createFuncionario } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)

export default router