import { db } from '../config/FirestoreConfig'

export const create = async (data: any) => {
    try {
        const funcionarioRef = db.collection("funcionario")
        const { name, phone, email } = data.contatoInfo

        const verificaFuncionario = await funcionarioRef
            .where('contatoInfo.name', '==', name)
            .where('contatoInfo.phone', '==', phone)
            .where('contatoInfo.email', '==', email)
            .get()

        if (!verificaFuncionario.empty) {
            throw new Error("Já existe um funcionário com esse nome, telefone e/ou email.")
        }
        const response = await db.collection('funcionario').add(data);
        // await saveHistory('criado', data.histories.user, data);
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
        const funcionarioRef = db.collection("funcionario").doc(id);
        const funcionario = await funcionarioRef.get();

        if (!funcionario.exists) {
            throw new Error("Nenhum funcionário com esse ID!");
        }

        const funcionarioData = funcionario.data();
        if (funcionarioData) {
            return { id: funcionario.id, ...funcionarioData };
        } else {
            throw new Error("Nenhum dado encontrado para este funcionário!");
        }
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

        return data
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

export const fireById = async (id: string) => {
    try {
        const funcionarioRef = db.collection('funcionario').doc(id);
        const funcionario = await funcionarioRef.get();

        if (!funcionario.exists) {
            throw new Error('Nenhum funcionário com esse ID!');
        } else {
            const funcionarioData = funcionario.data();
            if (funcionarioData) {
                await funcionarioRef.update({
                    'funcionarioInfo.isFired': true,
                });
                console.log('Demitido com sucesso!');
            }
        }
    } catch (error) {
        console.error('Erro ao demitir contrato:', error);
        throw error;
    }
};

export const saveHistory = async (action: string, user: string, data: any) => {
    try {
        const funcionarioRef = db.collection('funcionario').doc();
        const timestamp = new Date().toISOString();
        const historyData = { action, timestamp, user };
        await funcionarioRef.update({
            histories: data.histories ? [...data.histories, historyData] : [historyData],
        });
    } catch (error) {
        console.error('Erro ao salvar o histórico:', error);
        throw error;
    }
};