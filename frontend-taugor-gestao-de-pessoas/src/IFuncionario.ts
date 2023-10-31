interface AddressInfo {
    cep: string;
    logradouro: string;
    number: number;
    uf: string;
}

interface BirthdayInfo {
    day: number;
    month: number;
    year: number;
}

interface AdmissioDateInfo {
    day: number;
    month: number;
    year: number;
}

interface ContatoInfo {
    name: string;
    lastName: string;
    gender: string;
    address: AddressInfo;
    phone: string;
    profilePicture: string;
    birthday: BirthdayInfo;
}

interface FuncionarioInfo {
    role: string;
    admissioDate: AdmissioDateInfo;
    sector: string;
    salary: number;
}

export interface IFuncionario {
    contatoInfo: ContatoInfo;
    funcionarioInfo: FuncionarioInfo;
}