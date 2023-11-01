import { Router } from 'express'
import { createFuncionario, deleteFuncionarioById, endFuncionarioContractById, getAllFuncionarios, getFuncionarioById, updateFuncionarioById } from '../controllers/FuncionarioController';

const router = Router();

router.post('/', createFuncionario)
router.get('/', getAllFuncionarios)
router.get('/:id', getFuncionarioById)
router.patch('/:id', updateFuncionarioById)
router.patch('/end-contract/:id', endFuncionarioContractById)
router.delete('/:id', deleteFuncionarioById)

export default router