import { Request, Response } from "express";
import { create, getAll, getById } from '../services/FuncionarioService'
import { FuncionarioSchema } from "../models/FuncionarioSchema";

export const createFuncionario = async (req: Request, res: Response) => {
    try {
        // Validação de acordo com o Schema do Funcionario
        const validateFuncionario = FuncionarioSchema.parse(req.body)
        res.json(await create(validateFuncionario))
    } catch (error) {
        console.error("Data validation error:", error);
        throw error;
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
