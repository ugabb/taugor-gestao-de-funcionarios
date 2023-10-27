import { db } from '../config/FirestoreConfig'

export const create = async (data: any) => {
    const response = await db.collection("funcionario").add(data)
    return response;
}

export const getAll = async () => {
    try {
        const funcionarioRef = db.collection("funcionario")
        const snapshot = await funcionarioRef.get()
        let funcionarios: any[] = []

        snapshot.forEach((doc) => {
            funcionarios.push(Object.assign({ id: doc.id }, doc.data()));
        })
        return funcionarios
    } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
        throw error;
    }
}

export const getById = async (id: string) => {
    try {
        const funcionarioRef = db.collection("funcionario").doc(id)
        const funcionario = await funcionarioRef.get()

        if (!funcionario.exists) {
            throw new Error("Nenhum funcionário com esse ID!")
        }

        return funcionario.data()
    } catch (error) {
        console.error('Erro ao buscar funcionário por ID:', error);
        throw error;
    }
}

export const update = async (id: string, data: any) => {
    try {
        const funcionarioRef = db.collection("funcionario").doc(id)
        // atualizar apenas os campos especificados sem substituir o documento inteiro
        await funcionarioRef.set(data, { merge: true })
    } catch (error) {
        console.error('Erro ao buscar funcionário por ID:', error);
        throw error;
    }
}