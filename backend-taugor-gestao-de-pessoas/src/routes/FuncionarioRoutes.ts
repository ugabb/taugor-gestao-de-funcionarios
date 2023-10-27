import { Router } from 'express'
import { createFuncionario, getAllFuncionarios, getFuncionarioById } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)
router.get('/', getAllFuncionarios)
router.get('/:id', getFuncionarioById)

export default router