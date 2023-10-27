import { Router } from 'express'
import { createFuncionario, getAllFuncionarios, getFuncionarioById, updateFuncionarioById } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)
router.get('/', getAllFuncionarios)
router.get('/:id', getFuncionarioById)
router.patch('/:id', updateFuncionarioById)

export default router