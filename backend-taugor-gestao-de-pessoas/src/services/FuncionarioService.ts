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
        const response = await funcionarioRef.get()
        // let responseArray: any[] = []

        // response.forEach((doc) => {
        //     responseArray.push(doc.data)
        //     console.log("-",doc.data)
        // })
        console.log(response.)
        return response
    } catch (error) {
        console.log(error)
    }
}