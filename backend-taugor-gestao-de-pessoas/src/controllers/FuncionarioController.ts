import { Request, Response } from "express";
import { create } from '../services/FuncionarioService'

export const createFuncionario = async (req: Request, res: Response) => {
    try {
        res.json(await create(req.body))
    } catch (error) {
        console.error(`Error while creating programming language`, error);
    }
}