export interface Funcionario {
    contatoInfo: ContatoInfo
    funcionarioInfo: FuncionarioInfo
  }
  
  export interface ContatoInfo {
    id: string
    name: string
    gender: string
    address: Address
    phone: string
    profilePicture: string
    birthday: Birthday
  }
  
  export interface Address {
    cep: string
    logradouro: string
    number: number
    uf: string
  }
  
  export interface Birthday {
    day: number
    month: number
    year: number
  }
  
  export interface FuncionarioInfo {
    role: string
    admissioDate: AdmissioDate
    sector: string
    salary: number
  }
  
  export interface AdmissioDate {
    day: number
    month: number
    year: number
  }
  