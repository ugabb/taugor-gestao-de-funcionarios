import { db } from '../config/FirestoreConfig'

export const create = async (data: any) => {
    try {
        const funcionarioRef = db.collection("funcionario")
        const { name, phone } = data.contatoInfo

        const verificaFuncionario = await funcionarioRef
            .where('contatoInfo.name', '==', name)
            .where('contatoInfo.phone', '==', phone)
            .get()

        if (!verificaFuncionario.empty) {
            throw new Error("Já existe um funcionário com esse nome ou telefone.")
        }
        const response = await db.collection('funcionario').add(data);
        return response;
    } catch (error) {
        console.error('Erro ao criar funcionário:', error);
        throw error;
    }
};

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
        const funcionario = await funcionarioRef.get()
        return funcionario.data()
    } catch (error) {
        console.error('Erro ao buscar funcionário por ID:', error);
        throw error;
    }
}

export const deleteById = async (id: string) => {
    try {
        const funcionarioRef = db.collection("funcionario").doc(id)
        const funcionario = await funcionarioRef.get()

        if (!funcionario.exists) {
            throw new Error("Nenhum funcionário com esse ID!")
        } else {
            await funcionarioRef.delete();
        }
    } catch (error) {
        console.error('Erro ao excluir funcionário:', error);
        throw error;
    }
}

export const endContractById = async (id: string) => {
    try {
        const funcionarioRef = db.collection('funcionario').doc(id);
        const funcionario = await funcionarioRef.get();

        if (!funcionario.exists) {
            throw new Error('Nenhum funcionário com esse ID!');
        } else {
            const funcionarioData = funcionario.data();
            if (funcionarioData) {
                await funcionarioRef.update({
                    'funcionarioInfo.isContractEnded': true,
                });
                console.log('Contrato finalizado com sucesso!');
            }
        }
    } catch (error) {
        console.error('Erro ao terminar contrato:', error);
        throw error;
    }
};