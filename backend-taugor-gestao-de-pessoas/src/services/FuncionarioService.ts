import { db } from '../config/FirestoreConfig'
import { Funcionario } from '../models/funcionario';


export const create = async (data: Funcionario) => {
    // const { contatoInfo } = data;

    // // create a validation for the schema
    // const funcionarioJson: Funcionario = {
    //     contatoInfo: {
    //         address: {}
    //     },
    //     funcionarioInfo:{
    //         admissioDate
    //     }
    // }
    const response = await db.collection("funcionario").add(data)

    return response;
}

export const getAll = async () => {
    try {
        const funcionarioRef = db.collection("funcionario")
        const snapshot = await funcionarioRef.get()
        let funcionarios: any[] = []

        snapshot.forEach((doc) => {
            funcionarios.push(doc.data());
        })

        console.log(funcionarios)
        return funcionarios
    } catch (error) {
        console.log(error)
    }
}