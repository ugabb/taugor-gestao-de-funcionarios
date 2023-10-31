import FormHeader from '@/components/Header/FormHeader'
import React, { useState } from 'react'

//react icons
import { RiPencilFill } from 'react-icons/ri'
import { BiSolidUser } from 'react-icons/bi'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsToggle2Off } from 'react-icons/bs'
import { AiOutlineArrowUp } from 'react-icons/ai'


//material ui
import { Button, TextField } from '@mui/material'

import { useForm } from 'react-hook-form'

import { IFuncionario } from '@/IFuncionario'

const initialFuncionarioState: IFuncionario = {
  contatoInfo: {
    name: '',
    lastName: '',
    gender: '',
    address: {
      cep: '',
      logradouro: '',
      number: 0,
      uf: '',
    },
    phone: '',
    profilePicture: '',
    birthday: {
      day: 0,
      month: 0,
      year: 0,
    },
  },
  funcionarioInfo: {
    role: '',
    admissioDate: {
      day: 0,
      month: 0,
      year: 0,
    },
    sector: '',
    salary: 0,
  },
};


const index = () => {
  const [funcionario, setFuncionario] = useState<IFuncionario>(initialFuncionarioState)
  const { register, handleSubmit } = useForm()

  const onSubmit = (funcionarioData) => {
    setFuncionario(funcionarioData)
    console.log(funcionarioData)
  }

  const syncronizeWithDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [objKey, subKey] = name.split('.');
      setFuncionario((prev) => ({
        ...prev,
        [objKey]: {
          ...prev[objKey as keyof IFuncionario],
          [subKey]: value,
        },
      }));
    } else {
      setFuncionario((prev) => ({
        ...prev,
        contatoInfo: {
          ...prev.contatoInfo,
          [name]: value,
        },
      }));
    }
  };

  return (
    <div >
      <FormHeader />
      <div className="w-full h-2 bg-gray-200"></div>

      <main className='p-3 md:p-10 w-full flex flex-col lg:flex-row lg:gap-5 lg:p-10 lg:max-w-7xl lg:mx-auto'>
        <section className='lg:w-1/2 my-3 md:my-0'>
          <h1 className='text-xl font-bold'>Fale-nos um pouco sobre você</h1>
          <p className='text-sm text-gray-500'>Diga quem você é, como os empregadores podem entrar em contato com você e qual a sua profissão.</p>

          <div className="flex items-center gap-3 my-5">
            <h2 className='text-xl font-bold'>Informação de contato</h2>
            <RiPencilFill className="text-gray-400 text-lg" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-full gap-5'>

            <div className="flex flex-col md:flex-row md:gap-5 w-full">
              <div className='flex flex-col lg:gap-5 lg:w-1/2'>
                <div className='w-full flex flex-col'>
                  <input {...register("name")} type='text' className='input' placeholder='Nome' onChange={syncronizeWithDocument} />
                  <p className='text-xs text-gray-500'>ex: Tiago</p>
                </div>
                <div className='w-full flex flex-col'>
                  <input {...register("lastName")} type='text' className='input' placeholder='Sobrenome' onChange={syncronizeWithDocument} />
                  <p className='text-xs text-gray-500'>ex: Souza</p>
                </div>
              </div>

              {/* FOTO DE PERFIL */}
              <div className='flex flex-col md:flex-row justify-center  lg:gap-3 lg:w-1/2'>
                <div className='px-5 py-10 h-full flex justify-center items-center bg-gray-50 rounded-md'><BiSolidUser className="text-gray-300 text-6xl" /></div>
                <div>
                  <div className='flex items-center gap-3 mb-3'>
                    <p className="">Foto do Perfil</p>
                    <div className='rounded-full p-1 bg-gray-200'>
                      <FaRegLightbulb className="text-gray-400" />
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-full p-1 bg-blue-500'>
                      <AiOutlineArrowUp className="text-white" />
                    </div>
                    <p className="text-sm">Adicionar Foto</p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <BsToggle2Off className="text-3xl text-gray-400" />
                    <p className="text-sm">Foto Redonda</p>
                  </div>
                </div>
              </div>

            </div>

            <div className='flex flex-col gap-3 w-full'>
              <div className="w-full flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                  <input {...register("role")} type='text' className='input w-full' placeholder='Cargo' onChange={syncronizeWithDocument} />
                  <input {...register("sector")} type='text' className='input w-full' placeholder='Setor' onChange={syncronizeWithDocument} />
                  <input {...register("salary")} type='number' className='input w-full' placeholder='Salário' onChange={syncronizeWithDocument} />
                </div>
                <p className='text-xs text-gray-500'>ex: Coordenador</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3 w-full">
                  <input {...register("cep")} type='text' className='input w-full' placeholder='CEP' onChange={syncronizeWithDocument} />
                  <div className="flex gap-3">
                    <input {...register("number")} type='text' className='input w-full' placeholder='Número' onChange={syncronizeWithDocument} />
                    <input {...register("uf")} type='text' className='input w-full' placeholder='UF' />
                  </div>
                </div>
                <input {...register("logradouro")} type='text' className='input' placeholder='Logradouro' onChange={syncronizeWithDocument} />
                <p className='text-xs text-gray-500'>ex: Rua 5 de Gotham City</p>
              </div>


              <div className='flex flex-col justify-center w-full gap-3'>
                <div className='flex flex-col gap-3'>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <input {...register("phone")} type='text' className='input w-full' placeholder='Telefone' onChange={syncronizeWithDocument} />
                      <input {...register("email")} type='email' className='input w-full' placeholder='Email' onChange={syncronizeWithDocument} />
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                  <div className='w-full flex flex-col'>
                    <div className="flex gap-3">
                      <input {...register("admissioDate")} type='date' className='input w-full' placeholder='Data de Admissão' onChange={syncronizeWithDocument} />
                      <input {...register("birthday")} type='date' className='input w-full' placeholder='Data de Nascimento' onChange={syncronizeWithDocument} />
                    </div>
                    <p className='text-xs text-gray-500'>ex: Souza</p>
                  </div>
                </div>
              </div>
            </div>

            <Button type='submit' variant='outlined'>Salvar</Button>
          </form>
        </section>


        <section className=' bg-gray-100 flex justify-center items-center lg:w-1/2 h-screen'>
          <div className='bg-white a4 shadow-lg rounded-sm p-10 flex flex-col gap-3'>
            <div className={`without-border-top px-3 `} >
              <h1 className='text-primaryColor text-xl'>{funcionario?.contatoInfo?.name} {funcionario?.contatoInfo?.lastName}</h1>
              <p className='text-xs text-gray-500'>Cargo: {funcionario?.contatoInfo?.role}</p>
              <p className='text-xs text-gray-500'>Setor: {funcionario?.contatoInfo?.sector}</p>
              <p className='text-xs text-gray-500'>Salário: {funcionario?.contatoInfo?.salary}</p>
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
            <div className='border border-primaryColor px-3 '>
              <h1 className='text-primaryColor text-xl'>Gabriel Barros</h1>
              <p className='text-xs text-gray-500'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id nobis enim ratione quisquam neque temporibus, quia impedit dignissimos quos facilis eligendi error quo ipsum amet illum repellat ad, possimus explicabo!</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}

export default index