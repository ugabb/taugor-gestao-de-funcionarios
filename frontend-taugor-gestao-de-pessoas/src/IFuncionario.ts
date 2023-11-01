interface AddressInfo {
    cep: string;
    logradouro: string;
    number: number;
    uf: string;
}

interface ContatoInfo {
    name: string;
    lastName: string;
    email: string;
    gender: string;
    address: AddressInfo;
    phone: string;
    profilePicture: string;
    birthday: Date;
}

interface FuncionarioInfo {
    role: string;
    admissioDate: Date;
    sector: string;
    salary: number;
}

export interface IFuncionario {
    contatoInfo: ContatoInfo;
    funcionarioInfo: FuncionarioInfo;
}