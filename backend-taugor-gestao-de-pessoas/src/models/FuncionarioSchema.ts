import { z } from 'zod';

const AddressSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  number: z.number(),
  uf: z.string(),
});

const ContatoInfoSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  gender: z.string(),
  address: AddressSchema,
  phone: z.string(),
  profilePicture: z.string().url(),
  birthday: z.string(),
});

const FuncionarioInfoSchema = z.object({
  role: z.string(),
  admissioDate: z.string(),
  sector: z.string(),
  salary: z.number(),
  isFired: z.boolean().default(false).optional(),
  isContractEnded: z.boolean().default(false).optional()
});

export const FuncionarioSchema = z.object({
  contatoInfo: ContatoInfoSchema,
  funcionarioInfo: FuncionarioInfoSchema,
  funcionarioPDF:z.string().url()
});