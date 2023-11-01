import { Router } from 'express'
import { createFuncionario, deleteFuncionarioById, endFuncionarioContractById, fireFuncionarioById, getAllFuncionarios, getFuncionarioById, updateFuncionarioById } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)
router.get('/', getAllFuncionarios)
router.get('/:id', getFuncionarioById)
router.patch('/:id', updateFuncionarioById)
router.patch('/end-contract/:id', endFuncionarioContractById)
router.patch('/fire/:id', fireFuncionarioById)
router.delete('/:id', deleteFuncionarioById)

export default router