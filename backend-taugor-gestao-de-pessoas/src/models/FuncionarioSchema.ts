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
  profilePicture: z.string(),
  birthday: z.date(),
});

const FuncionarioInfoSchema = z.object({
  role: z.string(),
  admissioDate: z.date(),
  sector: z.string(),
  salary: z.number(),
});

export const FuncionarioSchema = z.object({
  contatoInfo: ContatoInfoSchema,
  funcionarioInfo: FuncionarioInfoSchema,
});