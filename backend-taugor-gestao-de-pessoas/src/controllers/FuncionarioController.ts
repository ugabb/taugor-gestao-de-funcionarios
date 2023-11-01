import { Request, Response } from "express";
import { create, deleteById, endContractById, getAll, getById, update } from '../services/FuncionarioService'
import { FuncionarioSchema } from "../models/FuncionarioSchema";


// POST -> /api/funcionario
export const createFuncionario = async (req: Request, res: Response) => {
    try {
        const validatedFuncionario = FuncionarioSchema.parse(req.body);
        await create(validatedFuncionario);
        return res.status(201).json({ message: 'Funcionário criado com sucesso' });
    } catch (error) {
        console.error('Data validation error:', error);
        return res.status(500).json({ message: 'Erro ao criar Funcionário', error: error.message });
    }
};

// GET -> /api/funcionario
export const getAllFuncionarios = async (req: Request, res: Response) => {
    try {

        res.status(200).json({ message: 'Funcionários retornado com sucesso', funcionarios: await getAll() });
    } catch (error) {
        console.error(`Erro ao retornar todos os Funcionários`, error);
        return res.status(500).send({ message: 'Erro ao retornar Funcionários', error: error.message });
    }
}

// GET by ID -> /api/funcionario/:id
export const getFuncionarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        res.status(200).json({ message: 'Funcionário retornado com sucesso', funcionarios: await getById(id) })
    } catch (error) {
        console.error('Erro ao retornar Funcionário:', error);
        return res.status(500).send({ message: 'Erro ao retornar Funcionário', error: error.message });
    }
}

// PATCH -> /api/funcionario/:id
export const updateFuncionarioById = async (req: Request, res: Response) => {
    try {
        const validatedFuncionario = FuncionarioSchema.parse(req.body)
        const { id } = req.params
        res.status(200).json({ message: 'Funcionário atualizado com sucesso', funcionariosUpdated: await update(id, validatedFuncionario) })
    } catch (error) {
        console.log(`Error while updating Funcionario `, error);
        return res.status(500).send('Erro ao atualizar funcionário');
    }
}

// DELETE -> /api/funcionario/:id
export const deleteFuncionarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteById(id)
        return res.status(200).json({ message: 'Funcionário removido com sucesso' })
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        return res.status(500).send({ message: 'Erro ao excluir funcionário', error: error.message });
    }
}

// PATCH -> /api/funcionario/end-contract/:id
// controller para terminar o contrato
export const endFuncionarioContractById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await endContractById(id)
        res.status(200).json({ message: 'Contrato finalizado com sucesso' })
    } catch (error) {
        console.log(`Error while updating Funcionario `, error);
        return res.status(500).send('Erro ao atualizar funcionário');
    }
}