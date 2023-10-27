import { Request, Response } from "express";
import { create, getAll } from '../services/FuncionarioService'

export const createFuncionario = async (req: Request, res: Response) => {
    try {
        res.json(await create(req.body))
    } catch (error) {
        console.error(`Error while creating Funcionario`, error);
    }
}

export const getAllFuncionarios = async (req: Request, res: Response) => {
    try {
        res.json(await getAll())
    } catch (error) {
        console.error(`Error while returning all Funcionarios `, error);
    }
}