import { Router } from 'express'
import { createFuncionario, getAllFuncionarios } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)
router.get('/', getAllFuncionarios)

export default router