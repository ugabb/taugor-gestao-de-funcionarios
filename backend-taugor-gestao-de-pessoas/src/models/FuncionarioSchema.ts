import { z } from 'zod';

const AddressSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  number: z.number(),
  uf: z.string(),
});

const BirthdaySchema = z.object({
  day: z.number(),
  month: z.number(),
  year: z.number(),
});

const AdmissioDateSchema = z.object({
  day: z.number(),
  month: z.number(),
  year: z.number(),
});

const ContatoInfoSchema = z.object({
  name: z.string(),
  lastName: z.string(),
  gender: z.string(),
  address: AddressSchema,
  phone: z.string(),
  profilePicture: z.string(),
  birthday: BirthdaySchema,
});

const FuncionarioInfoSchema = z.object({
  role: z.string(),
  admissioDate: AdmissioDateSchema,
  sector: z.string(),
  salary: z.number(),
});

export const FuncionarioSchema = z.object({
  contatoInfo: ContatoInfoSchema,
  funcionarioInfo: FuncionarioInfoSchema,
});