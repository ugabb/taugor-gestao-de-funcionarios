import { db } from '../config/FirestoreConfig'


export const create = async (data: any) => {
    const { name, phone } = data;

    // create a validation for the schema
    const funcionarioJson = {
        name,
        phone,
    }
    const response = await db.collection("funcionario").add(funcionarioJson)

    return response;
}