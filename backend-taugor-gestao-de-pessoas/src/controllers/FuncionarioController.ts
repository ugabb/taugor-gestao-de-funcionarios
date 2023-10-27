import { Request, Response } from "express";
import { create, getAll, getById, update } from '../services/FuncionarioService'
import { FuncionarioSchema } from "../models/FuncionarioSchema";

export const createFuncionario = async (req: Request, res: Response) => {
    try {
        // Validação de acordo com o Schema do Funcionario
        const validatedFuncionario = FuncionarioSchema.parse(req.body)
        res.status(201).json(await create(validatedFuncionario))
    } catch (error) {
        console.error("Data validation error:", error);
        throw res.status(500).send(error);
    }
}

export const getAllFuncionarios = async (req: Request, res: Response) => {
    try {
        res.json(await getAll())
    } catch (error) {
        console.error(`Error while returning all Funcionarios `, error);
    }
}

export const getFuncionarioById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        res.json(await getById(id))
    } catch (error) {
        console.error(`Error while returning all Funcionarios `, error);
    }
}

export const updateFuncionarioById = async (req: Request, res: Response) => {
    try {
        const validatedFuncionario = FuncionarioSchema.parse(req.body)
        const { id } = req.params
        return res.status(200).send({ message: "Funcionario Atualizado com" }).json(await update(id, validatedFuncionario))
    } catch (error) {
        console.error(`Error while updating Funcionario `, error);
        return res.status(500).send('Erro ao atualizar funcionário');
    }
}
