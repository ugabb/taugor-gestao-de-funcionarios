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
    profilePicture: File | null | string;
    birthday: Date;
}

interface FuncionarioInfo {
    role: string;
    admissioDate: Date;
    sector: string;
    salary: number;
    isFired?: boolean
}

interface Histories {
    user: string
}

export interface IFuncionario {
    id?: string;
    contatoInfo: ContatoInfo;
    funcionarioInfo: FuncionarioInfo;
    funcionarioPDF: string;
    histories: Histories
}